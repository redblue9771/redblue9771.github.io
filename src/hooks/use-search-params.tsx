export const useSearchParams = (search: string) => {
  const _search = new URLSearchParams(search)
  const result: any = {}
  _search.forEach((val, key) => {
    result[key] = val
  })

  return result
}
