import { loggedIn$ } from 'entities/viewer'
import { replicateFirestore } from 'rxdb/plugins/replication-firestore'
import { env, firebase } from 'shared/lib'
import { seriesCollection } from './db'

const replicateState = replicateFirestore({
  collection: seriesCollection,
  firestore: {
    projectId: env.firebaseProjectId,
    database: firebase.firestoreDatabase,
    collection: firebase.firestoreSeriesCollection,
  },
  autoStart: false,
  live: true,
  retryTime: 30000,
  pull: {},
  push: {},
})

loggedIn$.subscribe(loggedIn => {
  if (loggedIn) {
    replicateState.start()
  }
})
