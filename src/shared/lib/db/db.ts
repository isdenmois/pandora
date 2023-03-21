import { addRxPlugin, createRxDatabase } from 'rxdb'
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie'
import { RxDBMigrationPlugin } from 'rxdb/plugins/migration'
// import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'

// addRxPlugin(RxDBDevModePlugin)

addRxPlugin(RxDBMigrationPlugin)

export const db = await createRxDatabase({
  name: 'pandora',
  storage: getRxStorageDexie(),
})
