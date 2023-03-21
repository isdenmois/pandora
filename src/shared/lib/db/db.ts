import { createRxDatabase } from 'rxdb'
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie'
// import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'

// addRxPlugin(RxDBDevModePlugin)

export const db = await createRxDatabase({
  name: 'pandora',
  storage: getRxStorageDexie(),
})
