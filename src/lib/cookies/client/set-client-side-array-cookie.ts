import { GoodCoookieType } from '@/types/types'
import CryptoJS from "crypto-js";

export const setClientSideArrayCookie = (
  name: string,
  array: GoodCoookieType[],
  days: number,
) => {

  if (typeof window === "undefined") return undefined;

  const data = JSON.stringify(array);

  const secretKey = process.env.NEXT_PUBLIC_COOKIE_SECRET;
  if (!secretKey) throw new Error("Secret key is not provided");

  const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();

  const expires = new Date(Date.now() + days * 864e5).toUTCString();;

  document.cookie = `${name}=${encodeURIComponent(encryptedData)}; expires=${expires}; path=/`;
};