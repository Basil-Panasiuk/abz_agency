import React from 'react';
import Skeleton from '../assets/images/Preloader.png';

export const Preloader = () => {
  return (
    <div className='preloader'>
      <img className='preloader__img' src={Skeleton} alt='preloader' />
    </div>
  );
};
