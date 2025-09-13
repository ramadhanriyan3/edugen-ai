"use client";

import { Plus } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import { NewWorksheetModal } from "./newWorksheetModal";
import { useRouter } from "next/navigation";

interface NewButtonProps {
  orgId: string;
  disabled: boolean;
}

const NewWorksheetButton = ({ orgId }: NewButtonProps) => {
  const router = useRouter();

  const handleCreate = (title: string) => {
    axios
      .post(`/api/sheet?orgId=${orgId}`, {
        title: title,
        orgId: orgId,
      })
      .then((res) => {
        const id = res.data.id;
        toast.success("Documnent created");
        router.push(`/board/${id}`);
      })
      .catch(() => {
        toast.error("Failed to create document");
      });
  };

  return (
    <NewWorksheetModal handleCreate={handleCreate}>
      <div
        className={`cursor-pointer group aspect-[100/127] border rounded-lg flex flex-col
        justify-between overflow-hidden bg-blue-600 disabled:opacity-70`}
      >
        <div className="relative flex-1 ">
          <div className="text-white absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 flex flex-col items-center justify-center">
            <Plus className=" w-10 h-10 stroke-1" />
            <p className=" text-xs font-semibold">New document</p>
          </div>
          <div className="w-full  h-full opacity-0 group-hover:opacity-20 transition-opacity bg-black " />
        </div>
      </div>
    </NewWorksheetModal>
  );
};

export default NewWorksheetButton;
