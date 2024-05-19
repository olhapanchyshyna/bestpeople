"use client";

// import { createCheckoutSession } from "@/lib/actions/set/create-checkout-session";

import { Goods } from "@prisma/client"

type ByButtonProps = {
  goods: Goods[];
};

export default function ByButton({ goods }: ByButtonProps) {

  const checkout = async () => {
		await fetch("http://localhost:3000/api/stripe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ products: goods }),
		})
			.then((response) => {
				return response.json();
			})
			.then((response) => {
				// console.log(response);
				if (response.url) {
					window.location.href = response.url;
					// console.log(response.url);
				}
			});
	};

  return (
    <button
      className="green-bg mt-[30px] w-[100%] px-[40px] py-[16px] text-white hover:bg-[#6e860b] hover:text-white"
      onClick={checkout}
    >
      Continue
    </button>
  );
}

