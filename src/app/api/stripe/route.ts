import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getActiveProducts = async () => {
  const checkProducts = await stripe.products.list();
  const availableProducts = checkProducts.data.filter(
    (product: any) => product.active === true,
  );
  return availableProducts;
};

export const POST = async (request: any) => {
  const { products } = await request.json();
  const data = products;
  let activeProducts = await getActiveProducts();
  console.log('activeProducts', activeProducts);
  try {
    for (const product of data) {
      const stripeProduct = activeProducts?.find((stripeProduct: any) => {
        return stripeProduct?.name?.toLowerCase() == product?.title?.toLowerCase();
      });

      if (stripeProduct == undefined) {
        const prod = await stripe.products.create({
          name: product.title,
          type: 'good', // Указываем тип товара
        });
        activeProducts.push(prod);
      }
    }
  } catch (error) {
    console.error("Error in creating a new product", error);
    throw error;
  }

  let stripeItems: any = [];

  for (const product of data) {
    const stripeProduct = activeProducts?.find((stripeProduct: any) => {
      return stripeProduct?.name?.toLowerCase() == product?.title?.toLowerCase();
    });

    if (stripeProduct) {
      const price = await stripe.prices.create({
        currency: 'usd',
        unit_amount: product.price * 100,
        product_data: {
          name: stripeProduct.name,
        },
      });

      stripeItems.push({
        price: price.id,
        quantity: product?.quantity || 1,
      });
    }
  }

  const session = await stripe.checkout.sessions.create({
    line_items: stripeItems,
    mode: "payment",
    success_url: "https://bestpeople-ten.vercel.app/success?success=true",
    cancel_url: "https://bestpeople-ten.vercel.app/cancel?cancelled=true",
  });

  return NextResponse.json({ url: session.url });
};
