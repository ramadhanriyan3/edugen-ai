import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuInstagram, LuFacebook, LuTwitter, LuMail } from "react-icons/lu";
import { auth } from "@/auth";

const PublicLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <div className="w-full mx-auto flex flex-col items-center min-h-screen p-4  bg-gradient-to-br from-primary to-white">
      <nav className="flex justify-between items-center w-full max-w-[1440px]">
        <Link href={"/"}>
          <div className="flex items-end gap-x-2 w-fit cursor-pointer">
            <Image
              alt="logo"
              src={"/eduGen-white.png"}
              width={50}
              height={50}
              className=" w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
            />
            <h1 className="font-bold leading-none text-base  sm:text-lg text-white text-center">
              Edugen AI
            </h1>
          </div>
        </Link>
        <div className="w-fit flex gap-x-2 md:gap-x-4 items-center font-light text-xs sm:text-sm md:text-base ">
          <Link href={"/news"} className="text-accent-foreground">
            News
          </Link>
          <Link href={"/suport"} className="text-accent-foreground">
            Support
          </Link>
          {!session && (
            <Link
              href={"/sign-in"}
              className=" font-semibold border border-primary text-primary py-1 px-2 rounded-sm"
            >
              Sign in
            </Link>
          )}
        </div>
      </nav>
      <div className="flex-1 bg-transparent items-center justify-center flex w-full">
        {children}
      </div>
      <footer className="py-5 md:pb-8 flex gap-y-5 justify-between flex-wrap-reverse w-full  max-w-[1440px]">
        <div className="flex w-fit flex-col gap-y-4 mx-auto sm:mx-0">
          <div className="flex items-end gap-x-2 w-fit">
            <Image
              alt="logo"
              src={"/eduGen-Logo.png"}
              width={50}
              height={50}
              className=" w-5 h-5 md:w-10 md:h-10"
            />
            <h1 className="font-bold leading-none text-sm font- md:text-medium text-primary text-center">
              Edugen AI
            </h1>
          </div>
          <div className="flex space-x-2 ">
            <Link href={"#"}>
              <LuMail className="w-3 h-3 md:w-5 md:h-5 text-primary" />
            </Link>
            <Link href={"#"}>
              <LuFacebook className="w-3 h-3 md:w-5 md:h-5 text-primary" />
            </Link>
            <Link href={"#"}>
              <LuInstagram className="w-3 h-3 md:w-5 md:h-5 text-primary" />
            </Link>
            <Link href={"#"}>
              <LuTwitter className="w-3 h-3 md:w-5 md:h-5 text-primary" />
            </Link>
          </div>
          <p className="text-[10px] md:text-xs text-accent-foreground">
            &copy; 2025 Edugen AI. All right reserved.
          </p>
        </div>
        <div className="flex mx-auto sm:mx-0 w-fit gap-x-4 lg:gap-8 text-accent-foreground/90">
          <div className="flex-col flex gap-x-2 text-[10px] md:text-sm">
            <p className="font-semibold">Support</p>
            <Link href={"#"}>Community</Link>
            <Link href={"#"}>Issues Report</Link>
          </div>
          <div className="flex-col flex gap-x-2 text-[10px] md:text-sm">
            <p className="font-semibold">Legal & Safety</p>
            <Link href={"#"}>Privacy Policy</Link>
            <Link href={"#"}>Term of Use</Link>
            <Link href={"#"}>Report Vulnerabilities</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
