import { host } from "@/utils/env";
import axios from "axios";
import type { PaymentIntent, ConfirmPaymentResult } from "@stripe/stripe-react-native";

export const fetchPaymentIntentClientSecret = async (amount: number) => {
  try {
    const response = await axios.post(`${host}/pay`, {
      currency: "usd",
      amount,
    });
    const { clientSecret } = response.data;
    return clientSecret;
  } catch (error) {
    return Promise.reject(error);
  }
};

type ConfirmPaymentFn = (
  clientSecret: string,
  data?: PaymentIntent.ConfirmParams,
  options?: PaymentIntent.ConfirmOptions
) => Promise<ConfirmPaymentResult>;

export const payRequest = async (
  name: string,
  amount: number,
  confirmPayment: ConfirmPaymentFn
) => {
  const billingDetails = {
    name: name,
  };
  try {
    const clientSecret = await fetchPaymentIntentClientSecret(amount);
    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      paymentMethodType: "Card",
      paymentMethodData: {
        billingDetails,
      },
    });
    if (error) {
      return Promise.reject(new Error(error.message || "Payment confirmation error"));
    } else if (paymentIntent) {
      return paymentIntent;
    }
  } catch (error: unknown) {
    return Promise.reject(error);
  }
};
