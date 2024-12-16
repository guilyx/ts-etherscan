import axios, { AxiosInstance } from "axios";
import dotenv from "dotenv";

dotenv.config();

export interface EtherscanConfig {
  apiKey?: string; // Optional, fallback to ENV variable
  baseUrl?: string; // Defaults to Etherscan base URL
}

export class EtherscanClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly httpClient: AxiosInstance;

  constructor(config: EtherscanConfig = {}) {
    this.apiKey = config.apiKey || process.env.ETHERSCAN_API_KEY || "";

    if (!this.apiKey) {
      throw new Error("Missing Etherscan API key. Set it in .env or pass it via the constructor.");
    }

    this.baseUrl = config.baseUrl || "https://api.etherscan.io/v2/api";
    this.httpClient = axios.create({ baseURL: this.baseUrl });
  }

  // Function to call Etherscan endpoints
  private async fetchFromEtherscan(params: Record<string, any>) {
    const response = await this.httpClient.get("/", {
      params: {
        ...params,
        tag: "latest",
        apikey: this.apiKey,
        chainid: 1,
      },
    });

    if (response.data.status !== "1") {
      throw new Error(`Etherscan API error: ${response.data.message}`);
    }

    return response.data.result;
  }

  /**
 * Get All Transactions for a Wallet Address
 * @param address The Ethereum wallet address
 * @returns A list of all transactions for the given address
 */
  public async getAllTransactionsFromWallet(address: string): Promise<any[]> {
    const allTransactions: any[] = [];
    let page = 1;
    const offset = 10000; // Maximum allowed records per page

    while (true) {
      const transactions = await this.getTransactionList(address, 0, 99999999, page, offset, "asc");

      // Add the fetched transactions to the main array
      allTransactions.push(...transactions);

      // If the number of fetched transactions is less than the offset, we've reached the last page
      if (transactions.length < offset) {
        break;
      }

      // Increment the page number for the next request
      page++;
    }

    return allTransactions;
  }


  /**
   * Get Normal Transactions for an Address
   * @param address The Ethereum address
   * @param startBlock Start block number (default: 0)
   * @param endBlock End block number (default: 99999999)
   * @param page Page number (default: 1)
   * @param offset Max records per page (default: 100)
   * @param sort Sort order ('asc' or 'desc')
   */
  public async getTransactionList(
    address: string,
    startBlock: number = 0,
    endBlock: number = 99999999,
    page: number = 1,
    offset: number = 100,
    sort: "asc" | "desc" = "asc"
  ) {
    return this.fetchFromEtherscan({
      module: "account",
      action: "txlist",
      address,
      startblock: startBlock,
      endblock: endBlock,
      page,
      offset,
      sort,
    });
  }

  /**
   * Get Internal Transactions for an Address
   * @param address The Ethereum address
   * @param startBlock Start block number (default: 0)
   * @param endBlock End block number (default: 99999999)
   * @param page Page number (default: 1)
   * @param offset Max records per page (default: 100)
   * @param sort Sort order ('asc' or 'desc')
   */
  public async getInternalTransactions(
    address: string,
    startBlock: number = 0,
    endBlock: number = 99999999,
    page: number = 1,
    offset: number = 100,
    sort: "asc" | "desc" = "asc"
  ) {
    return this.fetchFromEtherscan({
      module: "account",
      action: "txlistinternal",
      address,
      startblock: startBlock,
      endblock: endBlock,
      page,
      offset,
      sort,
    });
  }

  /**
   * Get ERC20 Token Transfer Events for an Address
   * @param address The Ethereum address
   * @param contractAddress The token contract address (optional)
   * @param startBlock Start block number (default: 0)
   * @param endBlock End block number (default: 99999999)
   * @param page Page number (default: 1)
   * @param offset Max records per page (default: 100)
   * @param sort Sort order ('asc' or 'desc')
   */
  public async getERC20Transfers(
    address: string,
    contractAddress?: string,
    startBlock: number = 0,
    endBlock: number = 99999999,
    page: number = 1,
    offset: number = 100,
    sort: "asc" | "desc" = "asc"
  ) {
    return this.fetchFromEtherscan({
      module: "account",
      action: "tokentx",
      address,
      contractaddress: contractAddress,
      startblock: startBlock,
      endblock: endBlock,
      page,
      offset,
      sort,
    });
  }

  /**
   * Get ERC721 Token Transfer Events for an Address
   * @param address The Ethereum address
   * @param contractAddress The NFT contract address (optional)
   * @param startBlock Start block number (default: 0)
   * @param endBlock End block number (default: 99999999)
   * @param page Page number (default: 1)
   * @param offset Max records per page (default: 100)
   * @param sort Sort order ('asc' or 'desc')
   */
  public async getERC721Transfers(
    address: string,
    contractAddress?: string,
    startBlock: number = 0,
    endBlock: number = 99999999,
    page: number = 1,
    offset: number = 100,
    sort: "asc" | "desc" = "asc"
  ) {
    return this.fetchFromEtherscan({
      module: "account",
      action: "tokennfttx",
      address,
      contractaddress: contractAddress,
      startblock: startBlock,
      endblock: endBlock,
      page,
      offset,
      sort,
    });
  }

  /**
   * Get Mined Blocks by an Address
   * @param address The miner's address
   * @param blockType Block type ('blocks' or 'uncles')
   */
  public async getMinedBlocks(address: string, blockType: "blocks" | "uncles" = "blocks") {
    return this.fetchFromEtherscan({
      module: "account",
      action: "getminedblocks",
      address,
      blocktype: blockType,
    });
  }

  /**
   * Get Balance for a Single Address
   * @param address The Ethereum address
   */
  public async getBalance(address: string) {
    return this.fetchFromEtherscan({
      module: "account",
      action: "balance",
      address,
      tag: "latest",
    });
  }

  /**
   * Get Balance for Multiple Addresses
   * @param addresses List of Ethereum addresses
   */
  public async getBalances(addresses: string[]) {
    const addressList = addresses.join(",");
    return this.fetchFromEtherscan({
      module: "account",
      action: "balancemulti",
      address: addressList,
      tag: "latest",
    });
  }

  /**
   * Get the current gas oracle for Ethereum.
   * @returns Gas prices in low, medium, and high levels.
   */
  public async getGasOracle() {
    return this.fetchFromEtherscan({
      module: "gastracker",
      action: "gasoracle",
    });
  }

  /**
   * Get the daily average gas limit and usage for a given date.
   * @param date The date in YYYY-MM-DD format.
   * @returns Gas limit and usage statistics.
   */
  public async getDailyGasUsage(date: string) {
    return this.fetchFromEtherscan({
      module: "gastracker",
      action: "dailygasusage",
      date,
    });
  }

  /**
   * Get the historical average gas price for a specific date.
   * @param date The date in YYYY-MM-DD format.
   * @returns Historical gas price data.
   */
  public async getHistoricalGasPrice(date: string) {
    return this.fetchFromEtherscan({
      module: "gastracker",
      action: "averagegasprice",
      date,
    });
  }

  /**
   * Get an estimation of transaction confirmation time for a given gas price.
   * @param gasPrice The gas price in Gwei.
   * @returns Estimated confirmation time in seconds.
   */
  public async getEstimatedConfirmationTime(gasPrice: number) {
    return this.fetchFromEtherscan({
      module: "gastracker",
      action: "gasestimate",
      gasprice: gasPrice,
    });
  }
}
