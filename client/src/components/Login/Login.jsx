import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css'

export default function Login() {
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
  <div className="form signup">
    <h2>Sign Up</h2>
    <div className="inputBox">
      <input 
      type="text" 
      required="required" 
      ref={inputRef}
      name='username'
      id="username"
      value={formValues.username}
      onChange={changeHandler}
      />
      <i className="fa-regular fa-user" />
      <span>username</span>
    </div>
    <div className="inputBox">
      <input type="text"
       id="email"
       name='email'
       value={formValues.email}
       onChange={changeHandler}
       required="required" 
       />
      <i className="fa-regular fa-envelope" />
      <span>email address</span>
    </div>
    <div className="inputBox">
      <input type="password" 
      required="required" 
      id='password'
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
      id='rePass'
      name='repass'
      value={formValues.rePass}
      onChange={changeHandler}
      />
      <i className="fa-solid fa-lock" />
      <span>confirm password</span>
    </div>
    <div className="inputBox">
      <input type="submit" value="Create Account" />
    </div>
    <p>
      Already a member ?{" "}
      <Link to="#" className="login">
        Log in
      </Link>
    </p>
  </div>
  <div className="form signin">
    <h2>Sign In</h2>
    <div className="inputBox">
      <input type="text" required="required" />
      <i className="fa-regular fa-user" />
      <span>username</span>
    </div>
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
      <Link to="#" className="create">
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