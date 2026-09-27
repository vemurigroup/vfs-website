import React, { useCallback, useMemo, useState } from 'react'
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './languages'
import { translations } from './translations'
import { LanguageContext } from './context'

const STORAGE_KEY = 'vfs-language'

function readStoredLanguage() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored && SUPPORTED_LANGUAGES[stored] ? stored : DEFAULT_LANGUAGE
  } catch {
    return DEFAULT_LANGUAGE
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readStoredLanguage)

  const setLang = useCallback((next) => {
    if (!SUPPORTED_LANGUAGES[next]) return
    setLangState(next)
    try { window.localStorage.setItem(STORAGE_KEY, next) } catch { /* private browsing, etc. — non-fatal */ }
  }, [])

  // t(text) always fails open: an untranslated string, an unsupported
  // language, or a key missing from that language's dictionary all
  // just return the original English text, never a blank or a broken
  // key — same contract as vfsoffice's inc/i18n.php t().
  const t = useCallback((text) => {
    if (lang === DEFAULT_LANGUAGE) return text
    return translations[lang]?.[text] ?? text
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t, languages: SUPPORTED_LANGUAGES }), [lang, setLang, t])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
