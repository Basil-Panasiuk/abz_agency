import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { loadPositions } from '../api/positions';
import { Button } from './Button';
import classNames from 'classnames';
import { createUser } from '../api/users';
import { Preloader } from './Preloader';

export const UserForm = ({ setIsRegistered, setCollapse }) => {
  const [positions, setPositions] = useState([]);
  const [positionId, setPositionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [photoName, setPhotoName] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const getPositions = async () => {
    const loadedPositions = await loadPositions();

    if (loadedPositions) {
      setPositions(loadedPositions);
      setPositionId(loadedPositions[0].id);
    }
  };

  const hasErrors = () => !!Object.keys(errors).length;

  useEffect(() => {
    getPositions();
  }, []);

  const onSubmit = async ({ name, email, phone, photo }) => {
    setIsLoading(true);
    const userData = new FormData();
    userData.append('position_id', positionId);
    userData.append('name', name);
    userData.append('email', email);
    userData.append('phone', phone);
    userData.append('photo', Array.from(photo)[0]);

    const { error } = await createUser(userData);
    setIsLoading(false);
    reset();
    setPositionId(positions[0].id);

    if (error) {
      alert(error);
      return;
    }

    setIsRegistered(true);
    setCollapse((prevValue) => prevValue + 1);
  };

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <div className='field'>
        <input
          type='text'
          id='name'
          placeholder='Your name'
          className={classNames('field__input', {
            'field__input--invalid': errors.name,
          })}
          {...register('name', {
            required: true,
            minLength: 2,
            maxLength: 60,
          })}
        />
        <label className='field__label form__item-label'>Your name</label>

        {errors.name && (
          <div className='field__error'>
            {errors.name.type === 'required' ? (
              <span>This is required</span>
            ) : errors.name.type === 'minLength' ? (
              <span>Should be min 2 characters</span>
            ) : (
              <span>Max length exceeded</span>
            )}
          </div>
        )}
      </div>
      <div className='field'>
        <input
          type='email'
          placeholder='Email'
          className={classNames('field__input', {
            'field__input--invalid': errors.email,
          })}
          {...register('email', {
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        <label htmlFor='name' className='field__label'>
          Email
        </label>

        {errors.email && (
          <div className='field__error'>
            {errors.email.type === 'required' ? (
              <span>This is required</span>
            ) : (
              <span>{errors.email.message}</span>
            )}
          </div>
        )}
      </div>
      <div className='field field--phone'>
        <input
          type='tel'
          placeholder='Phone'
          className={classNames('field__input', {
            'field__input--invalid': errors.phone,
          })}
          {...register('phone', {
            required: true,
            pattern: {
              value: /^\+380[0-9]{9}$/i,
              message: 'Invalid phone number',
            },
          })}
        />
        <label htmlFor='Phone' className='field__label'>
          Phone
        </label>
        {errors.phone ? (
          <div className='field__error'>
            <span>
              {errors.phone.type === 'pattern'
                ? errors.phone.message
                : 'This is required'}
            </span>
          </div>
        ) : (
          <div className='field__helper'>
            <span>+38 (XXX) XXX - XX XX</span>
          </div>
        )}
      </div>

      <div className='form__item'>
        <p className='form__item-name'>Select your position</p>
        {positions.map((position, i) => (
          <div className='radio' key={position.id}>
            <input
              type='radio'
              id={position.id}
              name='position'
              className='radio__input'
              onChange={() => setPositionId(position.id)}
              defaultChecked={positionId === position.id}
            />
            <label htmlFor={position.id} className='radio__label'>
              {position.name}
            </label>
          </div>
        ))}
      </div>

      <div
        className={classNames('field', 'field--img', {
          'field--img-invalid': errors.photo,
        })}
      >
        <input
          type='file'
          placeholder='Upload'
          id='photo'
          accept='.jpg,.jpeg'
          className='field__img-input'
          {...register('photo', {
            required: true,
            validate: {
              type: (f) => /^image\/jpe?g$/.test(Array.from(f)[0].type),
              size: (f) => Array.from(f)[0].size / (1024 * 1024) < 5,
            },
            onChange: (e) => {
              setPhotoName(e.target.value.split('\\').reverse()[0]);
            },
          })}
        />
        <label htmlFor='photo' className='field__img-label'>
          Upload
        </label>
        <span className='field__img-desc'>
          {photoName ? photoName : 'Upload your photo'}
        </span>
        {errors.photo && (
          <div className='field__error'>
            {errors.photo.type === 'required' ? (
              <span>This is required</span>
            ) : errors.photo.type === 'size' ? (
              <span>Size must not exceed 5MB</span>
            ) : (
              <span>Should be jpg/jpeg image</span>
            )}
          </div>
        )}
      </div>

      <Button
        className={classNames({ 'button--disabled': hasErrors() })}
        type='submit'
      >
        {isLoading ? <Preloader /> : 'Sign up'}
      </Button>
    </form>
  );
};
