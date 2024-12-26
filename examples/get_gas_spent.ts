import { EtherscanClient } from "./client/client";
import { calculateGasSpentWei } from "./utils/gas_calculator";
import { weiToEther } from "./utils/unit_converters";

export { EtherscanClient, EtherscanConfig } from "./client/client";
export { calculateGasSpentWei } from "./utils/gas_calculator";
export { weiToEther, etherToWei, weiToGwei, gweiToWei, etherToGwei, gweiToEther } from "./utils/unit_converters";

(async () => {
  const etherscan = new EtherscanClient();

  const address = "0x46da6d5C741a4435283b384a10Ba44445D496a88";

  try {
    const transactions = await etherscan.getAllTransactionsFromWallet(address)
    const wei_spent = calculateGasSpentWei(transactions);
    const eth_spent = weiToEther(wei_spent);

    console.log("Retrieved %d transactions", transactions.length)
    console.log("Wei Spent: ", wei_spent);
    console.log("Eth Spent: ", eth_spent);

  } catch (error) {
    // Narrow the unknown type
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Unknown error occurred");
    }
  }
})();
