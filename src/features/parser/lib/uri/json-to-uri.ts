export const jsonToUri = (input: string): string => {
  const jsonString = JSON.stringify(JSON.parse(input))
  const encodedJson = encodeURIComponent(jsonString)
  return `data:application/json,${encodedJson}`
}
