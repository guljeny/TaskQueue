import { Link } from 'react-router-dom'
import { signOut } from "firebase/auth"
import useAuth from 'hooks/useAuth'
import auth from 'utils/firebase/auth';
import { home, login, register, profile } from 'constants/routes'

export default () => {
  const user = useAuth()

  return (
    <header>
      <Link to={home}>Task Queue</Link>
      {user && <Link to={profile}>Profile</Link>}
      {user && <button onClick={() => signOut(auth)}>Sign out</button>}
      {!user && <Link to={login}>Login</Link>}
      {!user && <Link to={register}>Register</Link>}
    </header>
  )
}
