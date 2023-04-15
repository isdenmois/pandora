import { Series, db } from 'shared/lib'

export const createSeries = async (data: Series) => db.series.add(data)

export const removeSeries = async (id: string) => db.series.delete(id)
