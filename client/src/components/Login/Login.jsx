import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css'
import { useForm } from '../../hooks/useForm';
import { useLogin } from '../../hooks/useAuth';

const INITIAL_VALUES = {email: '', password: '',}

export default function Login() {
  const login = useLogin();
const {values, changeHandler, onSubmit} = useForm(INITIAL_VALUES, ({email, password}) => login(email, password))

// const [formValues, setFormValues] = useState(INITIAL_VALUES)

const inputRef = useRef();

useEffect(() =>{
  inputRef.current.focus();
}, []);

// const formSubmitHandler = (e) => {
//   e.preventDefault();
// }

// const changeHandler = (e) => {
//   setFormValues(oldValue => ({
//     ...oldValue,
//     [e.target.name]: e.target.type === 'checkbox'
//     ? e.target.checked
//     : e.target.value,
//   }));
// };

    return(
      <form onSubmit={onSubmit}>
      <div className="login__section">
      <div className="login__body">
<div className="login__container">
  <div className="form signin">
    <h2>Login</h2>
    <div className="inputBox">
      <input 
      type="text"
       id="email"
       required="required" 
       name='email'
       ref={inputRef}
       value={values.email}
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
      value={values.password}
       onChange={changeHandler}
      />
      <i className="fa-solid fa-lock" />
      <span>password</span>
    </div>
    <div className="inputBox">
      <input 
      type="submit" 
      value="Login" />
    </div>
    <p>
      Not Registered ?{" "}
      <Link to="/register" className="create">
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