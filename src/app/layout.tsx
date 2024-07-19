import Footer from "@/components/footer";
import Header from "@/components/header";
import SessionProvider from "@/components/session-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Roboto } from "next/font/google";
import { authOptions } from "./api/auth/[...nextauth]/route";
import "./globals.css";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Best & People",
  description: "Smart products for your health",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={cn(roboto.className, "m-auto")}>
        <SessionProvider session={session}>
          <Header />
          <main>{children}</main>
        </SessionProvider>
        <Footer />
      </body>
    </html>
  );
}
