const getInitialSecrets = (input: string) => input.split("\n").map((n) => parseInt(n));
const getSecretsTotal = (secrets: number[]) => secrets.reduce((acc, secret) => acc + secret, 0);
const getPrice = (secret: number) => secret % 10;
const mod = (n: number, m: number) => ((n % m) + m) % m;

const evolveSecret = (secret: number) => {
  secret = mod((secret * 64) ^ secret, 16777216);
  secret = mod(Math.floor(secret / 32) ^ secret, 16777216);
  secret = mod((secret * 2048) ^ secret, 16777216);
  return secret;
};

export const monkeyMarketPart1 = (input: string) => {
  const initial = getInitialSecrets(input);
  const evolved = initial.map((secret) => {
    for (let i = 0; i < 2000; i++) {
      secret = evolveSecret(secret);
    }
    return secret;
  });
  return getSecretsTotal(evolved);
};

export const monkeyMarketPart2 = (input: string) => {
  const initialSecrets = getInitialSecrets(input);
  const totals = new Map<string, number>();
  initialSecrets.map((secret) => {
    const keys = new Set();
    let curr = 0,
      prev1 = 0,
      prev2 = 0,
      prev3 = 0,
      lastPrice = 0;
    for (let i = 0; i < 2001; i++) {
      const price = getPrice(secret);
      secret = evolveSecret(secret);
      if (i > 0) {
        prev3 = prev2;
        prev2 = prev1;
        prev1 = curr;
        curr = price - lastPrice;
      }
      if (i > 3) {
        const key = `${prev3},${prev2},${prev1},${curr}`;
        if (!keys.has(key)) {
          keys.add(key);
          totals.set(key, (totals.get(key) || 0) + price);
        }
      }
      lastPrice = price;
    }
    return secret;
  });
  return Math.max(...[...totals.values()]);
};
