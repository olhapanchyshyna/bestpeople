// route.ts
import { searchSettlements } from '@/lib/actions/novaPoshta'
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { cityName, limit, page } = req.body;
      const data = await searchSettlements(cityName, limit, page);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error searching settlements:", error);
      res.status(500).json({ error: "Failed to search settlements" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
