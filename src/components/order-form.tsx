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
import { getDepartment, searchSettlements } from "@/lib/actions/novaPoshta";
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

const useCitySearch = (initialCity: string) => {
  const [city, setCity] = useState(initialCity);
  const [department, setDepartment] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
    setError(null);
  };

  const handleSearch = async () => {
    setError(null);
    try {
      const settlementsData = await searchSettlements(city, "100", "1");
      const addresses = settlementsData.data[0]?.Addresses;
      if (!addresses || addresses.length === 0) {
        setError("City not found");
        return;
      }
      const cityRef = addresses[0].Ref;
      const departmentData = await getDepartment(cityRef);
      const filtereddepartment = departmentData.data.filter(
        (warehouse: any) => !warehouse.Postomat,
      );
      setDepartment(filtereddepartment);
    } catch (error) {
      setError("Помилка пошуку відділень");
    }
  };

  return { city, department, error, handleCityChange, handleSearch };
};

type FormFieldComponentProps = {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
};

const FormFieldComponent = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  emptyFields,
}: FormFieldComponentProps & { emptyFields: string[] }) => {
  const isEmpty = emptyFields && emptyFields.includes(name);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`mb-[20px] mr-[10px] w-[250px] `}>
          <FormLabel>{label}</FormLabel>
          <FormControl className={`${isEmpty ? "bg-red-200 " : ""}`}>
            <Input placeholder={placeholder} {...field} type={type} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default function OrderForm({ goods }: ByButtonProps) {
  const { city, department, error, handleCityChange, handleSearch } =
    useCitySearch("Київ");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

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

  const departmentLabel = (department: any) =>
    `№${department.Number} ул. ${department.ShortAddress.replace(city, "")}`;

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
                  ? department.find(
                      (warehouse) => departmentLabel(warehouse) === value,
                    )?.ShortAddress
                  : "Select department..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] border-[#e6e6e6]  p-0">
              <Command className="w-[350px] !border-2">
                <CommandList className="!border-2">
                  <CommandInput placeholder="Search warehouse..." />
                  {department.length === 0 ? (
                    <CommandEmpty>Select city.</CommandEmpty>
                  ) : (
                    <CommandGroup>
                      {department.map((warehouse) => (
                        <CommandItem
                          key={warehouse.Ref}
                          value={departmentLabel(warehouse)}
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
                              value === departmentLabel(warehouse)
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {departmentLabel(warehouse)}
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
            <FormFieldComponent
              control={form.control}
              name="name"
              label="Name"
              placeholder="Your name"
              emptyFields={emptyFields}
            />
            <FormFieldComponent
              control={form.control}
              name="lastName"
              label="Last name"
              placeholder="Your last name"
              emptyFields={emptyFields}
            />
            <FormFieldComponent
              control={form.control}
              name="phone"
              label="Phone"
              placeholder="Your phone"
              emptyFields={emptyFields}
            />
            <FormFieldComponent
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email"
              emptyFields={emptyFields}
            />
          </div>
          <FormFieldComponent
            control={form.control}
            name="message"
            label="Message"
            placeholder="Type your message here."
            type="textarea"
            emptyFields={emptyFields}
          />
        </form>
      </div>

      <ByButton
        goods={goods}
        formData={{ ...form.watch(), city, department: value }}
        setEmptyFields={setEmptyFields}
      />
    </Form>
  );
}
