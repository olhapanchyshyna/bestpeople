"use server";
import { type GoodCoookieType } from "@/types/types";
import CryptoJS from "crypto-js";
import { cookies } from "next/headers";

function isArrayOfGoodCookies(array: any[]): array is GoodCoookieType[] {
  return array.every((item) => {
    return (
      typeof item === "object" && // Проверяем, что элемент является объектом
      typeof item.id === "string" && // Проверяем тип свойства "id"
      typeof item.quantity === "number" // Проверяем тип свойства "quantity"
    );
  });
}

export const getServerSideArrayCookie = async (
  name: string,
): Promise<GoodCoookieType[] | undefined> => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);

  const encryptedValue = cookie?.value;
  if (!encryptedValue) {
    return undefined;
  }

  const secretKey = process.env.NEXT_PUBLIC_COOKIE_SECRET;
  if (!secretKey) {
    throw new Error("Secret key is not provided");
  }

  try {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
    const decryptedValue = decryptedBytes.toString(CryptoJS.enc.Utf8);
    const parsedValue = JSON.parse(decryptedValue);

    // Проверка, что результат действительно массив goodCoookie
    if (Array.isArray(parsedValue) && isArrayOfGoodCookies(parsedValue)) {
      return parsedValue;
    } else {
      console.error("Parsed value is not an array of GoodCoookieType objects");
      return undefined;
    }
    
  } catch (error) {
    console.error("Failed to decrypt the cookie or parse JSON", error);
    return undefined;
  }
};
