import { useState, useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth"
import auth from 'utils/firebase/auth';

export default () => {
  // null - user is loaded and not loggined
  // Object - user is loaded and exists
  const [user, setUser] = useState<any>(auth.currentUser)

  useEffect(() => {
    return onAuthStateChanged(auth, setUser)
  }, [])

  return user
}
