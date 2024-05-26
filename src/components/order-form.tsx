"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { getWarehouses, searchSettlements } from "@/lib/actions/novaPoshta";
import { cn } from "@/lib/utils";
import { CustomerDetailsForOrder } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Goods } from "@prisma/client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ByButton from "./by-button";

type ByButtonProps = {
  goods: Goods[];
};

export default function OrderForm({ goods }: ByButtonProps) {
  const [city, setCity] = useState("Київ");
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const form = useForm<z.infer<typeof CustomerDetailsForOrder>>({
    resolver: zodResolver(CustomerDetailsForOrder),
    defaultValues: {
      name: "",
      lastName: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof CustomerDetailsForOrder>) {
    console.log(values);
  }

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
    setError(null);
  };

  const handleSearch = async () => {
    setError(null);
    try {
      const settlementsData = await searchSettlements(city, "100", "1");
      console.log("Settlements data:", settlementsData);
      const addresses = settlementsData.data[0]?.Addresses;
      if (!addresses || addresses.length === 0) {
        setError("City not found");
        return;
      }
      const cityRef = addresses[0].Ref;
      const warehousesData = await getWarehouses(cityRef);
      console.log("Warehouses data:", warehousesData);
      const filteredWarehouses = warehousesData.data.filter(
        (warehouse: any) => !warehouse.Postomat,
      );

      setWarehouses(filteredWarehouses);
    } catch (error) {
      console.error("Error searching settlements:", error);
      setError("Помилка пошуку відділень");
    }
  };

  const warehouseLabel = (warehouse: any) =>
    `№${warehouse.Number} ул. ${warehouse.ShortAddress.replace(city, "")}`;

  return (
    <Form {...form}>
      <div>
        <h2 className="mb-[20px] text-[24px]">Delivery</h2>
        <div>
          <div className="mb-[30px]">
            <h2 className="mb-[7px]">City</h2>
            <div className="flex h-[60px] w-[400px] justify-between border-2 border-[#e6e6e6] px-[10px] focus-within:border-[#343a43b5]">
              <input
                type="text"
                value={city}
                onChange={handleCityChange}
                placeholder="Enter the name of the city"
                className="h-[100%] w-[300px] focus-visible:outline-none"
              />
              <button onClick={handleSearch}>
                <MagnifyingGlassIcon className="h-[25px] w-[25px]" />
              </button>
            </div>
          </div>

          {error && <p className="mt-2 text-sm text-[#DB4444]">{error}</p>}

          <h2 className="mb-[7px]">Nova Poshta Department</h2>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[350px] justify-between  border-2 border-[#e6e6e6]"
              >
                {value
                  ? warehouses.find(
                      (warehouse) => warehouseLabel(warehouse) === value,
                    )?.ShortAddress
                  : "Select department..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] border-[#e6e6e6]  p-0">
              <Command className="w-[350px] !border-2">
                <CommandList className="!border-2">
                  <CommandInput placeholder="Search warehouse..." />
                  {warehouses.length === 0 ? (
                    <CommandEmpty>Select city.</CommandEmpty>
                  ) : (
                    <CommandGroup>
                      {warehouses.map((warehouse) => (
                        <CommandItem
                          key={warehouse.Ref}
                          value={warehouseLabel(warehouse)}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue,
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === warehouseLabel(warehouse)
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {warehouseLabel(warehouse)}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="mt-[60px] w-[100%] max-w-[800px]">
        <h2 className="mb-[20px] text-[24px]">Recipient details</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-wrap justify-between">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-[20px] mr-[10px] w-[250px]">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="mb-[20px] mr-[10px] w-[250px]">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="mb-[20px] mr-[10px] w-[250px]">
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Your phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-[20px] mr-[10px]  w-[250px]">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="mb-[20px] mr-[10px] ">
              <FormControl>
                <Textarea placeholder="Type your message here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
      </div>
      <ByButton goods={goods} />
    </Form>
  );
}
