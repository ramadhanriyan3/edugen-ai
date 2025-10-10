"use client";

import { X, Check } from "lucide-react";

import { OrgInvitationType } from "@/lib/types";
import { Button } from "./ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";

interface NotificationModalProps {
  notifications: OrgInvitationType[] | [];
}

const NotificationModal = ({ notifications }: NotificationModalProps) => {
  console.log({ notifications });

  const { mutate: post } = useApiMutation(
    "post",
    (restUrl) => `/api/${restUrl}`
  );
  const { mutate: patch } = useApiMutation(
    "patch",
    (restUrl) => `/api/${restUrl}`
  );
  const { mutate: del } = useApiMutation(
    "delete",
    (restUrl) => `/api/${restUrl}`
  );

  const handleAccept = (orgId: string, invitationId: string) => {
    patch({ params: `invitation?orgId=${orgId}&invitationId=${invitationId}` });
    post({ params: `orgMember?orgId=${orgId}` });
  };

  const handleReject = (orgId: string, invitationId: string) => {
    console.log("gak dulu mas");
    del({ params: `invitation?orgId=${orgId}&invitationId=${invitationId}` });
  };

  return (
    <div className="w-fit p-2 px-0 flex flex-col gap-y-2">
      {!notifications.length ? (
        <p className="text-muted-foreground font-semibold text-xs p-2">
          There are no notifications
        </p>
      ) : (
        <div className="flex flex-col">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="flex gap-x-4 justify-between items-center hover:bg-primary/10 p-2 transition-colors"
            >
              <p className=" text-xs max-w-[200px]">
                {notif.owner?.name} wants you to join {notif.organization?.name}
              </p>
              <div className="flex gap-x-2">
                <Button
                  onClick={() => handleReject(notif.orgId, notif.id)}
                  size={"sm"}
                  variant={"outline"}
                  className="border-destructive rounded-full text-destructive bg-transparent hover:bg-destructive hover:text-white"
                >
                  <X />
                </Button>
                <Button
                  onClick={() => handleAccept(notif.orgId, notif.id)}
                  size={"sm"}
                  variant={"outline"}
                  className="border-green-600 rounded-full text-green-600 bg-transparent hover:bg-green-600 hover:text-white"
                >
                  <Check />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationModal;
