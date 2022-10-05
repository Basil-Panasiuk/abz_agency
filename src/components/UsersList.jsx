import React, { useEffect, useState } from 'react';
import { loadUsers } from '../api/users';
import { COUNT } from '../App';
import { Button } from './Button';
import { Preloader } from './Preloader';
import { User } from './User';

export const UsersList = ({ className, users, setUsers, collapse }) => {
  const [currentPage, setCurrentPage] = useState(2);
  const [isHidden, setIsHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const computedUsers = () => {
    return Object.values(users).flat().filter(Boolean);
  };

  useEffect(() => {
    setIsHidden(false);
    setCurrentPage(2);
  }, [collapse]);

  const loadMoreUsers = async () => {
    setIsLoading(true);
    const { page, total_pages, users, error } = await loadUsers(
      currentPage,
      COUNT,
    );
    setIsLoading(false);

    if (error) {
      alert(error);
      return;
    }

    if (total_pages <= currentPage) {
      setIsHidden(true);
    }

    setUsers((prevUsers) => ({
      ...prevUsers,
      [page]: users,
    }));

    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div id="users-list" className={`users ${className}`}>
      <div className='container'>
        <h2 className='users__title'>Working with GET request</h2>

        <div className='users__list'>
          {computedUsers().map((user) => (
            <User key={user.id} {...user} />
          ))}
        </div>

        {!isHidden && (
          <Button onClick={loadMoreUsers} type='button' className='users__btn'>
            {isLoading ? <Preloader /> : 'Show more'}
          </Button>
        )}
      </div>
    </div>
  );
};
