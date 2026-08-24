#!/usr/bin/env bash
# Production smoke test — safe to run against the live site.
#
# What this does: a series of read-only HTTP GET requests (curl) against
# your deployed domain, checking that key pages and endpoints respond the
# way they should. It does NOT log in, does NOT submit any form, and does
# NOT write anything to the database — nothing here can leave test data
# behind or affect real visitors/leads.
#
# This is NOT the same thing as the k6 load-test scripts in
# backoffice/perf-tests/ — those simulate many concurrent users and are
# explicitly documented as unsafe to run against production shared
# hosting. This script sends a small, fixed number of one-off requests.
#
# Usage:
#   chmod +x scripts/production-smoke-test.sh
#   ./scripts/production-smoke-test.sh https://yourdomain.com [https://backoffice.yourdomain.com]
#
# vfsoffice is a separate project/deployment now, not a /backoffice
# subfolder of this site — pass its real URL as the second argument, or
# the backoffice-specific checks below are skipped rather than guessed at.
#
# Exit code is 0 if every check passed, 1 if anything failed — safe to
# wire into a CI job or a post-deploy manual step.

set -u

BASE_URL="${1:-}"
if [ -z "$BASE_URL" ]; then
  echo "Usage: $0 https://yourdomain.com [https://backoffice.yourdomain.com]"
  exit 1
fi
# Strip a trailing slash so path joins below don't produce //double.
BASE_URL="${BASE_URL%/}"
BACKOFFICE_URL="${2:-}"
BACKOFFICE_URL="${BACKOFFICE_URL%/}"

PASS=0
FAIL=0

# check_status URL EXPECTED_STATUS LABEL
check_status() {
  local url="$1" expected="$2" label="$3"
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 15 "$url")
  if [ "$code" = "$expected" ]; then
    echo "  [PASS] $label — HTTP $code"
    PASS=$((PASS + 1))
  else
    echo "  [FAIL] $label — expected HTTP $expected, got $code ($url)"
    FAIL=$((FAIL + 1))
  fi
}

# check_status_in URL "200 301" LABEL — accepts any status in a space-separated list
check_status_in() {
  local url="$1" expected_list="$2" label="$3"
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 "$url")
  for e in $expected_list; do
    if [ "$code" = "$e" ]; then
      echo "  [PASS] $label — HTTP $code"
      PASS=$((PASS + 1))
      return
    fi
  done
  echo "  [FAIL] $label — expected one of [$expected_list], got $code ($url)"
  FAIL=$((FAIL + 1))
}

# check_contains URL SUBSTRING LABEL
check_contains() {
  local url="$1" needle="$2" label="$3"
  local body
  body=$(curl -s -L --max-time 15 "$url")
  if printf '%s' "$body" | grep -qF "$needle"; then
    echo "  [PASS] $label — response contains \"$needle\""
    PASS=$((PASS + 1))
  else
    echo "  [FAIL] $label — response did NOT contain \"$needle\" ($url)"
    FAIL=$((FAIL + 1))
  fi
}

echo "== Production smoke test: $BASE_URL =="
echo

echo "-- Main site (static) --"
check_contains "$BASE_URL/" "Vemuri Financial Services" "Homepage loads and has expected title text"
check_status "$BASE_URL/robots.txt" 200 "robots.txt reachable"
check_status "$BASE_URL/sitemap.xml" 200 "sitemap.xml reachable"
check_status "$BASE_URL/assets/css/base.css" 200 "base.css reachable"
check_status "$BASE_URL/assets/js/main.js" 200 "main.js reachable"

echo
echo "-- HTTPS enforcement --"
HTTP_BASE="${BASE_URL/https:/http:}"
if [ "$HTTP_BASE" != "$BASE_URL" ]; then
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 "$HTTP_BASE/")
  if [ "$code" = "301" ] || [ "$code" = "302" ]; then
    echo "  [PASS] Plain http:// redirects to https:// (HTTP $code)"
    PASS=$((PASS + 1))
  else
    echo "  [FAIL] Plain http:// did not redirect (got HTTP $code) — check .htaccess"
    FAIL=$((FAIL + 1))
  fi
else
  echo "  [SKIP] Base URL was not https:// — pass an https:// URL to test the redirect"
fi

if [ -z "$BACKOFFICE_URL" ]; then
  echo
  echo "-- Backoffice checks SKIPPED (no second URL argument given) --"
else
  echo
  echo "-- Testimonials pipeline (public, read-only, cross-origin from $BASE_URL) --"
  check_contains "$BACKOFFICE_URL/testimonials-feed.php" '"ok"' "testimonials-feed.php returns JSON with an \"ok\" field"
  check_contains "$BACKOFFICE_URL/csrf-token.php" '"csrf_token"' "csrf-token.php returns a token (needed before the review form can submit)"
  # CORS: confirm this site's real origin is actually in the backoffice's
  # cors_allowed_origins allowlist — without this, the checks above pass
  # (server-to-server, no browser involved) even though a real visitor's
  # browser would block the read. See vfsoffice/config.php.
  cors_header=$(curl -s -D - -o /dev/null --max-time 15 -H "Origin: $BASE_URL" "$BACKOFFICE_URL/testimonials-feed.php" | grep -i "^access-control-allow-origin:")
  if [ -n "$cors_header" ]; then
    echo "  [PASS] CORS allows this site's origin ($cors_header)"
    PASS=$((PASS + 1))
  else
    echo "  [FAIL] No Access-Control-Allow-Origin for Origin: $BASE_URL — add it to cors_allowed_origins in vfsoffice's config.php"
    FAIL=$((FAIL + 1))
  fi

  echo
  echo "-- Backoffice app reachable and secured --"
  check_contains "$BACKOFFICE_URL/login.php" "password" "Backoffice login page loads"
  check_status_in "$BACKOFFICE_URL/config.php" "403 404" "config.php is blocked from direct access"
  check_status_in "$BACKOFFICE_URL/inc/db.php" "403 404" "inc/ is blocked from direct access"
  check_status_in "$BACKOFFICE_URL/dashboard.php" "302 303" "dashboard.php redirects when not logged in (not served directly)"
fi

echo
echo "== Result: $PASS passed, $FAIL failed =="
if [ "$FAIL" -gt 0 ]; then
  echo
  echo "One or more checks failed. This does not necessarily mean the site is"
  echo "broken for visitors — re-check each [FAIL] line manually in a browser"
  echo "before assuming the worst (e.g. a CDN/cache in front of the site can"
  echo "make a redirect check misbehave). See DEPLOYMENT.md's troubleshooting"
  echo "section for the common causes."
  exit 1
fi
exit 0
