import React from 'react';

export const User = ({ name, email, phone, photo, position }) => {
  return (
    <div className='user'>
      <img
        src={photo}
        alt='user'
        width='70'
        height='70'
        className='user__img'
      />
      <p className='user__name' title={name}>
        {name}
      </p>
      <p className='user__position' title={position}>
        {position}
      </p>
      <p className='user__email' title={email}>
        {email}
      </p>
      <p className='user__phone' title={phone}>
        {phone}
      </p>
    </div>
  );
};
