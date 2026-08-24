# Testing Strategy & Scenarios

This document outlines the testing approach for the Vemuri Financial Services React application. Due to the static nature of this SPA, testing primarily focuses on UI/UX, routing behavior, and responsive design.

## 1. Manual End-to-End (E2E) Test Cases

### Test Case 1: Navigation and Scrolling
- **Objective**: Ensure that anchor links correctly scroll to the respective section without being obscured by the fixed header.
- **Pre-condition**: App is running (`npm run dev`).
- **Steps**:
  1. Click on "Solutions" in the desktop navigation bar.
  2. Click on "Services" in the desktop navigation bar.
- **Expected Result**: The page smoothly scrolls to the target section. The top of the section title is clearly visible and is *not* hidden underneath the translucent header (verified header offset `y - 160`).

### Test Case 2: View Switching (SPA Routing)
- **Objective**: Ensure the `onViewChange` state correctly replaces the main DOM content without a browser reload.
- **Steps**:
  1. Scroll to the footer and click on "Partner Hub".
  2. Verify the URL does not reload.
  3. Verify the Hero, Pillars, and Contact sections are removed from the DOM.
  4. Verify the Partner Hub specific content renders.
  5. Click the "Main Website" or "Back to Main Website" button in the header.
- **Expected Result**: The application seamlessly returns to the home view and scrolls to the top of the page.

### Test Case 3: Mobile Menu Toggle
- **Objective**: Verify mobile navigation accessibility.
- **Steps**:
  1. Shrink the browser window width to `< 768px` (or open DevTools Device Toolbar).
  2. Click the Hamburger (`Menu`) icon in the top right.
  3. Verify the dropdown menu appears and covers the screen correctly.
  4. Click a link (e.g., "Compare").
- **Expected Result**: The menu should automatically close (`setIsOpen(false)`), and the page should scroll to the "Compare" section.

### Test Case 4: WhatsApp Integration
- **Objective**: Verify the floating WhatsApp button links to the correct API endpoint.
- **Steps**:
  1. Locate the green floating WhatsApp button in the bottom right corner.
  2. Hover over the button (verify it scales up slightly).
  3. Click the button.
- **Expected Result**: A new tab opens pointing to `api.whatsapp.com` with the phone number `919886291668` and pre-filled text "Hello Vemuri Financial Services!".

### Test Case 5: External Portal Links
- **Objective**: Ensure client portals open safely without exposing the app to `window.opener` vulnerabilities.
- **Steps**:
  1. Click "VFS Office" in the header.
  2. Click "Client Login" in the header.
- **Expected Result**: Links should open in a new tab (`target="_blank"`) and utilize `rel="noopener noreferrer"`.

## 2. Automated Testing (Future Scope)

To automate the above scenarios in the future, the following tools are recommended:

- **Unit Testing**: Use **Vitest** + **React Testing Library** to test component rendering (e.g., ensuring `Header` renders the correct links based on the `currentView` prop).
- **E2E Testing**: Use **Cypress** or **Playwright** to simulate the user journey, specifically asserting that the `window.scrollY` position matches expectations after clicking navigation links.
