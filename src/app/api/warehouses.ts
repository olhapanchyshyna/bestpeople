// // pages/api/warehouses.js

// import { NextApiRequest, NextApiResponse } from 'next'
// import { getWarehouses } from '../../../novaPoshta'
// import { CityAndWarehouseType } from '@/types/types'


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { cityRef } = req.body;
//     try {
//       const data: { data: CityAndWarehouseType[] } = await getWarehouses(cityRef);
//       res.status(200).json(data);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch warehouses' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} not allowed`);
//   }
// }
