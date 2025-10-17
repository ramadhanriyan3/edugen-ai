"use client";

import Image from "next/image";
import { useState } from "react";
import { LoaderCircle, UserPlus2 } from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "../ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import { Input } from "../ui/input";
import { UserType } from "@/lib/types";
import { useFetch } from "@/hooks/use-fetch";
import { Label } from "../ui/label";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";

const OrganizationInvite = ({ orgId }: { orgId: string }) => {
  const { data: session } = useSession();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { mutate } = useApiMutation(
    "post",
    (memberId) => `/api/invitation?orgId=${orgId}&memberId=${memberId}`
  );

  const { data, isLoading } = useFetch<UserType[]>(
    ["users", debouncedSearch],
    `/api/users?search=${debouncedSearch}`
  );

  const users = data?.filter((user) => user.id !== session?.user?.id);

  const handleInvitation = (memberId: string) => {
    mutate({ params: memberId });
    toast.success("Invitation sent");
  };

  return (
    <div className="flex flex-col gap-y-2">
      <Label className="text-xs font-semibold text-primary">
        Invite someone
      </Label>
      <Input
        name="search-user"
        placeholder="find a name"
        onChange={(e) => {
          console.log(e.target.value);
          setSearch(e.target.value);
        }}
      />
      <hr />
      {isLoading ? (
        <div className="flex items-center justify-center">
          <LoaderCircle className="w-5 h-5 text-muted-foreground animate-spin" />
        </div>
      ) : (
        <>
          {!users?.length && (
            <p className="text-sm align-middle text-muted-foreground">
              User not found
            </p>
          )}
          {users?.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-white drop-shadow-sm rounded-lg p-1"
            >
              <div className=" rounded-lg p-1 flex gap-x-2 items-center">
                <Image
                  src={user.image || "/user.png"}
                  alt="userImage"
                  width={30}
                  height={30}
                  className="aspect-square w-6 rounded-full flex items-center justify-center"
                />
                <p className="overflow-hidden text-sm text-nowrap w-full text-primary">
                  {user.name}
                </p>
              </div>
              <div className="w-fit flex gap-x-2 items-center">
                <Button
                  className="bg-primary text-white text-xs"
                  size={"sm"}
                  onClick={() => {
                    handleInvitation(user.id);
                  }}
                >
                  <UserPlus2 className="w-3 h-3" /> Invite
                </Button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default OrganizationInvite;
