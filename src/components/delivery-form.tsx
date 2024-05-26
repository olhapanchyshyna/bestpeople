// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { getWarehouses, searchSettlements } from "@/lib/actions/novaPoshta";
// import { cn } from "@/lib/utils";
// import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
// import { Check, ChevronsUpDown } from "lucide-react";
// import { useState } from "react";

// export default function DeliveryForm() {
//   const [city, setCity] = useState("Київ");
//   const [warehouses, setWarehouses] = useState<any[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState("");

//   const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setCity(event.target.value);
//     setError(null);
//   };

//   const handleSearch = async () => {
//     setError(null);
//     try {
//       const settlementsData = await searchSettlements(city, "100", "1");
//       console.log("Settlements data:", settlementsData);
//       const addresses = settlementsData.data[0]?.Addresses;
//       if (!addresses || addresses.length === 0) {
//         setError("City not found");
//         return;
//       }
//       const cityRef = addresses[0].Ref;
//       const warehousesData = await getWarehouses(cityRef);
//       console.log("Warehouses data:", warehousesData);
//       const filteredWarehouses = warehousesData.data.filter(
//         (warehouse: any) => !warehouse.Postomat,
//       );

//       setWarehouses(filteredWarehouses);
//     } catch (error) {
//       console.error("Error searching settlements:", error);
//       setError("Помилка пошуку відділень");
//     }
//   };

//   const warehouseLabel = (warehouse: any) =>
//     `№${warehouse.Number} ул. ${warehouse.ShortAddress.replace(city, "")}`;

//   return (
//     <div>
//       <div className="mb-[30px]">
//         <h2 className="mb-[7px]">City</h2>
//         <div className="flex h-[60px] w-[400px] justify-between border-2 border-[#e6e6e6] px-[10px] focus-within:border-[#343a43b5]">
//           <input
//             type="text"
//             value={city}
//             onChange={handleCityChange}
//             placeholder="Enter the name of the city"
//             className="h-[100%] w-[300px] focus-visible:outline-none"
//           />
//           <button onClick={handleSearch}>
//             <MagnifyingGlassIcon className="h-[25px] w-[25px]" />
//           </button>
//         </div>
//       </div>

//       {error && <p className="mt-2 text-sm text-[#DB4444]">{error}</p>}

//       <h2 className="mb-[7px]">Nova Poshta Department</h2>
//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             role="combobox"
//             aria-expanded={open}
//             className="w-[350px] justify-between  border-2 border-[#e6e6e6]"
//           >
//             {value
//               ? warehouses.find(
//                   (warehouse) => warehouseLabel(warehouse) === value,
//                 )?.ShortAddress
//               : "Select department..."}
//             <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-[350px] border-[#e6e6e6]  p-0">
//           <Command className="w-[350px] !border-2">
//             <CommandList className="!border-2">
//               <CommandInput placeholder="Search warehouse..." />
//               {warehouses.length === 0 ? (
//                 <CommandEmpty>Select city.</CommandEmpty>
//               ) : (
//                 <CommandGroup>
//                   {warehouses.map((warehouse) => (
//                     <CommandItem
//                       key={warehouse.Ref}
//                       value={warehouseLabel(warehouse)}
//                       onSelect={(currentValue) => {
//                         setValue(currentValue === value ? "" : currentValue);
//                         setOpen(false);
//                       }}
//                     >
//                       <Check
//                         className={cn(
//                           "mr-2 h-4 w-4",
//                           value === warehouseLabel(warehouse)
//                             ? "opacity-100"
//                             : "opacity-0",
//                         )}
//                       />
//                       {warehouseLabel(warehouse)}
//                     </CommandItem>
//                   ))}
//                 </CommandGroup>
//               )}
//             </CommandList>
//           </Command>
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }
