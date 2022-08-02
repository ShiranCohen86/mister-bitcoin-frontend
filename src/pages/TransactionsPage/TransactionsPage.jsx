import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransfersTable } from "../../cmps/TransfersTable/TransfersTable";
import { loadTransfers } from "../../store/actions/transferActions";

export const TransactionsPage = (props) => {
  const transfers = useSelector((state) => state.transferReducer.transfers);
  const loggedUser = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedUser) dispatch(loadTransfers());
  }, [dispatch, loggedUser]);

  return (
    <div>
      {transfers && (
        <div className="transfers-table">
          <TransfersTable title={"My Activity"} rows={transfers} />
        </div>
      )}
    </div>
  );
};
