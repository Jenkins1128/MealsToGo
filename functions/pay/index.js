module.exports.payRequest = async (request, response, stripeClient) => {
  const {amount} = request.body;
  try {
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });
    // Send publishable key and PaymentIntent details to client
    response.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return response.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
};
