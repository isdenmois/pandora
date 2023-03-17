import { z } from 'zod'

const schema = z.object({
  VITE_TVDB_TOKEN: z.string().min(1),
  VITE_CORS_URL: z.string().url(),
})

export const { VITE_TVDB_TOKEN: tvdbToken, VITE_CORS_URL: corsURL } = schema.parse(import.meta.env)
