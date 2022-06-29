import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from 'utils/firebase/auth';
import Input from 'components/Input';

export default () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      console.log(user);
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <form onSubmit={handleSumbit}>
      <h2>Login</h2>
      <Input placeholder='email' value={email} onChange={({ target }) => setEmail(target.value)} />
      <Input placeholder='password' type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
      <button>Login</button>
      {error && <div>{error}</div>}
    </form>
  )
}
