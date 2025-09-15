"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { deleteExamById } from "@/actions/exam.action";
import OrganizationModal from "./organizations/organizationModal";

const SidebarItem = ({ label, orgId }: { label: string; orgId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname().split("/")[2];
  const isSelected = pathname === orgId;

  return (
    <div
      className={`relative group w-full transition rounded-md px-2 py-1 cursor-pointer ${
        isSelected ? " bg-primary/70 text-white" : "text-primary bg-white/70"
      } hover:bg-primary/70 hover:text-white flex justify-between items-center drop-shadow-sm`}
    >
      <Link
        href={`/${orgId}/worksheets`}
        className="flex gap-x-2 items-center group"
      >
        <div className="aspect-square w-12 rounded-md flex items-center justify-center bg-primary text-white group-hover:shadow-[0_0_8px_rgba(255,255,255,0.8)]">
          {label[0]}
        </div>
        <p className="overflow-hidden text-nowrap w-full ">{label}</p>
      </Link>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger
          asChild
          onClick={(prev) => {
            setIsOpen(!prev);
          }}
        >
          <Button variant={"ghost"} className=" rounded-full ">
            <MoreHorizontal
              className={`w-4 h-4 group-hover:text-white transition-colors ${
                isSelected ? "text-white" : "text-primary"
              }`}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className=" w-fit text-primary bg-primary-foreground p-1"
        >
          <OrganizationModal>
            <p className="w-full p-2 flex items-center hover:bg-black/10 transition-all cursor-pointer rounded-md">
              <Pencil className="w-4 h-4 mr-2" /> Edit
            </p>
          </OrganizationModal>
          <p
            className="w-full p-2 flex text-destructive items-center hover:bg-black/10 transition-all cursor-pointer rounded-md"
            onClick={async () => {
              await deleteExamById(orgId);
              setIsOpen(false);
              if (isSelected) {
                router.push("/");
              }
            }}
          >
            <Trash2 className="w-4 h-4 mr-2" /> Delete
          </p>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SidebarItem;
