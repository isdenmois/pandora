import { atom, computed } from 'nanostores'

export const user$ = atom(localStorage.getItem('pandora$user'))
export const loggedIn$ = computed(user$, Boolean)

export const signIn = (username: string) => {
  user$.set(username)
  localStorage.setItem('pandora$user', username)
}

export const logOut = () => user$.set(null)
