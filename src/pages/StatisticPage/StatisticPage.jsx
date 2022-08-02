import { useEffect, useState } from "react";
import { bitcoinService } from "../../services/bitcoinService";
import { Line } from "react-chartjs-2";

export const StatisticPage = () => {
  const [marketPrice, setMarketPrice] = useState(null);
  const [transactionsData, getTransactionsData] = useState(null);

  useEffect(() => {
    const loadMarketPrice = async () => {
      const data = await bitcoinService.getMarketPrice();
      const marketPrice = data.map((coord) => coord.y);
      const marketPriceLabels = data.map((coord) =>
        new Date(coord.x).toLocaleTimeString()
      );
      let marketPriceData = {
        labels: marketPriceLabels,
        datasets: [
          {
            label: "Market Price (USD)",
            data: marketPrice,
            fill: false,
            backgroundColor: "red",
            // tension: 0.1
            // borderColor: "rgba(255, 99, 132, 0.2)",
          },
        ],
      };
      setMarketPrice(marketPriceData);
    };
    const loadTransactionsData = async () => {
      const data = await bitcoinService.getConfirmedTransactions();

      const confirmedTransactions = data.map((coord) => coord.y).slice(0, 30);
      const transactionLabels = data.map((coord) =>
        new Date(coord.x).toLocaleTimeString()
      ).slice(0, 30);
      const transactionsData = {
        labels: transactionLabels,
        datasets: [
          {
            label: "Confirmed Transactions Per Day",
            data: confirmedTransactions,
            fill: false,
            backgroundColor: "red",
          },
        ],
      };
      console.log(transactionsData.datasets[0].data);
      getTransactionsData(transactionsData);
    };
    loadMarketPrice();
    loadTransactionsData();
  }, []);

  return (
    <div className="statistic-page">
      {marketPrice && <Line height="350" width="700" data={marketPrice} />}
      {transactionsData && (
        <Line height="350" width="700" data={transactionsData} />
      )}
    </div>
  );
};
