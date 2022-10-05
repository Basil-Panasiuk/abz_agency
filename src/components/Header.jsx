import React from 'react';
import { Button } from './Button';
import { Navbar } from './Navbar';

export const Header = ({ className }) => {
  return (
    <div className={`header ${className}`}>
      <Navbar />
      <div className='container'>
        <div className='header__main'>
          <div className='header__wrapper'>
            <h1 className='header__title'>
              Test assignment for front-end developer
            </h1>
            <p className='header__description'>
              What defines a good front-end developer is one that has skilled
              knowledge of HTML, CSS, JS with a vast understanding of User
              design thinking as they'll be building web interfaces with
              accessibility in mind. They should also be excited to learn, as
              the world of Front-End Development keeps evolving.
            </p>
            <Button type='link' link='sign-up'>
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
