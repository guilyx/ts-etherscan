/**
 * Converts Wei to Ether.
 * @param wei - The amount in Wei (BigInt).
 * @returns The equivalent amount in Ether (BigInt).
 */
export function weiToEther(wei: bigint): number {
  return Number(wei) / 1e18; // Convert to number for fractional Ether
}

/**
 * Converts Ether to Wei.
 * @param ether - The amount in Ether (BigInt).
 * @returns The equivalent amount in Wei (BigInt).
 */
export function etherToWei(ether: bigint): bigint {
  return ether * BigInt(1e18);
}

/**
 * Converts Wei to Gwei.
 * @param wei - The amount in Wei (BigInt).
 * @returns The equivalent amount in Gwei (BigInt).
 */
export function weiToGwei(wei: bigint): bigint {
  return wei / BigInt(1e9);
}

/**
 * Converts Gwei to Wei.
 * @param gwei - The amount in Gwei (BigInt).
 * @returns The equivalent amount in Wei (BigInt).
 */
export function gweiToWei(gwei: bigint): bigint {
  return gwei * BigInt(1e9);
}

/**
 * Converts Gwei to Ether.
 * @param gwei - The amount in Gwei (BigInt).
 * @returns The equivalent amount in Ether (BigInt).
 */
export function gweiToEther(gwei: bigint): number {
  return Number(gwei) / 1e9; // Gwei to Ether via division
}

/**
 * Converts Ether to Gwei.
 * @param ether - The amount in Ether (BigInt).
 * @returns The equivalent amount in Gwei (BigInt).
 */
export function etherToGwei(ether: bigint): bigint {
  return weiToGwei(etherToWei(ether));
}

/**
 * Formats a value in Wei as Ether with specified precision.
 * @param wei - The amount in Wei (BigInt).
 * @param precision - The number of decimal places for formatting (default: 6).
 * @returns The formatted Ether value as a string.
 */
export function formatEther(wei: bigint, precision: number = 6): string {
  const ether = Number(weiToEther(wei)); // Convert to number for formatting
  return ether.toFixed(precision); // Use number formatting for precision
}
