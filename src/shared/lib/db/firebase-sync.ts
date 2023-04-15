/* eslint-disable @typescript-eslint/no-explicit-any */
import Dexie from 'dexie'
import 'dexie-syncable'
import wretch from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'
import { dbUrl } from '../env'

const fb = wretch(dbUrl).addon(QueryStringAddon)

enum DatabaseChangeType {
  Create = 1,
  Update = 2,
  Delete = 3,
}

const createNodes = async (_u: number, changes: any[]) => {
  for (const change of changes) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...obj } = change.obj

    await fb.put({ ...obj, _c: _u, _u }, `/${change.table}/${change.key}.json`)
  }
}

const updateNodes = async (_u: number, changes: any[]) => {
  for (const change of changes) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...mods } = change.mods

    await fb.patch({ ...mods, _u }, `/${change.table}/${change.key}.json`)
  }
}

const deleteNodes = async (_u: number, changes: any[]) => {
  for (const change of changes) {
    await fb.put({ _u }, `/${change.table}/${change.key}.json`)
  }
}

const syncTable = (table: string, startAt: number | null) => {
  const query = startAt ? fb.query({ orderBy: '"_u"', startAt }) : fb

  return query.get(`/${table}.json`).json(result => {
    const changes = []

    for (const key in result) {
      const { _c, _u, ...data } = result[key]
      const type: DatabaseChangeType = _c
        ? _c === _u
          ? DatabaseChangeType.Create
          : DatabaseChangeType.Update
        : DatabaseChangeType.Delete

      switch (type) {
        case DatabaseChangeType.Create:
          changes.push({
            type,
            table,
            key,
            obj: { id: key, ...data },
          })
          break
        case DatabaseChangeType.Update:
          changes.push({
            type,
            table,
            key,
            mods: data,
          })
          break
        case DatabaseChangeType.Delete:
          changes.push({
            type,
            table,
            key,
          })
          break
      }
    }

    return changes
  })
}

const POLL_INTERVAL = 30_000

const startSync = async (revision: number | null, changes: any[]) => {
  const remoteChanges = await syncTable('series', revision)
  const syncRevision = Date.now()

  await createNodes(
    syncRevision,
    changes.filter(change => change.type === 1),
  )
  await updateNodes(
    syncRevision,
    changes.filter(change => change.type === 2),
  )
  await deleteNodes(
    syncRevision,
    changes.filter(change => change.type === 3),
  )

  return { syncRevision, remoteChanges }
}

Dexie.Syncable.registerSyncProtocol('firebase', {
  sync(
    context,
    url,
    options,
    baseRevision,
    syncedRevision,
    changes,
    partial,
    applyRemoteChanges,
    onChangesAccepted,
    onSuccess,
    onError,
  ) {
    ;(async () => {
      try {
        // TODO: get all tables
        const initialChanges = await startSync(syncedRevision, changes)
        syncedRevision = initialChanges.syncRevision

        onChangesAccepted()
        applyRemoteChanges(initialChanges.remoteChanges as any, initialChanges.syncRevision, false)

        let intervalId = setTimeout(async function intervalCb() {
          const updateChanges = await startSync(syncedRevision, [])
          syncedRevision = updateChanges.syncRevision

          applyRemoteChanges(updateChanges.remoteChanges as any, updateChanges.syncRevision, false)
          intervalId = setTimeout(intervalCb, POLL_INTERVAL)
        }, POLL_INTERVAL)

        onSuccess({
          async react(changes, baseRevision, partial, onChangesAccepted) {
            const updateChanges = await startSync(baseRevision, changes)
            syncedRevision = updateChanges.syncRevision

            onChangesAccepted()
            applyRemoteChanges(updateChanges.remoteChanges as any, updateChanges.syncRevision, false)
          },
          disconnect() {
            clearTimeout(intervalId)
          },
        })
      } catch (error) {
        console.error(error)
        onError(error, POLL_INTERVAL)
      }
    })()
  },
})
