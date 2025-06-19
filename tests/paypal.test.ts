import { generateAccessToken, paypal } from "../lib/paypal";

// Test for generating access token from PayPal

test("generates an access token from PayPal's API", async () => {
  const responseToken = await generateAccessToken();
  console.log(responseToken);
  expect(typeof responseToken).toBe("string");
  expect(responseToken.length).toBeGreaterThan(0);
});

// Test for creating a paypal order

test("creates a paypal order", async () => {
  const token = await generateAccessToken();
  const price = 10.0;

  const responseOrder = await paypal.createOrder(price);
  console.log(responseOrder);

  expect(responseOrder).toHaveProperty("id");
  expect(responseOrder).toHaveProperty("status");
  expect(responseOrder.status).toBe("CREATED");
});

// Test to capture payment with mock order
// We use a spy here to control return values

test("simulate capturing a payment from an order", async () => {
  const orderId = "100";

  const mockCapturePayment = jest
    .spyOn(paypal, "capturePayment")
    .mockResolvedValue({
      status: "COMPLETED",
    });

  const responseCapture = await paypal.capturePayment(orderId);

  expect(responseCapture).toHaveProperty("status", "COMPLETED");

  mockCapturePayment.mockRestore();
});
