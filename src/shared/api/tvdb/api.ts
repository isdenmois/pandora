import wretch from 'wretch'
import QueryAddon from 'wretch/addons/queryString'
import { corsMiddleware } from 'shared/lib/cors/cors-middleware'
import { authMiddleware } from './auth'

const parseResponse = (response: unknown) => {
  if (response && typeof response === 'object' && 'data' in response) {
    return response.data
  }

  return response
}

export const api = wretch('https://api.thetvdb.com/')
  .addon(QueryAddon)
  .middlewares([authMiddleware, corsMiddleware])
  .resolve(r => r.json().then(parseResponse))
