import usaFlag from "../../assets/icons/usa-flag.png";
import chinaFlag from "../../assets/icons/china-flag.png";
import ukFlag from "../../assets/icons/uk-flag.png";
import euroFlag from "../../assets/icons/euro-flag.png";
import { bitcoinService } from "../../services/bitcoinService";
import { useEffect, useState } from "react";

export const RatesList = () => {
  const [usdCurrency, setUsdCurrency] = useState(null);
  const [eurCurrency, setEurCurrency] = useState(null);
  const [gbpCurrency, setGbpCurrency] = useState(null);
  const [cnyCurrency, setCnyCurrency] = useState(null);

  const usdToBitcoin = async () => {
    const fetchRate = await bitcoinService.getRate("USD");
    const currencyByBitcoin = Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(1 / fetchRate);
    setUsdCurrency(currencyByBitcoin);
  };
  const eurToBitcoin = async () => {
    const fetchRate = await bitcoinService.getRate("EUR");
    const currencyByBitcoin = Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(1 / fetchRate);
    setEurCurrency(currencyByBitcoin);
  };
  const gbpToBitcoin = async () => {
    const fetchRate = await bitcoinService.getRate("GBP");
    const currencyByBitcoin = Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(1 / fetchRate);
    setGbpCurrency(currencyByBitcoin);
  };
  const cnyToBitcoin = async () => {
    const fetchRate = await bitcoinService.getRate("CNY");
    const currencyByBitcoin = Intl.NumberFormat("zh-CN", {
      style: "currency",
      currency: "CNY",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(1 / fetchRate);
    setCnyCurrency(currencyByBitcoin);
  };

  useEffect(() => {
    usdToBitcoin();
    eurToBitcoin();
    gbpToBitcoin();
    cnyToBitcoin();
  }, []);

  return (
    <div className="rates-list">
      <h2>Bitcoin Exchange Rate</h2>
      <div className="currency-list">
        <div className="usd-rate">
          <img src={usaFlag} alt="" />
          <p> (USD)</p>
          <h3>{usdCurrency}</h3>
        </div>
        <div className="eur-rate">
          <img src={euroFlag} alt="" />
          <p>(EUR)</p>
          <h3>{eurCurrency}</h3>
        </div>
        <div className="gbp-rate">
          <img src={ukFlag} alt="" />
          <p>(GBP)</p>
          <h3>{gbpCurrency}</h3>
        </div>
        <div className="cny-rate">
          <img src={chinaFlag} alt="" />
          <p>(CNY)</p>
          <h3>{cnyCurrency}</h3>
        </div>
      </div>
    </div>
  );
};
