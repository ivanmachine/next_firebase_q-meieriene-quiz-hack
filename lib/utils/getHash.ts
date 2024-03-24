import CryptoJS from "crypto-js";
export function getHash(input: string): string {
  if (typeof input !== "string")
    throw new Error("getHash input is not a string");
  input = input.trim();
  input = input.toLowerCase();
  input = input.replace(/\s+/g, " ");
  input = input.substring(0, 35);
  const fullHash = CryptoJS.SHA256(input).toString();
  const shortHash = fullHash.substring(0, 8);
  return shortHash;
}
