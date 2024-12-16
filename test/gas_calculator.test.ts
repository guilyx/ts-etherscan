import { calculateGasSpentWei } from "../src/utils/gas_calculator";
import { weiToEther, weiToGwei } from "../src/utils/unit_converters";

describe("Gas Calculator Utilities", () => {
  const transactions = [
    { gasUsed: BigInt(21000), gasPrice: BigInt(1e9), isError: "0" }, // 1 Gwei in Wei
    { gasUsed: BigInt(50000), gasPrice: BigInt(2e9), isError: "0" }, // 2 Gwei in Wei
  ];

  it("should calculate the correct total gas spent in Wei", () => {
    const totalGasSpent = calculateGasSpentWei(transactions);
    expect(totalGasSpent).toBe(BigInt(21000 * 1e9 + 50000 * 2e9)); // Already in Wei
  });

  it("should convert total gas spent from Wei to Ether", () => {
    const totalGasSpent = calculateGasSpentWei(transactions);
    const ether = weiToEther(totalGasSpent);
    expect(ether).toBe(0.000121); // Total Ether (0.000121 Ether)
  });

  it("should convert total gas spent from Wei to Gwei", () => {
    const totalGasSpent = calculateGasSpentWei(transactions);
    const gwei = weiToGwei(totalGasSpent);
    expect(gwei).toBe(BigInt(121000)); // Total Gwei (121,000 Gwei)
  });

  it("should ignore failed transactions", () => {
    const transactionsWithError = [
      ...transactions,
      { gasUsed: BigInt(30000), gasPrice: BigInt(3e9), isError: "1" }, // Failed transaction
    ];
    const totalGasSpent = calculateGasSpentWei(transactionsWithError);
    expect(totalGasSpent).toBe(BigInt(21000 * 1e9 + 50000 * 2e9)); // Same as above, ignoring the failed tx
  });
});
