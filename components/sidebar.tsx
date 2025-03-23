"use client";

import {
  TbLayoutSidebarLeftExpand,
  TbLayoutSidebarLeftCollapse,
} from "react-icons/tb";
import { ReactNode, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { signOut } from "next-auth/react";

interface SidebarProps {
  children: ReactNode;
  userImg: string;
  username: string;
  userId: string;
}

const Sidebar = ({ children, userImg, username }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <div className={`flex-1 max-h-screen w-fit flex flex-col`}>
      <div
        className={`inset-0 w-full h-screen absolute bg-black/30 z-30 ${
          !isOpen && "hidden"
        } sm:hidden`}
      />
      <div
        className={`absolute z-50 md:static  transition-all ease-in-out duration-300 ${
          isOpen ? "w-1/2 sm:w-[220px] md:w-[380px]" : "w-16 sm:w-20"
        }  h-full bg-white px-4 py-4`}
      >
        <div className="flex  flex-col justify-between h-full gap-y-4">
          <div className={`flex items-center ${isOpen && "justify-between"}`}>
            <div
              className={`flex items-end gap-x-1 transition-all pointer-events-none  ${
                !isOpen ? "w-0 opacity-0" : "w-full opacity-100"
              } `}
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
            {isOpen ? (
              <TbLayoutSidebarLeftCollapse
                className="w-6 h-6 sm:w-10 sm:h-10 text-primary cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            ) : (
              <TbLayoutSidebarLeftExpand
                className="w-6 h-6 sm:w-10 sm:h-10 text-primary  cursor-pointer"
                onClick={() => setIsOpen(true)}
              />
            )}
          </div>
          <hr className="w-full" />
          <div
            className={` ${
              !isOpen ? "w-0 opacity-0" : "w-full opacity-100"
            }  h-full pt-10 flex flex-col overflow-y-auto overflow-x-hidden`}
          >
            {children}
          </div>
          <div className={`w-full flex flex-col gap-y-4`}>
            <Link href={"/e"} className="self-center">
              <Button
                size={"sm"}
                className="bg-primary gap-0 text-primary-foreground w-fit rounded-full justify-start"
              >
                <Plus className=" w-4 h-4" />
                {
                  <p
                    className={` transition-all delay-75 ${
                      !isOpen ? "opacity-0 w-0 pl-0" : "pl-2 w-20 opacity-100"
                    } `}
                  >
                    New exams
                  </p>
                }
              </Button>
            </Link>
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger
                asChild
                onClick={(prev) => {
                  setPopoverOpen(!prev);
                }}
              >
                <div className="cursor-pointer h-fit p-1 flex items-center space-x-2 hover:bg-primary/20 rounded-full ">
                  <Image
                    alt="profile"
                    src={userImg ? `${userImg}` : "/user.png"}
                    width={36}
                    height={36}
                    className="rounded-full border-1 "
                  />
                  <p
                    className={`text-xs sm:text-sm whitespace-nowrap  transition-all ${
                      !isOpen ? "opacity-0 w-0" : "opacity-100 w-full"
                    } `}
                  >
                    {username}
                  </p>
                </div>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className=" mb-2 rounded-sm w-fit bg-primary text-primary-foreground"
              >
                <div className="flex flex-col p-2">
                  <div
                    onClick={() => (window.location.hash = "#profile")}
                    className="w-full p-2 flex items-center hover:bg-white/30 rounded-full transition-all cursor-pointer"
                  >
                    <User className="w-4 h-4 mr-2" /> Profie
                  </div>
                  <p
                    onClick={() => signOut()}
                    className="w-full p-2 flex items-center hover:bg-white/30 rounded-full transition-all cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Log out
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
