"use client";

import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomFormField, {
  FormFieldType,
} from "@/components/form/customFormField";
import { signIn } from "@/actions/signIn.action";
import FadeInWrapper from "@/components/fadeInWrapper";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email(),
});

const SignInPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) =>
      formData.append(key, value)
    );
    await signIn("nodemailer", formData, "/e");
  };

  return (
    <div className="flex-1 bg-transparent items-center justify-center flex flex-col gap-10">
      <FadeInWrapper variant="top">
        <h1 className="text-2xl font-bold text-primary text-center max-w-[400px] drop-shadow-sm shadow-white">
          Empower Your Teaching Journey with Edugen AI
        </h1>
      </FadeInWrapper>
      <div
        className="flex flex-col gap-y-4 max-w-md w-10/12 min-h-72
     bg-white/70
      shadow-md drop-shadow-lg rounded-lg p-5 items-center mx-4"
      >
        <Link href={"/"} className="flex items-end gap-x-2 w-fit">
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
        </Link>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-y-4"
          >
            <CustomFormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="example@gmail.com"
              fieldType={FormFieldType.Input}
            />

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground"
            >
              Sign In
            </Button>
          </form>
        </Form>
        <div className="flex items-center w-full">
          <hr className="flex-grow border-t border-primary" />
          <span className="px-2 text-sm text-primary">OR</span>
          <hr className="flex-grow border-t border-primary" />
        </div>
        <Button
          variant="outline"
          onClick={async () => {
            await signIn("google", undefined, "/e");
          }}
          className="w-full border-primary text-primary flex items-center hover:text-primary-foreground"
        >
          <Image
            alt="google-icon"
            src={"/google-icon.svg"}
            width={20}
            height={20}
          />{" "}
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default SignInPage;
