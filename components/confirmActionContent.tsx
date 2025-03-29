import { Button } from "@/components/ui/button";
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";

interface ConfirmActionProps {
  title: string;
  content: string;
  handleAction: () => void;
  handleClose: () => void;
}

const ConfirmActionContent = ({
  title,
  content,
  handleAction,
  handleClose,
}: ConfirmActionProps) => {
  return (
    <>
      <AlertDialogContent className="w-10/12 bg-primary-foreground ">
        <AlertDialogHeader className="flex flex-row items-center justify-between">
          <AlertDialogTitle className="text-sm sm:text-base">
            {title}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <p className="text-xs sm:text-sm">{content}</p>
        <div className="flex w-full gap-x-2 items-center justify-end">
          <Button
            type="button"
            onClick={handleClose}
            variant={"outline"}
            className="w-fit text-xs sm:text-sm flex items-center gap-x-2 text-primary hover:text-primary hover:bg-primary/20 border-primary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAction}
            type="button"
            variant={"destructive"}
            className="w-fit text-xs sm:text-sm flex items-center gap-x-2"
          >
            <Trash className="w-3  h-3 sm:w-4 sm:h-4" />
            Delete
          </Button>
        </div>
        <AlertDialogDescription></AlertDialogDescription>
      </AlertDialogContent>
    </>
  );
};

export default ConfirmActionContent;
