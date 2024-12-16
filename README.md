# ts-etherscan
A Typescript Etherscan wrapper for their V2 API.



examples:

```ts
import { calculateGasSpentWei, formatEther } from "./gas_calculator";

const transactions = [
  { gasUsed: "21000", gasPrice: "1", isError: "0" }, // 1 Gwei gas price
  { gasUsed: "30000", gasPrice: "1.5", isError: "0" }, // 1.5 Gwei gas price
];

const totalGasSpentInWei = calculateGasSpentWei(transactions);
console.log(totalGasSpentInWei.toString()); // Should print "66000000000" (in Wei)

const totalGasSpentInEther = formatEther(totalGasSpentInWei);
console.log(totalGasSpentInEther); // Should print "0.000066"
```