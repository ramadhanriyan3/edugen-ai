"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { ReactNode } from "react";
import { Link2, Trash2, PencilLine } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "convex/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import ConfirmModal from "./confirmModal";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";

interface ActionProps {
  children: ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

const Action = ({ children, side, sideOffset, id, title }: ActionProps) => {
  const mutate = useMutation(api.board.deleteBoard);
  const { onOpen } = useRenameModal();

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Link copied"));
  };

  const boardId = id as Id<"boards">;

  const onDelete = () => {
    mutate({
      id: boardId,
    }).then(() => toast.success("Board deleted"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        align="start"
        sideOffset={sideOffset}
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuItem className="p-2 cursor-pointer" onClick={onCopyLink}>
          <Link2 className="w-4 h-4 mr-2" />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            onOpen(id, title);
          }}
          className="p-2 cursor-pointer"
        >
          <PencilLine className="w-4 h-4 mr-2" />
          Rename
        </DropdownMenuItem>

        <ConfirmModal
          header={`Are you sure to delete ${title} board?`}
          onConfirm={onDelete}
          description="This will delete th board and all of its contents."
        >
          <Button
            variant={"ghost"}
            className="px-2 py-1 justify-start w-full cursor-pointer text-red-500 hover:!text-red-500"
          >
            <Trash2 className="w-4 h-4 mr-2 hover:text-red-500" />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Action;
