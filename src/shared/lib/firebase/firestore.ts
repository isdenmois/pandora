import { getFirestore, collection } from 'firebase/firestore'
import { app } from './app'

export const firestoreDatabase = getFirestore(app)

export const firestoreSeriesCollection = collection(firestoreDatabase, 'series')
