import prisma from "@/lib/db";
import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch'; // Импортируем fetch для отправки запросов

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ message: "Bad Request: userId is required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Получаем заказы пользователя или любые другие данные, которые хотите отправить
    const orders = user.orders ? JSON.parse(user.orders) : [];

    // Отправляем данные в Telegram бот
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: `User ${user.name} has made an order:\n\n${JSON.stringify(orders, null, 2)}`,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to send message to Telegram');
    }

    return NextResponse.json({ message: "Data sent to Telegram successfully" });
  } catch (error) {
    console.error("Failed to send data to Telegram:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
