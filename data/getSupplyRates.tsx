import axios from "axios";
import { TokenRate } from "../types";

const getSupplyRates = async () => {
  const tokenSymbols = [
    "DAI",
    "USDC",
    "USDT"
  ]

  try {
    const response = await axios.get("https://api.compound.finance/api/v2/ctoken");
    const data = response.data;
    const supplyRates: TokenRate = data.cToken.filter((item: any) => 
      tokenSymbols.includes(item.underlying_symbol))
      .reduce((prev: {[key: string]: string}, curr: any) =>  
      ({ ...prev, [curr.underlying_symbol]: curr.supply_rate.value}), {})

      return supplyRates;
  } catch (error: any) {
    error.log(error);
    return {};
  }
};

export default getSupplyRates;