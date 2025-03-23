import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-5 min-h-screen gap-5">
      <div className="flex items-end gap-x-2 w-fit">
        <Image
          alt="logo"
          src={"/eduGen-Logo.png"}
          width={50}
          height={50}
          className=" w-10 h-10"
        />
        <h1 className="font-bold leading-none text-lg text-primary text-center">
          Edugen AI
        </h1>
      </div>
      <Image alt="not found " src={"/not-found.svg"} width={500} height={500} />
      <h1 className="text-accent-foreground text-xl sm:text-2xl md:text-3xl max-w-sm text-center font-semibold">
        Oops! Looks like you took a wrong turn in the syllabus.
      </h1>
      <Link href={"/"}>
        <Button className="text-xs sm:text-sm md:text-base">
          Back to the desk
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
