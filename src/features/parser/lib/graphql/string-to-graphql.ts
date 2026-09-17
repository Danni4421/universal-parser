import { parse, print } from 'graphql'

export const stringToGraphQL = (input: string): string => {
  const ast = parse(input)
  return print(ast)
}
