export function fuzzySearch(searchStr: string, str: string): boolean {
  const search = searchStr.toLowerCase()
  const text = str.toLowerCase()
  let searchIndex = 0
  
  for (let i = 0; i < text.length; i++) {
    if (text[i] === search[searchIndex]) {
      searchIndex++
      if (searchIndex === search.length) return true
    }
  }
  
  return false
} 