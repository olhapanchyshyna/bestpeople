import prisma from "@/lib/db"; // Убедитесь, что путь к вашему файлу Prisma правильный

export const updateOrdersAfterPayment = async (userId: string | undefined) => {
  if (!userId) {
    console.error("Invalid userId: userId is undefined");
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: +userId },
    });

    if (user && user.goodsBasket) {
      // Добавляем дату к заказу
      const newOrder = {
        date: new Date().toISOString(),
        items: JSON.parse(user.goodsBasket),
      };

      // Обновляем массив заказов
      const updatedOrders = user.orders ? JSON.parse(user.orders) : [];
      updatedOrders.push(newOrder);

      // Обновляем данные пользователя
      await prisma.user.update({
        where: { id: +userId },
        data: {
          orders: JSON.stringify(updatedOrders),
          goodsBasket: null,
        },
      });
    }
  } catch (error) {
    console.error("Failed to update orders after payment:", error);
  }
};
