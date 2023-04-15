import { z } from 'zod'

export enum SeriesStatus {
  None = 0,
  Added = 1,
}

const seriesSchema = z.object({
  id: z.string(),
  title: z.string(),
  overview: z.string().nullable(),
  poster: z.string().nullable(),
  network: z.string().nullable(),
  aired: z.string().nullable(),
  status: z.nativeEnum(SeriesStatus),
})

export type Series = z.infer<typeof seriesSchema>
