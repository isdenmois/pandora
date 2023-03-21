import { getAuth, browserLocalPersistence } from 'firebase/auth'
import { app } from './app'

export const auth = getAuth(app)

auth.setPersistence(browserLocalPersistence)
