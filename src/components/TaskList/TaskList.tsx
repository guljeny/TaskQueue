import { useEffect, useState, useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { getDatabase, ref, onValue, set } from "firebase/database";
import Input from 'components/Input';
import useAuth from 'hooks/useAuth'
import firebaseApp from 'utils/firebase/firebaseApp'

const db = getDatabase(firebaseApp);

interface IMember {
  name: string;
  id: number;
}

export default () => {
  const [members, setMembers] = useState<IMember[]>([]);
  const [newMemberName, setNewMemberName] = useState('');
  const user = useAuth();
  const { listId } = useParams();

  if (!listId) return <Navigate to={`/${user.uid}`} replace />;

  const roomRef = useMemo(() => ref(db, 'rooms/' + listId), [listId]);

  const addMember = (e) => {
    e.preventDefault();
    setNewMemberName('');
    set(roomRef, [{ name: newMemberName, id: Date.now() }, ...members]);
  }

  const deleteMember = (e, id) => {
    e.stopPropagation();
    set(roomRef, members.filter(member => member.id !== id));
  }

  const onMemberClick = (id) => {
    const member = members.find(member => member.id === id);
    const newMembers = members.filter(member => member.id !== id)

    set(roomRef, [...newMembers, member]);
  }

  useEffect(() => {
    return onValue(roomRef, snapshoot => {
      setMembers(snapshoot.val() || []);
    })
  }, [roomRef]);

  return (
    <div>
      <form onSubmit={addMember}>
        <Input
          placeholder='new member'
          value={newMemberName}
          onChange={({ target }) => setNewMemberName(target.value)}
        />
        <button>Add</button>
      </form>
      {members.map(({ id, name }) => (
        <span key={id} onClick={() => onMemberClick(id)}>
          {name}
          <button onClick={(e) => deleteMember(e, id)}>
            x
          </button>
        </span>
      ))}
    </div>
  )
} 
