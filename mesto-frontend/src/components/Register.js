import React from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

function Register({ title, btnName, submitRegisterForm, submitState, setSubmitState }) {
  return (
    <Form 
      title={title} 
      btnName={btnName} 
      submitForm={submitRegisterForm} 
      setFormSubmitState={setSubmitState}
      formSubmitState={submitState}
      children={
        <Link to='sign-in' className='form__login-link' >Уже зарегистрированы? Войти</Link>
      }
    />
  );
}

export default Register;
