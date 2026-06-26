export function isVietnamese(language) {
  return String(language).toLowerCase() === 'vi'
}

export function formatDateByLanguage(value, language) {
  const locale = isVietnamese(language) ? 'vi-VN' : 'en-US'
  return new Date(value).toLocaleDateString(locale)
}
