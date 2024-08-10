import './login.css'

export default function Login() {


    return(
      <div className="login__section">
      <div className="login__body">
<div className="login__container">
  <div className="form signup">
    <h2>Sign Up</h2>
    <div className="inputBox">
      <input type="text" required="required" />
      <i className="fa-regular fa-user" />
      <span>username</span>
    </div>
    <div className="inputBox">
      <input type="text" required="required" />
      <i className="fa-regular fa-envelope" />
      <span>email address</span>
    </div>
    <div className="inputBox">
      <input type="password" required="required" />
      <i className="fa-solid fa-lock" />
      <span>create password</span>
    </div>
    <div className="inputBox">
      <input type="password" required="required" />
      <i className="fa-solid fa-lock" />
      <span>confirm password</span>
    </div>
    <div className="inputBox">
      <input type="submit" value="Create Account" />
    </div>
    <p>
      Already a member ?{" "}
      <a href="#" className="login">
        Log in
      </a>
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
      <a href="#" className="create">
        Create an account
      </a>
    </p>
  </div>
</div>
</div>
</div>
    )
}