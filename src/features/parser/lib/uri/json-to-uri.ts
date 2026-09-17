export const jsonToUri = (data: unknown): string => {
  const jsonString = JSON.stringify(data)
  const encodedJson = encodeURIComponent(jsonString)
  return `data:application/json,${encodedJson}`
}
