// pages/api/send-to-telegram/route.ts
import prisma from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch"; // Импортируем fetch для отправки запросов

export const postHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { userId } = req.body;

  console.log()

  if (!userId) {
    return res.status(400).json({ message: "Bad Request: userId is required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Получаем заказы пользователя или любые другие данные, которые хотите отправить
    const orders = user.orders ? JSON.parse(user.orders) : [];

    // Отправляем данные в Telegram бот
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: `User ${user.name} has made an order:\n\n${JSON.stringify(orders, null, 2)}`,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to send message to Telegram");
    }

    res.status(200).json({ message: "Data sent to Telegram successfully" });
  } catch (error) {
    console.error("Failed to send data to Telegram:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return postHandler(req, res);
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handler;
