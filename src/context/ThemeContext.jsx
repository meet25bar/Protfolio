import React, { createContext, useContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.add('light')
      root.classList.remove('dark')
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#F4F6FA')
    } else {
      root.classList.add('dark')
      root.classList.remove('light')
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#0F1117')
    }
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
