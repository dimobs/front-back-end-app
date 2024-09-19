import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useForm } from "../../hooks/useForm";
import { useLogin } from "../../hooks/useAuth";
import { useError } from "../../context/notification/ErrorContext";

const INITIAL_VALUES = { email: "", password: "" };

export default function Login() {
  const {setError} = useError();
  const navigate = useNavigate();
  const login = useLogin();

  const loginHandler = async ({ email, password }) => {  
     if (!email || !password) {
      return      
     }
    
    try {
      await login(email, password);
      navigate("/");
      setError(`Welcome back, ${(email.split("@")[0]).toUpperCase()}`, 'success')
    } catch (err) {
      setError(err.message, 'warning', 2000)
      console.log(err);      
      console.log(err.message);
    }
  };

  const { values, changeHandler, onsubmitHandler } = useForm(
    INITIAL_VALUES,
    loginHandler
  );

  // const [formValues, setFormValues] = useState(INITIAL_VALUES)

  const inputRef = useRef();

  useEffect(() => {
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

  return (
    <form onSubmit={onsubmitHandler}>
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
                  autoComplete="on"
                  name="email"
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
                  min={3}
                  max={9}
                  required="required"
                  autoComplete="on"
                  name="password"
                  value={values.password}
                  onChange={changeHandler}
                />
                <i className="fa-solid fa-lock" />
                <span>password</span>
                <label htmlFor="">
                  Show pass
                  <input type="checkbox" name="checkbox" />
                </label>
              </div>
              <div className="inputBox">
                <input type="submit" value="Login" />
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
  );
}
