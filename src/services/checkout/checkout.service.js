const API_URL = '';

export const fetchPaymentIntentClientSecret = async () => {
  const response = await fetch(`${API_URL}/create-payment-intent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      currency: 'usd',
    }),
  });
  const {clientSecret} = await response.json();

  return clientSecret;
};
