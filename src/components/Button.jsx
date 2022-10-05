import React from 'react';

export const Button = ({ type, className, children, onClick, link }) => {
  return (
    <>
      {type === 'link' ? (
        <a href={`#${link}`} className={`button button--active ${className}`}>
          {children}
        </a>
      ) : (
        <button
          type={type}
          className={`button button--active ${className}`}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </>
  );
};
