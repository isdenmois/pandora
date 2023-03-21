import { seriesCollection } from './db'

export const allSeries$ = seriesCollection.find().$
