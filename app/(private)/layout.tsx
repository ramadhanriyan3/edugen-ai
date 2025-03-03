import { ReactNode } from "react";

import Sidebar from "@/components/sidebar";

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <div className="w-full flex flex-col min-h-screen justify-center items-center p-4">
        <div className="flex-1 w-[90%] max-w-[1440px] ms-16 md:m-0 bg-transparent items-start justify-start flex">
          {children}
        </div>
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
