export function standardizeString(input: string): string {
  input = input.trim();
  input = input.toLowerCase();
  input = input.replace(/\s+/g, " ");
  return input;
}
