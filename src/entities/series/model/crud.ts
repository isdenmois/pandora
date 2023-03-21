import { Series } from 'shared/lib'
import { seriesCollection } from './db'

export const createSeries = async (data: Series) => seriesCollection.insert(data)

export const removeSeries = async (id: string) => {
  const doc = await seriesCollection.findOne({ selector: { id } }).exec()

  return doc.remove()
}
