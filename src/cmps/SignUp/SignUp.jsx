import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { userService } from "../../services/userService";
import { signup } from "../../store/actions/userActions";

export const SignUp = () => {
  const [isSigned, setIsSigned] = useState(null);
  const [signupBtnClass, setSignupBtnClass] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSignUp = (ev) => {
    ev.preventDefault();
    const fullname = ev.target.querySelector("#signup-fullname").value;
    const password = ev.target.querySelector("#signup-password").value;
    const email = ev.target.querySelector("#signup-email").value;
    const phone = ev.target.querySelector("#signup-phone").value;
    const userCred = { fullname, password, email, phone };

    dispatch(signup(userCred))
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const onIsEmailSigned = async (ev) => {
    const inputEmail = ev.target.value;
    const isSigned = await userService.isSigned(inputEmail);
    if (isSigned) {
      setIsSigned(isSigned);
      setSignupBtnClass("signup-btn-is-email");
    } else {
      setIsSigned(null);
      setSignupBtnClass(null);
    }
  };

  return (
    <form onSubmit={onSignUp}>
      <h1>Signup</h1>

      <label htmlFor="signup-fullname">Full name</label>
      <input
        required
        type="text"
        id="signup-fullname"
        name="signup-fullname"
        placeholder="Ex.. Israel Israeli"
      />

      <label htmlFor="signup-password">Password</label>
      <input
        required
        type="password"
        id="signup-password"
        name="signup-password"
        placeholder="Ex.. !#@fdsf54%"
      />

      <label htmlFor="signup-email">Email</label>
      {isSigned && <p className="err-msg">Already registered</p>}
      <input
        required
        type="signup-email"
        id="signup-email"
        onChange={onIsEmailSigned}
        name="signup-email"
        placeholder="Ex.. israeli2021@gmail.com"
      />

      <label htmlFor="signup-phone">Phone number</label>
      <input
        required
        type="number"
        id="signup-phone"
        name="signup-phone"
        placeholder="Ex.. 05x-xxxxxxx"
      />

      <button disabled={isSigned} className={signupBtnClass}>
        Sign up
      </button>

      <p onClick={() => navigate("/signup/login")}>
        Already registered? <span>login</span>
      </p>
    </form>
  );
};
