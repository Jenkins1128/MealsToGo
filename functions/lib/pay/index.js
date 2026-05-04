"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payRequest = void 0;
const payRequest = async (request, response, stripeClient) => {
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
    }
    catch (e) {
        console.error("Pay error:", e.message);
        response.status(400).send({
            error: {
                message: e.message,
            },
        });
    }
};
exports.payRequest = payRequest;
//# sourceMappingURL=index.js.map