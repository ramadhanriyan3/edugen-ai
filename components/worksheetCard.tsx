"use client";

// import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal } from "lucide-react";

import WorksheetFooter from "./worksheetFooter";
// import { toast } from "sonner";
import Action from "./worksheetAction";
import { useSession } from "next-auth/react";

interface WorksheetCardProps {
  id: string;
  title: string;
  authorName: string;
  authorId: string;
  createdAt: number | string | Date;
  imageUrl: string;
  orgId: string;
  isFavorites: boolean;
}

const WorksheetCard = ({
  id,
  title,
  authorId,
  authorName,
  createdAt,
  imageUrl,
  orgId,
}: WorksheetCardProps) => {
  const { data: session } = useSession();
  const userId = session?.user!.id;

  console.log("GOBLOOOKKKK", { session, userId });

  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  return (
    <Link href={`/${orgId}/worksheets/${id}`}>
      <div
        className="group aspect-[100/127] border rounded-lg flex flex-col
         justify-between overflow-hidden"
      >
        <div className="relative flex-1 bg-amber-50">
          {/* <Image src={imageUrl} alt="doodle" fill className="object-fit" /> */}
          <div className="w-full  h-full opacity-0 group-hover:opacity-20 transition-opacity bg-black " />
          <Action id={id} title={title} side="right" sideOffset={10}>
            <button
              className="absolute z-40 top-1 right-1 aspect-square
            opacity-0 group-hover:opacity-100
            p-1 outline-none"
            >
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100" />
            </button>
          </Action>
        </div>
        <WorksheetFooter
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          title={title}
        />
      </div>
    </Link>
  );
};

export default WorksheetCard;
