import { useState } from "react";
import NiceButton from "../NiceButton/NiceButton";
import sendBtnLogo from "../../assets/icons/send.png";

export const TransferFund = ({ onTransferCoins }) => {
  const [transferAmount, setTransferAmount] = useState(0);

  const transferCoins = (ev) => {
    onTransferCoins(transferAmount, ev);
  };

  const handleChange = ({ target }) => {
    const value = target.type === "number" ? +target.value : target.value;
    setTransferAmount(value);
  };

  const IconSendBtn = () => <img src={sendBtnLogo} alt="" />;

  return (
    <section className="transfer-fund">
      <form onSubmit={transferCoins}>
        <label htmlFor="amount">Transaction amount</label>
        <input
          required
          placeholder="Amount"
          min="0"
          id="amount"
          type="number"
          onChange={handleChange}
          name="amount"
          step="0.01"
        />
        <NiceButton
          Icon={IconSendBtn}
          onClick={transferCoins}
          className={"send-coin-btn"}
        ></NiceButton>
      </form>
    </section>
  );
};
