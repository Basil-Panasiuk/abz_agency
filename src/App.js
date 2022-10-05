import './assets/styles/main.scss';
import { UsersList } from './components/UsersList';
import { Header } from './components/Header';
import { Signup } from './components/Signup';
import { useEffect, useState } from 'react';
import { loadUsers } from './api/users';

export const COUNT = 6;

function App() {
  const [users, setUsers] = useState({});
  const [collapse, setCollapse] = useState(0);

  const getUsers = async () => {
    const { page, users, error } = await loadUsers(1, COUNT);

    if (error) {
      console.log(error);
      return;
    }

    setUsers((prevUsers) => ({
      ...prevUsers,
      [page]: users,
    }));
  };

  const resetUsers = async () => {
    const { page, users, error } = await loadUsers(1, COUNT);

    if (error) {
      console.log(error);
      return;
    }

    setUsers(() => ({
      [page]: users,
    }));
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (collapse) {
      resetUsers();
    }
  }, [collapse]);

  return (
    <div className='page'>
      <Header className='page__item' />
      <UsersList
        className='page__item'
        users={users}
        setUsers={setUsers}
        collapse={collapse}
      />
      <Signup setCollapse={setCollapse} />
    </div>
  );
}

export default App;
