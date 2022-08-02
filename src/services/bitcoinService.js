const axios = require("axios");

export const bitcoinService = {
  getRate,
  getMarketPrice,
  getConfirmedTransactions,
};

//return usd rate
async function getRate(currency) {
  try {
    const response = await axios.get(
      `https://blockchain.info/tobtc?currency=${currency}&value=1`
    );
    return response.data;
  } catch (error) {
    console.error("bitcoin service: get rate: cant fetch rate data", error);
  }
}

async function getMarketPrice() {
  try {
    const response = await axios.get(
      "https://api.blockchain.info/charts/market-price?timespan=1months&format=json&cors=true"
    );
    // const response = await axios.get(
    //   "https://api.blockchain.info/charts/market-price?timespan=1months&format=json&cors=true"
    // );
    return response.data.values;
  } catch (error) {
    console.error("bitcoin service: get rate: cant fetch rate data", error);
  }
}

async function getConfirmedTransactions() {
  try {
    const res = await axios.get(
      "https://api.blockchain.info/charts/transactions-per-second?timespan=12months&format=json&cors=true"
    );
    const confirmedTransactions = res.data.values.map(({ x, y }) => {
      return {
        x: new Date(x),
        y: y.toFixed(2),
      };
    });
    return confirmedTransactions;
  } catch (err) {
    console.error("bitcoin service: get rate: cant fetch rate data", err);
    throw err;
  }
}
