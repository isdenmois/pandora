import { liveQuery, type Observable } from 'dexie'
import { db, Series } from 'shared/lib'

export const allSeries$ = liveQuery(() => db.series.toArray()) as Observable<Series[]>
