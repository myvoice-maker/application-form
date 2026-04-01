"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, FormEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    name: z.string().refine((val) => val.trim().length >= 4, {
      message: "value must be more than 3 letters",
    }),
    email: z.email({ message: "enter a valid email address" }),
    password: z
      .string()
      .min(5, { message: "password must be more than 5 letters" }),
    confirmPassword: z
      .string()
      .min(5, { message: "password must be more than 5 letters" }),
  })
  .refine((val) => val.password == val.confirmPassword, {
    message: "password must be the same with password",
    path: ["confirmPassword"],
  });

type formType = z.infer<typeof formSchema>;

const FormPlay = () => {
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = (values: formType) => {
    console.log("working");
    console.log(values);
  };

  return (
    <div>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mx-auto max-w-lg mt-8"
      >
        {/* name */}
        <div className="flex flex-col ">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            // {...form.register("name")}
            name="name"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              form.setValue("name", e.target.value, { shouldValidate: true });
            }}
            className="border-2 border-gray-400"
            id=""
          />
          <div className="h-6">
            {form.formState.errors.name && (
              <p className="text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
        </div>
        {/* email */}
        <div className="flex flex-col ">
          <label htmlFor="email">Email</label>
          <input
            type="Email"
            {...form.register("email")}
            className="border-2 border-gray-400"
            id=""
          />
          <div className="h-6">
            {form.formState.errors.email && (
              <p className="text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
        </div>
        {/* password */}
        <div className="flex flex-col ">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...form.register("password")}
            className="border-2 border-gray-400"
            id=""
          />

          <div className="h-6">
            {form.formState.errors.password && (
              <p className="text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
        </div>
        {/* confirm password */}
        <div className="flex flex-col ">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            {...form.register("confirmPassword")}
            className="border-2 border-gray-400"
            id=""
          />

          <div className="h-6">
            {form.formState.errors.confirmPassword && (
              <p className="text-red-500">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <button className="bg-red-500 py-2 px-4  rounded-lg ">submit</button>
        </div>
      </form>
    </div>
  );
};

export default FormPlay;
