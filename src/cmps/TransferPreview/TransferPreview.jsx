
export const TransferPreview = ({ transfer }) => {
  const dateToShow = new Date(transfer.createdAt).toLocaleTimeString("en-US");
  const timeToShow = new Date(transfer.createdAt).toLocaleDateString();
  return (
    <li className="transfer-preview">
      <p> From: {transfer.from} </p>
      <p> To: {transfer.to} </p>
      <p> Amount: {transfer.amount} </p>
      <p>
        Created at: {timeToShow}, {dateToShow}
      </p>
    </li>
  );
};
