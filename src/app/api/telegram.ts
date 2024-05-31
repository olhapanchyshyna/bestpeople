import { getLatestOrderByUserId } from "@/lib/actions/get/get-orders-by-user-id";
import prisma from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";

const baseUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

export const sendToTelegram = async (userId: string) => {
  try {
    const latestOrder = await getLatestOrderByUserId(userId);

    if (!latestOrder) {
      throw new Error("No orders found for this user.");
    }

    console.log("latestOrder", latestOrder);

    if (latestOrder.isNotified) {
      console.log("Order already notified");
      return;
    }

    const orderText = `
      Order Details:
      Name: ${latestOrder.orderDetails.name}
      Last Name: ${latestOrder.orderDetails.lastName}
      Phone: ${latestOrder.orderDetails.phone}
      Email: ${latestOrder.orderDetails.email}
      City: ${latestOrder.orderDetails.city}
      Department: ${latestOrder.orderDetails.department}
      Message: ${latestOrder.orderDetails.message || "No message"}
      Items: ${latestOrder.items.map((item) => `\n  - Item ID: ${item.id}, Quantity: ${item.quantity}`).join("")}
    `;

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: orderText,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message to Telegram");
    }

    const user = await prisma.user.findUnique({
      where: { id: +userId },
    });

    if (user) {
      const orders = user.orders ? JSON.parse(user.orders) : [];
      const updatedOrders = orders.map((order: any) => {
        if (order.date === latestOrder.date) {
          return { ...order, isNotified: true };
        }
        return order;
      });

      await prisma.user.update({
        where: { id: +userId },
        data: { orders: JSON.stringify(updatedOrders) },
      });
    }

    console.log("Message sent to Telegram successfully");
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("Failed to get latest order:", errorMessage);
  }
};
