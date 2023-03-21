import { toTypedRxJsonSchema } from 'rxdb'

export const seriesSchema = toTypedRxJsonSchema({
  title: 'Series schema',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    title: {
      type: 'string',
    },
    overview: {
      type: 'string',
    },
    poster: {
      type: 'string',
    },
    network: {
      type: 'string',
    },
    aired: {
      type: 'string',
    },
    status: {
      type: 'integer',
    },
  },
  required: ['id', 'title', 'status'],
} as const)
