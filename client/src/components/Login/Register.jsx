import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useForm } from "../../hooks/useForm";
import { useRegister } from "../../hooks/useAuth";

const INITIAL_VALUES = { email: "", password: "", rePass: "" };

export default function Register() {
  const [error, setError] = useState();
  const register = useRegister();
  const navigate = useNavigate();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const registerHandler = async ({ email, password, rePass }) => {
    if (password !== rePass) {
      return setError("Password mismatch!");
    }

    try {
      await register(email, password);

      navigate("/");
    } catch (err) {
      setError(err.message)
      console.log(err.message);
    }
  };
    const { values, changeHandler, onsubmitHandler } = useForm(
      INITIAL_VALUES,
      registerHandler
    );

  return (
    <form onSubmit={onsubmitHandler}>
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
                  autoComplete="email"
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
                  required="required"
                  name="password"
                  autoComplete="new-password"
                  value={values.password}
                  onChange={changeHandler}
                />
                <i className="fa-solid fa-lock" />
                <span>create password</span>
              </div>
              <div className="inputBox">
                <input
                  type="password"
                  required="required"
                  name="rePass"
                  autoComplete="Re-pass your password"
                  value={values.rePass}
                  onChange={changeHandler}
                />
                <i className="fa-solid fa-lock"></i>
                <span>confirm password</span>
              </div>
              {error && (
                <p className="field">
                  <span>{error}</span>
                </p>
              )}
              <div className="inputBox">
                <input type="submit" value="Create Account" />
              </div>
              <p>
                Already a member ?{" "}
                <Link to="/login" className="login">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
