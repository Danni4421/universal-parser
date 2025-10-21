import { fromBase64 } from '../lib/base64/from-base-64'
import { toBase64 } from '../lib/base64/to-base-64'
import { jsonToBase64 } from '../lib/json/json-to-base64'
import { jsonToString } from '../lib/json/json-to-string'
import { stringToJSON } from '../lib/json/string-to-json'
import { jsonToUri } from '../lib/uri/json-to-uri'
import { uriToJson } from '../lib/uri/uri-to-json'
import { pool } from './pool'

export const registerParsers = (): void => {
  pool.register('from-base-64', fromBase64)
  pool.register('to-base-64', toBase64)
  pool.register('json-to-base64', jsonToBase64)
  pool.register('json-to-string', jsonToString)
  pool.register('string-to-json', stringToJSON)
  pool.register('json-to-uri', jsonToUri)
  pool.register('uri-to-json', uriToJson)
}
