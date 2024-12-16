import { weiToEther, gweiToWei } from "./unit_converters";

/**
 * Calculates the total gas spent for a given list of transactions.
 * Filters out failed transactions (`isError !== "0"`) and computes the sum of gas fees.
 *
 * @param transactions - Array of transaction objects with gasUsed, gasPrice, and isError fields.
 * @returns Total gas spent in Wei as a BigInt.
 */
export function calculateGasSpentWei(transactions: any[]): bigint {
  return transactions
    .filter((tx) => tx.isError === "0") // Only include successful transactions
    .reduce((total, tx) => {
      const gasUsed = BigInt(tx.gasUsed); // Convert gasUsed to BigInt
      const gasPriceInWei = BigInt(tx.gasPrice); // Convert Gwei to Wei using the converter
      const gasFee = gasUsed * gasPriceInWei; // Calculate gas fee in Wei
      return total + gasFee; // Accumulate total fees in Wei
    }, BigInt(0)); // Start with 0 as BigInt
}
