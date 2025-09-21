import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OrganizationModalContent from "./organizationModalContent";

interface OrganizationModalProps {
  orgId?: string;
  children?: ReactNode;
}

const OrganizationModal = ({ orgId, children }: OrganizationModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full mx-2 max-w-lg min-h-[300px]">
        <div className="flex flex-col gap-y-4">
          <DialogTitle className="sr-only" />
          <p className="font-bold  text-primary">Settings</p>
          <OrganizationModalContent orgId={orgId!} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrganizationModal;
