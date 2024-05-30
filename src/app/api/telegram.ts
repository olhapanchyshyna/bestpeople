const baseUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

export const sendToTelegram = async (userId: string) => {
  const url = `${baseUrl}/sendMessage`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: `User with ID ${userId} has made a purchase.`, // Пример текста, можно изменить
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to send message to Telegram. Status: ${response.status}`);
  }

  const responseData = await response.json();
};
