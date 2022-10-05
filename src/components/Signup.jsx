import React, { useState } from 'react';
import { UserForm } from './UserForm';
import SuccessRegistered from '../assets/images/success.svg';

export const Signup = ({ setCollapse }) => {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <div className='container'>
      <div className='signup' id='sign-up'>
        <h2 className='signup__title'>
          {isRegistered
            ? 'User successfully registered'
            : 'Working with POST request'}
        </h2>
        {isRegistered ? (
          <img src={SuccessRegistered} alt='success-registered' />
        ) : (
          <UserForm
            setIsRegistered={setIsRegistered}
            setCollapse={setCollapse}
          />
        )}
      </div>
    </div>
  );
};
