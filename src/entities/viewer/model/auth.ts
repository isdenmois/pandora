import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { BehaviorSubject, distinctUntilChanged, map, ReplaySubject } from 'rxjs'
import { firebase } from 'shared/lib'

const _user$ = new BehaviorSubject(firebase.auth.currentUser)
const _authInit$ = new ReplaySubject<boolean>(1)

onAuthStateChanged(firebase.auth, user => {
  _user$.next(user)
  _authInit$.next(true)
})

export const user$ = _user$.asObservable()
export const loggedIn$ = _user$.pipe(
  map(user => !!user),
  distinctUntilChanged(),
)
export const authInit$ = _authInit$.asObservable()

export const signIn = (email: string, password: string) => signInWithEmailAndPassword(firebase.auth, email, password)

export const logOut = () => firebase.auth.signOut()
