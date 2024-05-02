import ButtonCustom from '@/components/button'
import Count from '@/components/count'
import H2 from "@/components/h2";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CrossCircledIcon } from '@radix-ui/react-icons'
import Image from "next/image";

const invoices = [
  {
    product: "Protein cocktail with pistachio flavor",
    price: "46$",
    totalPrise: "$250.00",
		src: '/coktail-banana.png'
  },
  {
    product: "Protein cocktail with pistachio flavor",
    price: "46$",
    totalPrise: "$250.00",
		src: '/coktail-banana.png'
  },
  {
    product: "Protein cocktail with pistachio flavor",
    price: "46$",
    totalPrise: "$250.00",
		src: '/coktail-banana.png'
  },
];

export default function page() {
  return (
    <section className="container mb-[85px] mt-[44px]">
      <H2 text="Basket" className="mb-[40px]" />
      <div className="flex justify-between">
        <div className="rounded-[8px] border-2 border-[#E6E6E6]">
          <Table className="w-[750px]">
            <TableHeader>
              <TableRow className="text-[#808080]">
                <TableHead className="w-[320px]">Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead >Total Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.product}>
                  <TableCell className="flex p-[20px]">
                    <Image
                      src={invoice.src}
                      width={50}
                      height={50}
                      alt="inv001"
											className='mr-[30px]'
                    />
                    <div className='text-[#1A1A1A] max-w-[150px]'> {invoice.product}</div>
                  </TableCell>
                  <TableCell className="dark-green">{invoice.price}</TableCell>
                  <TableCell><Count /></TableCell>
                  <TableCell className="dark-green">{invoice.totalPrise}</TableCell>
                  <TableCell className='text-right p-0 pr-[5px]'>
										<CrossCircledIcon className='cursor-pointer h-[20px] w-[20px]' style={{color: '#374151'}}/>
									</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/*------- 2---- */}
        <div className="rounded-[8px] border-2 border-[#E6E6E6] px-[16px] py-[24px] h-[300px]">
          <h2 className="mb-[10px] text-[20px]">To pay</h2>
          <Table className="w-[200px]">
            <TableFooter>
              <TableRow className="border-b text-[#808080]">
                <TableCell className="rounded-[8px] py-3  px-0" colSpan={3}>
                  Price
                </TableCell>
                <TableCell className="dark-green  py-3 px-0 text-right">
                  46$
                </TableCell>
              </TableRow>
              <TableRow className="text-[#808080]">
                <TableCell className="py-3 px-0" colSpan={3}>
                  Delivery
                </TableCell>
                <TableCell className="py-3 px-0 text-right  text-black">
                  Free
                </TableCell>
              </TableRow>
              <TableRow className="text-[#808080]">
                <TableCell className="py-3 px-0" colSpan={3}>
                  Total
                </TableCell>
                <TableCell className="py-3 dark-green px-0 text-right">
                  $2,500.00
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
					<ButtonCustom text='Continue' href='/' className='w-[100%] mt-[30px]'/>
        </div>
      </div>
    </section>
  );
}
