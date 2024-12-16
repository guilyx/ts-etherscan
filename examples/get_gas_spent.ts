import { EtherscanClient } from "./client/client";
import { calculateGasSpentWei } from "./utils/gas_calculator";
import { weiToEther } from "./utils/unit_converters";

export { EtherscanClient, EtherscanConfig } from "./client/client";
export { calculateGasSpentWei } from "./utils/gas_calculator";
export { weiToEther, etherToWei, weiToGwei, gweiToWei, etherToGwei, gweiToEther } from "./utils/unit_converters";

(async () => {
  const etherscan = new EtherscanClient();

  const address = "0xebcc98573c3cd9b5b61900d1304da938b5036a0d";

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
