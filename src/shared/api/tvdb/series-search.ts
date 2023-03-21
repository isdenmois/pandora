import { z } from 'zod'
import { api } from './api'

const IMAGE_PREFIX = 'https://artworks.thetvdb.com'

const searchItemSchema = z.object({
  id: z.coerce.number(),
  image: z
    .string()
    .nullish()
    .transform(image => (image ? `${IMAGE_PREFIX}${image}` : null)),
  seriesName: z.string(),
  overview: z.string().optional(),
  network: z.string().nullish(),
  firstAired: z
    .string()
    .optional()
    .transform(date => (date ? new Date(date) : null)),
})

export type SeriesSearchItem = z.infer<typeof searchItemSchema>

const searchSchema = z.array(searchItemSchema)

export const search = (name: string, language = 'en') =>
  api
    .query({ name })
    .headers({ 'Accept-Language': language })
    .get('search/series')
    .then((data: unknown) => searchSchema.parse(data))
