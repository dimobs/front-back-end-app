import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css'
import { useForm } from '../../hooks/useForm';

const INITIAL_VALUES = {email: '', password: '', rePass: '',}

export default function Register() {

useForm(INITIAL_VALUES)

const [formValues, setFormValues] =useState(INITIAL_VALUES)

const inputRef = useRef();

useEffect(() =>{
  inputRef.current.focus();
}, []);

const formSubmitHandler = (e) => {
  e.preventDefault();
}

const changeHandler = (e) => {
  setFormValues(oldValue => ({
    ...oldValue,
    [e.target.name]: e.target.type === 'checkbox'
    ? e.target.checked
    : e.target.value,
  }));
};

    return(
      <form onSubmit={formSubmitHandler}>
      <div className="login__section">
      <div className="login__body">
<div className="login__container">
<div className="form signup">
    <h2>Register</h2>
    <div className="inputBox">
      <input
       type="text"
       id="email"
       required="required" 
       autoComplete='email'
       name='email'
      ref={inputRef}
       value={formValues.email}
       onChange={changeHandler}
       />
      <i className="fa-regular fa-envelope" />
      <span>email address</span>
      </div>
    <div className="inputBox">
      <input 
      type="password" 
      required="required" 
      name='password'
      value={formValues.password}
      onChange={changeHandler}
      />
      <i className="fa-solid fa-lock" />
      <span>create password</span>
    </div>
    <div className="inputBox">
        <input 
        type="password" 
        required="required"
        name='rePass'
        autoComplete='Re-pass your password'
        value={formValues.rePass}
        onChange={changeHandler}
        />
        <i className="fa-solid fa-lock"></i>
        <span>confirm password</span>
      </div>
    <div className="inputBox">
      <input 
      type="submit" 
      value="Create Account"
      />
    </div>
    <p>
      Already a member ?{" "}
      <Link to="\login" className="login">
        Log in
      </Link>
    </p>
</div>
</div>
</div>
</div>
</form>
    )
}