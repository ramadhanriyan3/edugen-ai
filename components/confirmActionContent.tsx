import { Button } from "@/components/ui/button";
import {
  AlertDialogContent,
  AlertDialogFooter,
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
      <AlertDialogContent className="sm:max-w-8/12 bg-primary-foreground">
        <AlertDialogHeader className="flex flex-row items-center justify-between">
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <p>{content}</p>
        <AlertDialogFooter>
          <Button
            type="button"
            onClick={handleClose}
            variant={"outline"}
            className="w-fit flex items-center gap-x-2 text-primary hover:text-primary hover:bg-primary/20 border-primary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAction}
            type="button"
            variant={"destructive"}
            className="w-fit flex items-center gap-x-2"
          >
            <Trash className="w-4 h-4" />
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </>
  );
};

export default ConfirmActionContent;
