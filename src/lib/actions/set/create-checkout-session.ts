// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// export async function createCheckoutSession() {
//   console.log("createCheckoutSession");

//   const checkoutSession = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price: process.env.STRIPE_PRISE,
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: `${process.env.CANONICAL_URL}/payment?success=true`,
//     cancel_url: `${process.env.CANONICAL_URL}/payment?canceled=true`,
//   });

//   return { redirectUrl: checkoutSession.url }; // Возвращаем объект с URL для перенаправления
// }
