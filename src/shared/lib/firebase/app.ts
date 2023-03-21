import { FirebaseOptions, initializeApp } from 'firebase/app'
import { firebaseApiKey, firebaseAppId, firebaseProjectId } from '../env'

const firebaseConfig: FirebaseOptions = {
  apiKey: firebaseApiKey,
  authDomain: `${firebaseProjectId}.firebaseapp.com`,
  projectId: firebaseProjectId,
  storageBucket: `${firebaseProjectId}.appspot.com`,
  appId: firebaseAppId,
}

export const app = initializeApp(firebaseConfig)
