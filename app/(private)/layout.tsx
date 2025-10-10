"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Bell, LogOut } from "lucide-react";

import Sidebar from "@/components/sidebar";
import SidebarItem from "@/components/sidebarItem";
import ReactQueryProvider from "@/provider/reac-query-provider";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Notification from "@/components/notification";
import { OrgInvitationType } from "@/lib/types";

interface Organization {
  id: string;
  name: string;
  ownerId?: string | null;
  createdAt: string;
  updatedAt: string;
}

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [notifList, setNotifList] = useState<OrgInvitationType[]>([]);
  const session = useSession();
  const router = useRouter();

  const params = useParams<{ orgId: string; worksheetId: string }>();
  const { worksheetId } = params;

  useEffect(() => {
    const eventSource = new EventSource("/api/organization");

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
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

  useEffect(() => {
    const eventSource = new EventSource("/api/invitation");

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setNotifList(data);
        console.log("ini jalan");
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

  const notifLabel = notifList.length > 9 ? "9+" : notifList.length;

  return (
    <ReactQueryProvider>
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
              <div className="w-fit flex items-center justify-items-end gap-x-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="w-fit rounded-full group hover:bg-primary/70 cursor-pointer transition-colors aspect-square p-1 relative">
                      {!!notifList.length && (
                        <div className="aspect-square w-4 rounded-full bg-destructive text-[10px] absolute -top-[4px] -right-[3px] text-white items-center justify-center flex ">
                          {notifLabel}
                        </div>
                      )}
                      <Bell className="text-primary group-hover:text-white w-6 h-6 font-semibold" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-fit p-0"
                    side="top"
                    sideOffset={24}
                  >
                    <Notification notifications={notifList} />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className=" rounded-lg hover:bg-transparent py-1 px-2  flex gap-x-2 items-center  border-primary"
                    >
                      <Image
                        src={session.data?.user?.image || "/user.png"}
                        alt="userImage"
                        width={30}
                        height={30}
                        className="aspect-square w-6 rounded-full flex items-center justify-center"
                      />
                      <p className="overflow-hidden text-sm text-nowrap w-full text-primary">
                        {session.data?.user?.name?.split(" ")[0]}
                      </p>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-fit">
                    <Button
                      onClick={() => {
                        signOut();
                        router.push("/");
                      }}
                      className="flex items-center text-primary hover:text-white"
                      variant={"ghost"}
                    >
                      Logout <LogOut className="w-4 h-4" />
                    </Button>
                  </PopoverContent>
                </Popover>
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
    </ReactQueryProvider>
  );
};

export default PrivateLayout;
