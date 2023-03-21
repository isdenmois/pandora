import { z } from 'zod'

const schema = z.object({
  VITE_TVDB_TOKEN: z.string().min(1),
  VITE_CORS_URL: z.string().url(),
  VITE_FIREBASE_PROJECT_ID: z.string().min(1),
  VITE_FIREBASE_API_KEY: z.string().min(1),
  VITE_FIREBASE_APP_ID: z.string().min(1),
})

export const {
  VITE_TVDB_TOKEN: tvdbToken,
  VITE_CORS_URL: corsURL,
  VITE_FIREBASE_PROJECT_ID: firebaseProjectId,
  VITE_FIREBASE_API_KEY: firebaseApiKey,
  VITE_FIREBASE_APP_ID: firebaseAppId,
} = schema.parse(import.meta.env)
