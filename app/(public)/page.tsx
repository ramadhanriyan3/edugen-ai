import Image from "next/image";
import Link from "next/link";

// import { getOutput } from "@/actions/ai.action";
import FadeInWrapper from "@/components/fadeInWrapper";
import { Button } from "@/components/ui/button";

export default async function Home() {
  // const hasil = await getOutput(
  //   "buatkan saya 2 soal pilihan ganda seni budaya dengan taksonomi bloom c5"
  // );

  return (
    <div className="w-full flex flex-col gap-y-5 md:gap-y-10 justify-center items-center px-5">
      <FadeInWrapper variant="top">
        <div className="flex items-end self-center gap-x-2  w-fit mb-5 md:mb-10">
          <Image
            alt="logo"
            src={"/eduGen-Logo.png"}
            width={150}
            height={150}
            className="w-16 h-16 sm:w-24 sm:h-24 md:w-36 md:h-36"
          />
          <h1 className="font-bold text-primary text-center text-xl sm:text-3xl md:text-6xl ">
            Edugen AI
          </h1>
        </div>
      </FadeInWrapper>
      <div className="w-fit max-w-4xl flex items-center flex-col gap-x-2">
        <h1 className="text-center w-fit font-bold text-accent-foreground text-md md:text-2xl lg:text-4xl flex gap-x-1">
          Generate Exams in Minutes, Not Hours.
        </h1>
        <p className="text-xs font-light sm:text-sm md:text-md text-accent-foreground/40 text-center">
          AI-Powered Exam Generator for Smarter Education
        </p>
        <p className="pt-4 md:pt-6 font-semibold text-xs md:text-xl text-accent-foreground text-center">
          Create Customized, Bloom’s Taxonomy-Aligned Exams Instantly – Easy,
          Free, and Perfect for Teachers, Universities, and Training
          Institutions.
        </p>
      </div>
      <div className="w-fit flex gap-x-4">
        <Link href={"/log-in"}>
          <Button className="bg-primary text-primary-foreground text-[10px] md:text-sm">
            Generate Exams
          </Button>
        </Link>
        <Link href={"/donwload"}>
          <Button
            className="border-primary text-primary bg-transparent hover:text-primary text-[10px] md:text-sm"
            variant={"outline"}
          >
            Get Edugen App
          </Button>
        </Link>
      </div>
    </div>
  );
}
