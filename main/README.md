# Vemuri Financial Services Website

A modern, high-performance, and fully responsive Single Page Application (SPA) built for **Vemuri Financial Services**. This website serves as the digital front door for clients, showcasing financial pillars, solutions, calculators, and regulatory compliance.

## 🚀 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Inter & Space Grotesk (Google Fonts)

## 📦 Features

- **Dynamic SPA Routing**: Custom view handling without full page reloads.
- **Floating Action Button**: Persistent WhatsApp integration for instant client communication.
- **Interactive Calculators**: Built-in financial calculators (SIP, Step-up SIP, FD, SWP).
- **Compliance Ready**: Dedicated sections displaying AMFI, IRDAI, PFRDA, and RBI disclosures.
- **Dynamic Animations**: Scroll-linked animations and CSS-driven effects (e.g., logo shine).
- **Responsive Design**: Mobile-first architecture ensuring perfect layouts across all devices.

## 🛠️ Local Development

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository and navigate into the app folder (the live app lives in `main/`; `pv0/` and `pv1/` alongside it are archived earlier versions):
   ```bash
   cd vfs-website/main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).

## 📁 Project Structure

```text
vfs-website/
├── public/                  # Static assets (logos, images)
├── src/
│   ├── components/          # Reusable React components (Header, Hero, Footer, etc.)
│   ├── App.jsx              # Main application entry point and state manager
│   ├── main.jsx             # React DOM rendering
│   └── index.css            # Global CSS, Tailwind directives, and custom keyframes
├── package.json             # Project dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
└── vite.config.js           # Vite bundler configuration
```

## 🤝 Contributing
Ensure that any new components are modular and utilize Tailwind CSS for styling to maintain design consistency. Always verify animations across both desktop and mobile viewports.
