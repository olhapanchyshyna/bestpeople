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
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ByButton from "./by-button";

type ByButtonProps = {
  goods: Goods[];
  formData?: any;
  setEmptyFields?: (fields: string[]) => void;
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
        (department: any) => !department.Postomat,
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
  const [isFieldFilled, setIsFieldFilled] = useState(false);
  const [isFieldActive, setIsFieldActive] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFieldFilled(event.target.value.trim() !== "");
  };

  const handleFocus = () => {
    setIsFieldActive(true);
  };

  const handleBlur = () => {
    setIsFieldActive(false);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`mb-[20px] mr-[10px] w-[250px] `}>
          <FormLabel>{label}</FormLabel>
          <FormControl
            className={`${isEmpty && !isFieldFilled && !isFieldActive ? "bg-red-200 " : ""}`}
          >
            <Input
              placeholder={placeholder}
              {...field}
              type={type}
              onChange={(e) => {
                field.onChange(e);
                handleInputChange(e);
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const customerDetailsSchema = CustomerDetailsForOrder.extend({
  city: z.string().nonempty("City is required"),
  department: z.string().nonempty("Department is required"),
});

export default function OrderForm({ goods }: ByButtonProps) {
  const { city, department, error, handleCityChange, handleSearch } =
    useCitySearch("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [emptyFields, setEmptyFields] = useState<string[]>([]);
  const [emptyCity, setEmptyCity] = useState(true);

  const form = useForm<z.infer<typeof customerDetailsSchema>>({
    resolver: zodResolver(customerDetailsSchema),
    defaultValues: {
      name: "",
      lastName: "",
      phone: "",
      email: "",
      message: "",
      city: "",
      department: "",
    },
  });

  const onSubmit = (values: z.infer<typeof customerDetailsSchema>) => {
    const requiredFields = [
      "name",
      "lastName",
      "phone",
      "email",
      "city",
      "department",
    ];
    const emptyFields = requiredFields.filter(
      (field) => !values[field as keyof typeof values],
    );

    if (emptyFields.length > 0) {
      setEmptyFields(emptyFields);
      return;
    }
  };

  const departmentLabel = (department: any) =>
    `№${department.Number} ул. ${department.ShortAddress.replace(city, "")}`;

  return (
    <Form {...form}>
      <div>
        <h2 className="mb-[20px] text-[24px]">Delivery</h2>
        <div>
          <div className=" h-[140px]">
            <h2 className="mb-[7px]">City *</h2>
            <div
              className={`flex h-[60px] justify-between border-2 px-[10px] md:w-[400px] ${emptyFields.includes("city") && emptyCity ? "border-red-200" : "border-[#e6e6e6]"} focus-within:border-[#343a43b5]`}
            >
              <input
                type="text"
                value={city}
                onChange={(e) => {
                  handleCityChange(e);
                  setEmptyCity(e.target.value.trim() === "");
                }}
                placeholder="Enter the name of the city"
                className="h-[100%] focus-visible:outline-none md:w-[300px]"
              />
              <button onClick={handleSearch}>
                <MagnifyingGlassIcon className="h-[25px] w-[25px]" />
              </button>
            </div>
            {error && <p className="mt-2 text-sm text-[#DB4444]">{error}</p>}
          </div>

          <h2 className="mb-[7px]">Nova Poshta Department *</h2>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={`w-[250px] justify-between md:w-[350px] ${emptyFields.includes("department") && emptyCity ? "bg-red-200" : "border-2 border-[#e6e6e6]"}`}
              >
                {value
                  ? department.find(
                      (department) => departmentLabel(department) === value,
                    )?.ShortAddress
                  : "Select department..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] border-[#e6e6e6] p-0  md:w-[350px]">
              <Command className="w-[280px] !border-2 md:w-[350px]">
                <CommandList className="!border-2">
                  <CommandInput placeholder="Search department..." />
                  {department.length === 0 ? (
                    <CommandEmpty>Select city.</CommandEmpty>
                  ) : (
                    <CommandGroup>
                      {department.map((department) => (
                        <CommandItem
                          key={department.Ref}
                          value={departmentLabel(department)}
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
                              value === departmentLabel(department)
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {departmentLabel(department)}
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
              label="Name *"
              placeholder="Your name"
              emptyFields={emptyFields}
            />
            <FormFieldComponent
              control={form.control}
              name="lastName"
              label="Last name *"
              placeholder="Your last name"
              emptyFields={emptyFields}
            />
            <FormFieldComponent
              control={form.control}
              name="phone"
              label="Phone *"
              placeholder="Your phone"
              emptyFields={emptyFields}
            />
            <FormFieldComponent
              control={form.control}
              name="email"
              label="Email *"
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
