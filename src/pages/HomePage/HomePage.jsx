import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTransfers } from "../../store/actions/transferActions.js";
// import { RegisterBtn } from "../../cmps/RegisterBtn/RegisterBtn.jsx";
import { RatesList } from "../../cmps/RatesList/RatesList.jsx";
import { TransactionsPreview } from "../../cmps/TransactionsPreview/TransactionsPreview.jsx";

export const HomePage = ({ history }) => {
  const loggedUser = useSelector((state) => state.userReducer.user);
  const transfers = useSelector((state) => state.transferReducer.transfers);

  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedUser) dispatch(loadTransfers());
  }, [dispatch, loggedUser]);

  return loggedUser ? (
    <div className="home-page logged-user">
      <RatesList />
      {transfers && (
        <TransactionsPreview transactions={transfers.slice(0, 3)} />
      )}
    </div>
  ) : (
    <div className="home-page guest">
      <RatesList />
      <div className="guest-welcome">
        <h1>Welcome to Mister Bitcoin</h1>
        <h3>Demo bitcoin wallet</h3>
        {/* <RegisterBtn /> */}
        <p onClick={() => history.push("/signup/login")}>
          Already registered? <span className="login-btn">login</span>
        </p>
      </div>
    </div>
  );
};
