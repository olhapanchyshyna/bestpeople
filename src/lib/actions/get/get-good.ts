"use server";

import prisma from '@/lib/db'

export const getGood = async (slug: string) => {
  const good = await prisma.goods.findUnique({
    where: {
      slug,
    },
  });

  return good;
};

