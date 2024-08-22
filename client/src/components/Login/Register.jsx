import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css'
import { useForm } from '../../hooks/useForm';

const INITIAL_VALUES = {email: '', password: '', rePass: '',}

export default function Login() {

useForm(INITIAL_VALUES)

const [formValues, setFormValues] =useState({
  username: '',
  email: '',
  password: '',
  rePass: '',
})

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
  <div className="form signin">
    <h2>Sign In</h2>
    {/* <div className="inputBox">
      <input type="text" required="required" />
      <i className="fa-regular fa-user" />
      <span>username</span>
    </div> */}
    <div className="inputBox">
      <input type="password" required="required" />
      <i className="fa-solid fa-lock" />
      <span>password</span>
    </div>
    <div className="inputBox">
      <input type="submit" value="Login" />
    </div>
    <p>
      Not Registered ?{" "}
      <Link to="\register" className="create">
        Create an account
      </Link>
    </p>
  </div>
</div>
</div>
</div>
</form>
    )
}