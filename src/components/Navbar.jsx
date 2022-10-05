import React from 'react';
import { Button } from './Button';
import { Logo } from './Logo';

export const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='container'>
        <div className='navbar__wrapper'>
          <Logo />

          <div className='navbar__right'>
            <Button className='navbar__btn' type='link' link="users-list">
              Users
            </Button>
            <Button type='link' link="sign-up">Sign up</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
