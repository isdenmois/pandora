import { FetchLike } from 'wretch'
import { corsURL } from 'shared/lib/env'

export function corsMiddleware(next: FetchLike): FetchLike {
  return (url, options) => next(corsURL + url, options)
}
