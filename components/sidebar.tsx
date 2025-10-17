"use client";

import { useState, useEffect } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { NewOrgModal } from "./newOrgModal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SidebarItem from "./sidebarItem";
import { Organization } from "@prisma/client";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [orgs, setOrgs] = useState<Organization[]>([]);

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

  const handleCreate = (name: string) => {
    axios
      .post(`/api/organization`, {
        name: name,
      })
      .then((res) => {
        const id = res.data.id;
        toast.success("Organization created");
        router.push(`/${id}/worksheets`);
      })
      .catch((err) => {
        const errorMassege = err.response?.data;
        toast.error(errorMassege || "Failed to create organization");
      });
  };

  return (
    <div
      className={`flex-1 max-h-screen w-fit flex flex-col mt-16 caret-transparent`}
    >
      <div
        className={`inset-0 w-full h-screen absolute bg-black/50 z-30 transition-all ${
          !isOpen && "hidden"
        } sm:hidden`}
      />
      <div
        className={`absolute z-50 md:static drop-shadow-xl  transition-all ease-in-out duration-300 ${
          isOpen ? "w-1/2 sm:w-[180px] md:w-[340px]" : "w-14 sm:w-20"
        }  h-full bg-[#eceff2] p-2`}
      >
        <div className="flex relative  flex-col justify-between h-full gap-y-4 ">
          <div
            className={`absolute w-fit top-1/2 -right-2 min-h-10 rounded-full translate-x-1/2 bg-primary flex items-center`}
          >
            {isOpen ? (
              <ChevronLeft
                className="w-5 h-5 text-bold  text-primary cursor-pointer text-white"
                onClick={() => setIsOpen(false)}
              />
            ) : (
              <ChevronRight
                className="w-5 h-5  text-primary cursor-pointer text-white"
                onClick={() => setIsOpen(true)}
              />
            )}
          </div>
          <div
            className={`h-full pt-10 flex gap-y-2 flex-col overflow-y-auto overflow-x-hidden`}
          >
            {orgs.map((item) => (
              <SidebarItem key={item.id} orgId={item.id} label={item.name} />
            ))}
          </div>
          <div className={`w-full flex  flex-col gap-y-4 mb-4`}>
            <NewOrgModal handleCreate={handleCreate}>
              <Button
                size={"sm"}
                className="bg-primary gap-0 text-primary-foreground rounded-full justify-center"
              >
                <Plus className="w-4 h-4" />
                {
                  <p
                    className={` transition-all delay-75 ${
                      !isOpen ? "opacity-0 w-0 pl-0" : "pl-2 w-20 opacity-100"
                    } `}
                  >
                    Create organization
                  </p>
                }
              </Button>
            </NewOrgModal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
