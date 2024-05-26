// "use client";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { CustomerDetailsForOrder } from "@/lib/validations";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// export default function RecipientForm() {
//   const form = useForm<z.infer<typeof CustomerDetailsForOrder>>({
//     resolver: zodResolver(CustomerDetailsForOrder),
//     defaultValues: {
//       name: "",
//       lastName: "",
//       phone: "",
//       email: "",
//       message: "",
//     },
//   });

//   function onSubmit(values: z.infer<typeof CustomerDetailsForOrder>) {
//     console.log(values);
//   }
//   return (
//     <Form {...form}>
      // <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
      //   <div className="flex flex-wrap justify-between">
      //     <FormField
      //       control={form.control}
      //       name="name"
      //       render={({ field }) => (
      //         <FormItem className="mb-[20px] mr-[10px] w-[250px]">
      //           <FormLabel>Name</FormLabel>
      //           <FormControl>
      //             <Input placeholder="Your name" {...field} />
      //           </FormControl>
      //           <FormMessage />
      //         </FormItem>
      //       )}
      //     />
      //     <FormField
      //       control={form.control}
      //       name="lastName"
      //       render={({ field }) => (
      //         <FormItem className="mb-[20px] mr-[10px] w-[250px]">
      //           <FormLabel>Last name</FormLabel>
      //           <FormControl>
      //             <Input placeholder="Your last name" {...field} />
      //           </FormControl>
      //           <FormMessage />
      //         </FormItem>
      //       )}
      //     />
      //     <FormField
      //       control={form.control}
      //       name="phone"
      //       render={({ field }) => (
      //         <FormItem className="mb-[20px] mr-[10px] w-[250px]">
      //           <FormLabel>Phone</FormLabel>
      //           <FormControl>
      //             <Input placeholder="Your phone" {...field} />
      //           </FormControl>
      //           <FormMessage />
      //         </FormItem>
      //       )}
      //     />
      //     <FormField
      //       control={form.control}
      //       name="email"
      //       render={({ field }) => (
      //         <FormItem className="mb-[20px] mr-[10px]  w-[250px]">
      //           <FormLabel>Email</FormLabel>
      //           <FormControl>
      //             <Input placeholder="Your email" {...field} />
      //           </FormControl>
      //           <FormMessage />
      //         </FormItem>
      //       )}
      //     />
      //   </div>

      //   <FormField
      //     control={form.control}
      //     name="message"
      //     render={({ field }) => (
      //       <FormItem className="mb-[20px] mr-[10px] ">
      //         <FormControl>
      //           <Textarea placeholder="Type your message here." {...field} />
      //         </FormControl>
      //         <FormMessage />
      //       </FormItem>
      //     )}
      //   />
      // </form>
//     </Form>
//   );
// }
