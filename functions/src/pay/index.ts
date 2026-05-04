import { Request, Response } from "express";
import Stripe from "stripe";

export const payRequest = async (
  request: Request,
  response: Response,
  stripeClient: Stripe
) => {
  try {
    // Guard against missing body
    const body = request.body;
    if (!body || typeof body.amount === "undefined") {
      console.error("Missing body or amount. Body:", JSON.stringify(body));
      response.status(400).send({
        error: {
          message: "Missing required field: amount",
        },
      });
      return;
    }

    const { amount } = body;
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
      payment_method: "pm_card_visa",
    });

    // Send publishable key and PaymentIntent details to client
    response.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e: any) {
    console.error("Pay error:", e.message);
    response.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
};
