import type { Observable } from 'dexie'
import { onScopeDispose, ref, Ref, UnwrapRef } from 'vue'

export interface UseObservableOptions<I> {
  onError?: (err: unknown) => void
  initialValue?: I | undefined
}

export function useObservable<H, I = undefined>(
  observable: Observable<H>,
  options?: UseObservableOptions<I | undefined>,
): Readonly<Ref<H | I>> {
  const value = ref<H | I | undefined>(options?.initialValue)
  const subscription = observable.subscribe({
    next: val => (value.value = val as UnwrapRef<H>),
    error: options?.onError,
  })

  onScopeDispose(() => {
    subscription.unsubscribe()
  })

  return value as Readonly<Ref<H | I>>
}
