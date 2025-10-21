export const jsonToBase64 = (json: object): string => {
  const jsonString = JSON.stringify(json)
  return Buffer.from(jsonString).toString('base64')
}
