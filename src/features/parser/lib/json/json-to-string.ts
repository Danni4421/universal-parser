export const jsonToString = (input: string): string => {
  return JSON.stringify(JSON.parse(input), null, 2)
}
