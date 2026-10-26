const DATA_URI_PREFIX = 'data:application/json,'

export const uriToString = (input: string): string => {
  const payload = input.startsWith(DATA_URI_PREFIX)
    ? input.slice(DATA_URI_PREFIX.length)
    : input
  return decodeURIComponent(payload)
}
