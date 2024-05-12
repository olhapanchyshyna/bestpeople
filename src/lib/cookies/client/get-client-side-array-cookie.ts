import { GoodCoookieType } from '@/types/types'
import CryptoJS from "crypto-js";


export function getClientSideArrayCookie(
  name: string,
):GoodCoookieType[] | undefined{

  if (typeof window === "undefined") return undefined;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    const cookiePart = parts.pop();

    if (!cookiePart) {
      return undefined; // Если после pop() получили undefined, возвращаем undefined
    }

    // const cookieValue = cookiePart.split(";").shift();
    // if (!cookieValue) {
    //   return undefined; // Если после shift() получили undefined, возвращаем undefined
    // }

    const secretKey = process.env.NEXT_PUBLIC_COOKIE_SECRET;
    if (!secretKey) {
      throw new Error("Secret key is not provided");
    }

    try {
      const decryptedBytes = CryptoJS.AES.decrypt(
        decodeURIComponent(cookiePart),
        secretKey,
      );
      const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error("Failed to decrypt or parse the cookie", error);
      return undefined;
    }
  }
  return undefined;
}