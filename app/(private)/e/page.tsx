import Image from "next/image";

import FadeInWrapper from "@/components/fadeInWrapper";
import ExamGenerateForm from "@/components/form/examGenerateForm";

const Page = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="flex flex-col gap-y-10 items-center py-4 ">
        <div className="w-full flex flex-col items-center justify-center">
          <FadeInWrapper variant="top">
            <Image
              alt="logo"
              src={"/eduGen-Logo.png"}
              width={150}
              height={150}
              className="w-16 h-16 "
            />
          </FadeInWrapper>
          <h2 className="text-primary text-center text-xl sm:text-2xl font-bold drop-shadow-md">
            Design the perfect test: What type of questions do you want to
            create?
          </h2>
        </div>
        <ExamGenerateForm />
      </div>
    </div>
  );
};

export default Page;
