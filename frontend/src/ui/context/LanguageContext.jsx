import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'devblog-language'
const DEFAULT_LANGUAGE = 'en'
const SUPPORTED_LANGUAGES = ['en', 'vi']

function normalizeLanguage(value) {
  const normalized = String(value ?? '').trim().toLowerCase()
  return SUPPORTED_LANGUAGES.includes(normalized) ? normalized : DEFAULT_LANGUAGE
}

const LanguageContext = createContext({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  supportedLanguages: SUPPORTED_LANGUAGES,
})

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE)

  useEffect(() => {
    const storedLanguage = normalizeLanguage(localStorage.getItem(STORAGE_KEY))
    setLanguage(storedLanguage)
  }, [])

  function handleSetLanguage(nextLanguage) {
    const normalized = normalizeLanguage(nextLanguage)
    setLanguage(normalized)
    localStorage.setItem(STORAGE_KEY, normalized)
  }

  const value = useMemo(
    () => ({
      language,
      setLanguage: handleSetLanguage,
      supportedLanguages: SUPPORTED_LANGUAGES,
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
