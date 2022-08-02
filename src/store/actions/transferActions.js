import { transferService } from "../../services/transferService";

export const loadTransfers = () => {
  return async (dispatch) => {
    let transfers = await transferService.getTransfers();
    if (!transfers) transfers = null;

    dispatch({ type: "SET_TRANSFERS", transfers });
  };
};
export const loadTransfersByContactEmail = (contactEmail) => {
  return async (dispatch) => {
    let transfers = await transferService.getTransfersByContactEmail(
      contactEmail
    );
    if (!transfers) transfers = null;

    dispatch({ type: "SET_TRANSFERS", transfers });
  };
};

export const sendCoins = (contactId, transferAmount) => {
  return async (dispatch) => {
    try {
      const transfer = await transferService.addTransfer(
        contactId,
        transferAmount
      );
      dispatch({ type: "ADD_TRANSFER", transfer });
    } catch (err) {
      throw err;
    }
  };
};
