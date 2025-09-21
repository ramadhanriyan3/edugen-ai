import Image from "next/image";
import { auth } from "@/auth";

import FadeInWrapper from "@/components/fadeInWrapper";
// import ExamGenerateForm from "@/components/form/examGenerateForm";

const Page = async () => {
  const session = await auth();

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="flex flex-col gap-y-10 items-center py-4 ">
        <div className="w-full flex flex-col items-center justify-center">
          <FadeInWrapper variant="top">
            <div className="flex items-end justify-center gap-x-4">
              <Image
                alt="logo"
                src={"/eduGen-Logo.png"}
                width={200}
                height={200}
                priority
                className="w-20 h-20 self-center"
              />
              <p className="text-start text-2xl leading-none font-bold text-primary">
                Welcome <br /> to Edugen AI
              </p>
            </div>
          </FadeInWrapper>
        </div>
        <div className="w-full bg-primary/80 rounded-lg shadow-lg p-4 mx-2 flex items-center justify-center flex-col gap-y-2">
          <p className="font-semibold text-xl text-primary-foreground ">
            {" "}
            Hi, {session?.user?.name} ! 👋
          </p>
          <p className=" font-semibold text-primary-foreground text-center">
            Create exams faster than ever! Pick an organization from the sidebar
            to begin.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
