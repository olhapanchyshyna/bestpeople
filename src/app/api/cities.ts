// // pages/api/cities.js

// import { NextApiRequest, NextApiResponse } from 'next'
// import { getCities } from "../../../novaPoshta";
// import { CityAndWarehouseType } from '@/types/types'

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       const data: { data: CityAndWarehouseType[] } = await getCities();
//       res.status(200).json(data);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch cities' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} not allowed`);
//   }
// }
