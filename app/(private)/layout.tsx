"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";

import Sidebar from "@/components/sidebar";
import SidebarItem from "@/components/sidebarItem";
import { useParams } from "next/navigation";

interface Organization {
  id: string;
  name: string;
  ownerId?: string | null;
  createdAt: string;
  updatedAt: string;
}

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  const [orgs, setOrgs] = useState<Organization[]>([]);

  const params = useParams<{ orgId: string; worksheetId: string }>();
  const { worksheetId } = params;

  useEffect(() => {
    const eventSource = new EventSource("/api/organization");

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Dari server:", data);
        setOrgs(data);
      } catch {
        console.log("Message:", event.data);
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE error:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <main className="w-full">
      <div className="w-full h-screen flex">
        {!worksheetId && (
          <div className="w-full bg-white to-primary drop-shadow-md py-2 px-4 absolute z-40 min-h-16 flex justify-between items-center">
            <div
              className={`flex items-end gap-x-1 transition-all pointer-events-none`}
            >
              <Image
                alt="logo"
                src={"/eduGen-Logo.png"}
                width={50}
                height={50}
                className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10`}
              />
              <h1
                className={`font-bold leading-none text-sm w-full sm:text-lg text-primary text-start whitespace-nowrap `}
              >
                Edugen AI
              </h1>
            </div>
          </div>
        )}
        {!worksheetId && (
          <Sidebar>
            {orgs.map((item) => (
              <SidebarItem key={item.id} orgId={item.id} label={item.name} />
            ))}
          </Sidebar>
        )}
        {children}
      </div>
    </main>
  );
};

export default PrivateLayout;
