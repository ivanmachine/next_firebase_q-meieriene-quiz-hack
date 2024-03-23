export function standardizeString(input: string): string {
  input = input.trim();
  input = input.toLowerCase();
  input = input.replace(/\s+/g, " ");
  return input;
}

export function standardizeAnswer(input: string): string {
  input = input.trim();
  input = input.replace(/\s+/g, " ");
  return input;
}
