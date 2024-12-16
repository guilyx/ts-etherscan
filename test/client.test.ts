import { EtherscanClient } from "../src/client/client";

describe("EtherscanClient", () => {
  const mockConfig = { apiKey: "testApiKey" };
  const client = new EtherscanClient(mockConfig);

  it("should throw an error for invalid API responses", async () => {
    await expect(client.getTransactionList("invalidAddress")).rejects.toThrow(
      "Etherscan API error"
    );
  });
});
