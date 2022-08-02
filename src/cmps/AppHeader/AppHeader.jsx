import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, setLoggedInUser } from "../../store/actions/userActions";
import { AccountMenu } from "../AccountMenu";
import homeLogo from "../../assets/icons/home.png";

export const AppHeader = () => {
  const loggedUser = useSelector((state) => state.userReducer.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onGoHome = () => navigate("/");

  const onLogout = () => {
    dispatch(logout()).then(() => {
      navigate("/");
    });
  };

  useEffect(() => {
    if (!loggedUser) dispatch(setLoggedInUser());
  }, [dispatch, loggedUser, loggedUser?.coins]);

  return (
    <header className="app-header full">
      <div className="app-logo" onClick={onGoHome}>
        <img src={homeLogo} alt="" />
      </div>
      <h1>Mister Bitcoin</h1>
      <AccountMenu
        fullname={loggedUser?.fullname}
        balance={loggedUser?.coins}
        logout={onLogout}
        navigate={navigate}
        img={loggedUser?.img}
      />
    </header>
  );
};
