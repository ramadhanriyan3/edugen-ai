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
import { deleteExamById } from "@/app/actions/exam.action";

const SidebarItem = ({ label, examId }: { label: string; examId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname().split("/")[2];
  const isSelected = pathname === examId;

  return (
    <div
      className={`relative group w-full transition rounded-md px-2 py-1 cursor-pointer ${
        isSelected ? "bg-primary text-white" : "bg-white text-primary"
      } hover:bg-primary/70 hover:text-white flex justify-between items-center`}
    >
      <Link href={`/e/${examId}`}>
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
          <p className="w-full p-2 flex items-center hover:bg-black/10 transition-all cursor-pointer rounded-md">
            <Pencil className="w-4 h-4 mr-2" /> Rename
          </p>
          <p
            className="w-full p-2 flex text-destructive items-center hover:bg-black/10 transition-all cursor-pointer rounded-md"
            onClick={async () => {
              await deleteExamById(examId);
              setIsOpen(false);
              router.push("/e");
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
