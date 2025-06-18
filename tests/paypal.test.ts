import { generateAccessToken } from "../lib/paypal";

// Test for generating access token from PayPal

test("generates an access token from PayPal's API", async () => {
  const responseToken = await generateAccessToken();
  console.log(responseToken);
  expect(typeof responseToken).toBe("string");
  expect(responseToken.length).toBeGreaterThan(0);
});
