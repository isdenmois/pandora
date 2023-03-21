import { ExtractDocumentTypeFromTypedRxJsonSchema } from 'rxdb'
import { db } from './db'
import { seriesSchema } from './series'

export type Series = ExtractDocumentTypeFromTypedRxJsonSchema<typeof seriesSchema>

await db.addCollections({
  series: {
    schema: seriesSchema,
    autoMigrate: true,
  },
})

export { db }
