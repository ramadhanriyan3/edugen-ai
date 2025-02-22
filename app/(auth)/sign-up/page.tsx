"use client";

import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomFormField, {
  FormFieldType,
} from "@/components/form/customFormField";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Pasword must be at least 6 characters.",
  }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: "Pasword must be at least 6 characters.",
    })
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

const SignUpPage = () => {
  // const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
    <div className="flex-1 bg-transparent items-center justify-center flex">
      <div
        className="flex flex-col gap-y-4 w-full max-w-md min-w-72 min-h-72
     bg-white/70
      shadow-md drop-shadow-lg rounded-lg p-5 items-center mx-4"
      >
        <div className="flex items-end gap-x-2 w-fit">
          <Image
            alt="logo"
            src={"/eduGen-Logo.png"}
            width={50}
            height={50}
            className=" w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
          />
          <h1 className="font-bold leading-none text-base  sm:text-lg text-primary text-center">
            Edugen AI
          </h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-y-4"
          >
            {/* put form field */}
            <CustomFormField
              control={form.control}
              name="name"
              label="Full name"
              placeholder="John de"
              fieldType={FormFieldType.Input}
            />
            <CustomFormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="example@gmail.com"
              fieldType={FormFieldType.Input}
            />
            <CustomFormField
              fieldType={FormFieldType.Password}
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
            />

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground"
            >
              Sign Up
            </Button>
            <div className="flex items-center">
              <hr className="flex-grow border-t border-primary" />
              <span className="px-2 text-sm text-primary">OR</span>
              <hr className="flex-grow border-t border-primary" />
            </div>
            <Button
              variant="outline"
              className="w-full border-primary text-primary flex items-center"
            >
              <Image
                alt="google-icon"
                src={"/google-icon.svg"}
                width={20}
                height={20}
              />{" "}
              Sign in with Google
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;
