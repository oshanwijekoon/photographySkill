import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/utilities.css'
import App from './App.jsx'
import { createCssColorVariables } from './theme'

// Apply theme CSS variables
const themeVars = createCssColorVariables();
Object.entries(themeVars).forEach(([key, value]) => {
  document.documentElement.style.setProperty(key, value);
});

// Check for dark mode preference
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (prefersDarkMode) {
  document.documentElement.classList.add('dark');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
