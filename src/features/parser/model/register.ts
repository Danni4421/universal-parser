import { fromBase64 } from '../lib/base64/from-base-64'
import { toBase64 } from '../lib/base64/to-base-64'
import { base64ToJson } from '../lib/base64/base64-to-json'
import { jsonToBase64 } from '../lib/json/json-to-base64'
import { jsonToString } from '../lib/json/json-to-string'
import { stringToJSON } from '../lib/json/string-to-json'
import { jsonToUri } from '../lib/uri/json-to-uri'
import { uriToJson } from '../lib/uri/uri-to-json'
import { uriToString } from '../lib/uri/uri-to-string'
import { stringToGraphQL } from '../lib/graphql/string-to-graphql'
import { pool } from './pool'

const passthrough = (input: unknown): unknown => input

export const registerParsers = (): void => {
  pool.register('json-to-base64', jsonToBase64)
  pool.register('json-to-string', jsonToString)
  pool.register('json-to-json', jsonToString)
  pool.register('string-to-json', stringToJSON)
  pool.register('string-to-base64', toBase64)
  pool.register('base64-to-string', fromBase64)
  pool.register('base64-to-json', base64ToJson)
  pool.register('json-to-uri', jsonToUri)
  pool.register('uri-to-json', uriToJson)
  pool.register('uri-to-string', uriToString)
  pool.register('string-to-graphql', stringToGraphQL)
  pool.register('graphql-to-string', passthrough)
  pool.register('graphql-to-base64', toBase64)

  pool.register('string-to-string', passthrough)
  pool.register('base64-to-base64', passthrough)
  pool.register('uri-to-uri', passthrough)
  pool.register('graphql-to-graphql', passthrough)
}
