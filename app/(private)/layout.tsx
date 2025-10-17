"use client";
import { ReactNode } from "react";
import { useParams } from "next/navigation";

import Sidebar from "@/components/sidebar";
import ReactQueryProvider from "@/provider/reac-query-provider";
import Navbar from "@/components/navbar";

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  const params = useParams<{ orgId: string; worksheetId: string }>();
  const { worksheetId } = params;

  return (
    <ReactQueryProvider>
      <main className="w-full">
        <div className="w-full h-screen flex">
          {!worksheetId && <Navbar />}
          {!worksheetId && <Sidebar />}
          {children}
        </div>
      </main>
    </ReactQueryProvider>
  );
};

export default PrivateLayout;
