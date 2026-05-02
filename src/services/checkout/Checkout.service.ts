import { host } from "@/utils/Env";
import axios from "axios";

export const fetchPaymentIntentClientSecret = async (amount: number) => {
  try {
    const response = await axios.post(`${host}/pay`, {
      currency: "usd",
      amount,
    });
    const { clientSecret } = response.data;
    return clientSecret;
  } catch (error) {
    return error;
  }
};

export const payRequest = async (
  name: string,
  amount: number,
  confirmPayment: any
) => {
  const billingDetails = {
    name: name,
  };
  try {
    const clientSecret = await fetchPaymentIntentClientSecret(amount);
    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      paymentMethodType: "Card",
      billingDetails,
    });
    if (error) {
      return Promise.reject("Payment confirmation error");
    } else if (paymentIntent) {
      return paymentIntent;
    }
  } catch (error) {
    return Promise.reject("Payment confirmation error");
  }
};
