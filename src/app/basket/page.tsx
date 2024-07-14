import BasketPage from "@/components/basket-page";
import { auth } from '@/lib/auth'

export default async function Page() {
  const session = await auth()

  return <BasketPage session={session}/>;
 
}
