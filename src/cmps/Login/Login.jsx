import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../../store/actions/userActions";
import loginLoadingGif from "../../assets/icons/loading.gif";

export const Login = () => {
  const [emailInputClass, setEmailInputClass] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [passwordInputClass, setPasswordInputClass] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const loggedUser = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = (ev) => {
    setIsLoading(true);
    ev.preventDefault();
    const email = ev.target.querySelector("#login-email").value;
    const password = ev.target.querySelector("#login-password").value;
    const userCred = { email, password };

    dispatch(login(userCred))
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        setErrMsg(err.response?.data);
        setTimeout(() => {
          setErrMsg(null);
        }, 2000);
        if (err.response?.data === "Invalid email") {
          setEmailInputClass("error-input");
          setTimeout(() => {
            setEmailInputClass(null);
          }, 2000);
        }
        if (err.response?.data === "Invalid password") {
          setPasswordInputClass("error-input");
          setTimeout(() => {
            setPasswordInputClass(null);
          }, 2000);
        }
      });
  };

  return !isLoading ? (
    <form className="login-form" onSubmit={onLogin}>
      <h1>Log In</h1>

      <label htmlFor="login-email">Email</label>
      {errMsg === "Invalid email" && <p className="err-msg">{errMsg}</p>}
      <input
        className={emailInputClass}
        required
        type="email"
        id="login-email"
        name="login-email"
        placeholder="Ex.. israeli2021@gmail.com"
      />

      <label htmlFor="login-password">Password</label>
      {errMsg === "Invalid password" && <p className="err-msg">{errMsg}</p>}
      <input
        className={passwordInputClass}
        required
        type="password"
        id="login-password"
        name="login-password"
        placeholder="Ex.. !#@fdsf54%"
      />
      <button>Login</button>
      <p onClick={() => navigate("/signup")}>Register now</p>
    </form>
  ) : (
    <img className="login-loading" src={loginLoadingGif} alt="" />
  );
};
