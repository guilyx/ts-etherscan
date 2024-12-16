# **Etherscan Client for TypeScript**

A partially-still-in-progress-featured TypeScript client for interacting with the Etherscan API. This library provides easy access to transaction details, token transfers, gas tracking, and more.

---

## **Current Features**
- **Transaction History**: Fetch normal and internal transactions.
- **Token Transfers**: Query ERC20 and ERC721 transfers.
- **Balances**: Get balance for single or multiple accounts.
- **Gas Tracking**: Retrieve gas prices, historical gas data, and confirmation times.
- **TypeScript Support**: Fully typed API responses and utilities.

---

## **Installation**
Install the package via npm:

```bash
npm install etherscan-client

## **Usage**

### Examples

1. Fetch Transaction List

**Description:**

This example fetches the first 100 normal transactions for the provided Ethereum address, starting from block 0 to the latest block, sorted in ascending order.

```ts
import { EtherscanClient } from "etherscan-client";

const etherscan = new EtherscanClient({ apiKey: "YOUR_ETHERSCAN_API_KEY" });

(async () => {
  const address = "0xYourEthereumAddress";

  const transactions = await etherscan.getTransactionList(address, 0, 99999999, 1, 100, "asc");
  console.log("Transactions:", transactions);
})();
```

2. Fetch Internal Transactions

**Description:**
Internal transactions are interactions between smart contracts. This example fetches up to 100 internal transactions for the given address.

```ts
import { EtherscanClient } from "etherscan-client";

const etherscan = new EtherscanClient({ apiKey: "YOUR_ETHERSCAN_API_KEY" });

(async () => {
  const address = "0xYourEthereumAddress";

  const internalTransactions = await etherscan.getInternalTransactions(address, 0, 99999999, 1, 100, "asc");
  console.log("Internal Transactions:", internalTransactions);
})();
```

3. Fetch ERC20 Token Transfers

**Description:**
This fetches all ERC20 token transfers associated with the given address. You can optionally filter by a specific contract address.

```ts
import { EtherscanClient } from "etherscan-client";

const etherscan = new EtherscanClient({ apiKey: "YOUR_ETHERSCAN_API_KEY" });

(async () => {
  const address = "0xYourEthereumAddress";

  const tokenTransfers = await etherscan.getERC20Transfers(address);
  console.log("ERC20 Transfers:", tokenTransfers);
})();
```

4. Get Gas Oracle

**Description:**
The getGasOracle method retrieves current gas prices (in Gwei) for low, medium, and high transaction priorities.

```ts
import { EtherscanClient } from "etherscan-client";

const etherscan = new EtherscanClient({ apiKey: "YOUR_ETHERSCAN_API_KEY" });

(async () => {
  const gasPrices = await etherscan.getGasOracle();
  console.log("Gas Prices:", gasPrices);
})();
```

5. Estimate Confirmation Time

**Description:**
This example estimates the time (in seconds) it would take for a transaction to confirm at a gas price of 50 Gwei.

```ts
import { EtherscanClient } from "etherscan-client";

const etherscan = new EtherscanClient({ apiKey: "YOUR_ETHERSCAN_API_KEY" });

(async () => {
  const gasPrice = 50; // Gas price in Gwei
  const confirmationTime = await etherscan.getEstimatedConfirmationTime(gasPrice);
  console.log(`Estimated Confirmation Time: ${confirmationTime} seconds`);
})();
```

6. Fetch Wallet Balance

**Description:**
This fetches the balance for the provided Ethereum address, returning the value in Wei.

```ts
import { EtherscanClient } from "etherscan-client";

const etherscan = new EtherscanClient({ apiKey: "YOUR_ETHERSCAN_API_KEY" });

(async () => {
  const address = "0xYourEthereumAddress";

  const balanceInWei = await etherscan.getBalance(address);
  console.log("Balance (in Wei):", balanceInWei);
})();
```

7. Fetch Historical Gas Price

**Description:**
This example retrieves the average gas price for a specific date. The date must be in the YYYY-MM-DD format.

```ts
import { EtherscanClient } from "etherscan-client";

const etherscan = new EtherscanClient({ apiKey: "YOUR_ETHERSCAN_API_KEY" });

(async () => {
  const date = "2024-01-01"; // Date in YYYY-MM-DD format

  const historicalGasPrice = await etherscan.getHistoricalGasPrice(date);
  console.log(`Average Gas Price on ${date}:`, historicalGasPrice);
})();
```

8. Calculate Gas Spent

**Description:**
This example calculates the total gas spent for two successful transactions, converting the result from Wei to Ether for easier readability.

```ts
import { calculateGasSpentWei, weiToEther } from "etherscan-client/utils";

const transactions = [
  { gasUsed: BigInt(21000), gasPrice: BigInt(50), isError: "0" },
  { gasUsed: BigInt(50000), gasPrice: BigInt(100), isError: "0" },
];

const totalGasSpentWei = calculateGasSpentWei(transactions);
const totalGasSpentEther = weiToEther(totalGasSpentWei);

console.log(`Total Gas Spent: ${totalGasSpentEther} Ether`);
```