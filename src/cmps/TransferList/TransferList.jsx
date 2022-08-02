import { TransferPreview } from "../TransferPreview/TransferPreview";

export const TransferList = ({ transfers, title }) => {
  return (
    <section className="transfer-list">
      <h3>{title}</h3>
      <ul className="card-list">
        {transfers.map((transfer, idx) => (
          <TransferPreview transfer={transfer} key={idx} />
        ))}
      </ul>
    </section>
  );
};
