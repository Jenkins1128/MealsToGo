import {host} from '../../utils/env';
import axios from 'axios';

export const fetchPaymentIntentClientSecret = async amount => {
  try {
    const response = await axios.post(`${host}/pay`, {
      currency: 'usd',
      amount,
    });
    const {clientSecret} = response.data;
    return clientSecret;
  } catch (error) {
    return error;
  }
};

export const payRequest = async (name, amount, confirmPayment) => {
  const billingDetails: BillingDetails = {
    name: name,
  };
  // Fetch the intent client secret from the backend
  try {
    const clientSecret = await fetchPaymentIntentClientSecret(amount);
    // Confirm the payment with the card details
    const {paymentIntent, error} = await confirmPayment(clientSecret, {
      type: 'Card',
      billingDetails,
    });
    if (error) {
      return Promise.reject('Payment confirmation error', error);
    } else if (paymentIntent) {
      return paymentIntent;
    }
  } catch (error) {
    return Promise.reject('Payment confirmation error', error);
  }
};
