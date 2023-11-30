export const useSearchParams = (search: string) => {
  const searchParams = new URLSearchParams(search)
  const result: any = {}

  for (const [key, val] of searchParams.entries()) {
    result[key] = val
  }

  return result
}
