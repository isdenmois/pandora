import Dexie from 'dexie'
import 'dexie-syncable'
import { dbUrl } from '../env'
import { Series } from './series'
import './firebase-sync'

class PandoraDatabase extends Dexie {
  series!: Dexie.Table<Series, string>
}

export const db = new PandoraDatabase('pandora-list')

db.version(1).stores({
  series: 'id, title, overview, poster, network, aired, status',
})

db.syncable.connect('firebase', dbUrl)
