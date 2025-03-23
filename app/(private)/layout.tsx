import { ReactNode } from "react";

import Sidebar from "@/components/sidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import SidebarItem from "@/components/sidebarItem";
import { getExams } from "@/actions/exam.action";
import ProfileModal from "@/components/profileModal";

const PrivateLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user) redirect("/sign-in");

  const examList = await getExams();

  return (
    <div className="w-full h-screen flex">
      <Sidebar
        userImg={session.user.image!}
        username={session.user.name!}
        userId={session.user.id!}
      >
        {examList.map((exam) => (
          <SidebarItem key={exam.id} examId={exam.id} label={exam.title} />
        ))}
      </Sidebar>
      <div className="w-full flex flex-col min-h-screen justify-center items-center p-4">
        <div className="flex-1 w-[90%] max-w-[1440px] ms-16 md:m-0 bg-transparent items-start justify-start flex">
          {children}
        </div>
        <ProfileModal userId={session.user.id!} />
        <footer className="pb-2 md:pb-4 flex items-end justify-center w-full">
          <p className="text-[10px] md:text-xs text-accent-foreground">
            &copy; 2025 Edugen AI. All right reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PrivateLayout;
