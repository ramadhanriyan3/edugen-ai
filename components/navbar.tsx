import { signOut } from "next-auth/react";
import { Bell, LogOut } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Notification from "@/components/notification";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { OrgInvitationType } from "@/lib/types";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [notifList, setNotifList] = useState<OrgInvitationType[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const eventSource = new EventSource("/api/invitation");

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setNotifList(data);
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
          <PopoverContent className="w-fit p-0" side="top" sideOffset={24}>
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
                src={session?.user?.image || "/user.png"}
                alt="userImage"
                width={30}
                height={30}
                className="aspect-square w-6 rounded-full flex items-center justify-center"
              />
              <p className="overflow-hidden text-sm text-nowrap w-full text-primary">
                {session?.user?.name?.split(" ")[0]}
              </p>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <Button
              onClick={() => {
                router.push("/");
                signOut();
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
  );
};

export default Navbar;
