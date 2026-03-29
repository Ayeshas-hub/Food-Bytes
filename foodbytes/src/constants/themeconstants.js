// =============================================
// THEME CONSTANTS & UTILITIES
// FoodBytes - themeConstants.js
// =============================================

const THEME_KEY = 'foodbytes-theme'
const DARK = 'dark'
const LIGHT = 'light'

// Save theme to localStorage
const saveTheme = (theme) => {
    localStorage.setItem(THEME_KEY, theme)
}

// Get theme from localStorage
const getTheme = () => {
    return localStorage.getItem(THEME_KEY) || LIGHT
}

// Apply theme to document
const applyTheme = (theme) => {
    if (theme === DARK) {
        document.documentElement.classList.add('dark')
        document.body.classList.add('bg-gray-900', 'text-white')
        document.body.classList.remove('bg-gray-50', 'text-gray-900')
    } else {
        document.documentElement.classList.remove('dark')
        document.body.classList.remove('bg-gray-900', 'text-white')
        document.body.classList.add('bg-gray-50', 'text-gray-900')
    }
}

// Toggle theme
const toggleTheme = () => {
    const current = getTheme()
    const next = current === DARK ? LIGHT : DARK
    saveTheme(next)
    applyTheme(next)
    updateThemeButton(next)
}

// Update button icon
const updateThemeButton = (theme) => {
    const btn = document.getElementById('themeToggle')
    if (btn) {
        btn.textContent = theme === DARK ? '☀️' : '🌙'
        btn.title = theme === DARK ? 'Switch to Light Mode' : 'Switch to Dark Mode'
    }
}

// Init theme on page load
const initTheme = () => {
    const theme = getTheme()
    applyTheme(theme)
    updateThemeButton(theme)
}