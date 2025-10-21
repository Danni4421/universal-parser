export const uriToJson = (uri: string): unknown => {
  try {
    const dataUriPrefix = 'data:application/json,'
    if (uri.startsWith(dataUriPrefix)) {
      const encodedJson = uri.slice(dataUriPrefix.length)
      const jsonString = decodeURIComponent(encodedJson)
      return JSON.parse(jsonString)
    }

    const decodedString = decodeURIComponent(uri)
    return JSON.parse(decodedString)
  } catch (error) {
    throw new Error(
      'Invalid URI format. Expected data:application/json,<encoded-json> or URL-encoded JSON',
    )
  }
}
