"use client";

import Image from "next/image";

import { OrganizationMemberType } from "@/lib/types";
import { LoaderCircle, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { useFetch } from "@/hooks/use-fetch";
import { useApiMutation } from "@/hooks/use-api-mutation";

const OrganizationMembers = ({ orgId }: { orgId: string }) => {
  const { data = [], isLoading } = useFetch<OrganizationMemberType[]>(
    ["members", orgId],
    `/api/orgMember?orgId=${orgId}`
  );

  const { mutate } = useApiMutation(
    "delete",
    (memberId) => `/api/orgMember?orgId=${orgId}&memberId=${memberId}`,
    ["members", orgId]
  );

  const member = data.filter((member) => member.role !== "owner");
  const owner = data.filter((member) => member.role === "owner")[0];

  const handleDelete = (id: string) => {
    const fullUrl = `/api/orgMember?orgId=${orgId}&memberId=${id}`;
    mutate({ params: fullUrl });
  };

  return (
    <div className="w-full h-full flex flex-col gap-y-2">
      {!isLoading ? (
        <>
          <div>
            <p className="font-semibold text-sm pb-1 text-primary">Owner</p>
            <div className=" border-2 border-primary rounded-lg p-1 flex gap-x-2 items-center">
              <Image
                src={owner.user?.image || "/user.png"}
                alt="userImage"
                width={30}
                height={30}
                className="aspect-square w-6 rounded-full flex items-center justify-center"
              />
              <p className="overflow-hidden text-nowrap w-full text-sm text-primary">
                {owner.user?.name}
              </p>
            </div>
          </div>
          <hr />
          <div>
            <p className="font-semibold text-sm pb-1 text-primary">Member</p>
            {!member.length && (
              <p className="text-sm align-middle text-muted-foreground">
                This organization has no members yet
              </p>
            )}
            {member.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className=" rounded-lg p-1 flex gap-x-2 items-center">
                    <Image
                      src={item.user?.image || "/user.png"}
                      alt="userImage"
                      width={30}
                      height={30}
                      className="aspect-square w-6 rounded-full flex items-center justify-center"
                    />
                    <p className="overflow-hidden text-sm text-nowrap w-full text-primary">
                      {item.user?.name}
                    </p>
                  </div>
                  <div className="w-fit flex gap-x-2 items-center">
                    <Button
                      className="bg-primary text-white text-xs"
                      size={"sm"}
                    >
                      Set as Admin
                    </Button>
                    <Button
                      className="border-red-700 text-red-700 text-xs hover:bg-transparent hover:text-red-700"
                      size={"sm"}
                      variant={"outline"}
                    >
                      Delete
                      <Trash2Icon
                        className="w-5 h-5 text-red-700 cursor-pointer"
                        onClick={() => handleDelete(item.id)}
                      />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center ">
          <LoaderCircle className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
};

export default OrganizationMembers;
