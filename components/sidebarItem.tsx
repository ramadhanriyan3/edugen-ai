import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useState } from "react";

const SidebarItem = ({ label }: { label: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full rounded-full bg-white flex justify-between items-center">
      <p className="overflow-hidden text-nowrap">{label}</p>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger
          asChild
          onClick={(prev) => {
            setIsOpen(!prev);
          }}
        >
          <Button variant={"ghost"} className=" rounded-full ">
            <MoreHorizontal className="w-4 h-4 text-primary" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className=" w-fit text-primary bg-primary-foreground p-1"
        >
          <p className="w-full p-2 flex items-center hover:bg-black/10 transition-all cursor-pointer rounded-md">
            <Pencil className="w-4 h-4 mr-2" /> Rename
          </p>
          <p className="w-full p-2 flex text-destructive items-center hover:bg-black/10 transition-all cursor-pointer rounded-md">
            <Trash2 className="w-4 h-4 mr-2" /> Delete
          </p>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SidebarItem;
