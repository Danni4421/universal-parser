type ParserFunction = (input: any) => any

class ParserPool {
  private parsers: Map<string, ParserFunction> = new Map()

  register(name: string, parser: ParserFunction): void {
    this.parsers.set(name, parser)
  }

  get(name: string): ParserFunction | undefined {
    return this.parsers.get(name)
  }

  has(name: string): boolean {
    return this.parsers.has(name)
  }

  parse(name: string, input: any): any {
    const parser = this.parsers.get(name)
    if (!parser) {
      throw new Error(`Parser "${name}" not found.`)
    }
    return parser(input)
  }

  list(): Array<string> {
    return Array.from(this.parsers.keys())
  }
}

export const pool = new ParserPool()
