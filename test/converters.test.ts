import {
  weiToEther,
  etherToWei,
  weiToGwei,
  gweiToWei,
  gweiToEther,
  etherToGwei,
} from "../src/utils/unit_converters";

describe("Unit Converters", () => {
  it("should convert Wei to Ether", () => {
    expect(weiToEther(BigInt(1e18))).toBe(1); // 1 Ether
    expect(weiToEther(BigInt(1e16))).toBe(0.01); // 0.01 Ether
  });

  it("should convert Ether to Wei", () => {
    expect(etherToWei(BigInt(1))).toBe(BigInt(1e18)); // 1 Ether in Wei
    expect(etherToWei(BigInt(0))).toBe(BigInt(0)); // 0 Ether in Wei
  });

  it("should convert Wei to Gwei", () => {
    expect(weiToGwei(BigInt(1e9))).toBe(BigInt(1)); // 1 Gwei
    expect(weiToGwei(BigInt(1e10))).toBe(BigInt(10)); // 10 Gwei
  });

  it("should convert Gwei to Wei", () => {
    expect(gweiToWei(BigInt(1))).toBe(BigInt(1e9)); // 1 Gwei in Wei
    expect(gweiToWei(BigInt(10))).toBe(BigInt(1e10)); // 10 Gwei in Wei
  });

  it("should convert Gwei to Ether", () => {
    expect(gweiToEther(BigInt(1e9))).toBe(1); // 1 Gwei in Ether
    expect(gweiToEther(BigInt(1e7))).toBe(0.01); // 0.01 Ether
  });

  it("should convert Ether to Gwei", () => {
    expect(etherToGwei(BigInt(1))).toBe(BigInt(1e9)); // 1 Ether in Gwei
    expect(etherToGwei(BigInt(0))).toBe(BigInt(0)); // 0 Ether in Gwei
  });
});
