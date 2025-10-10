"use client";

import { SendHorizonal, Plus } from "lucide-react";
import { useSession } from "next-auth/react";

import { Textarea } from "./ui/textarea";

const AiModal = () => {
  const session = useSession().data?.user;
  const firstname = session?.name?.split(" ")[0];

  return (
    <div className="w-full bg-white flex flex-col justify-center rounded-md py-4">
      <div className="font-bold text-lg md:tex-2xl min-h-[150px] text-primary flex items-center justify-center">
        Hai {firstname}, There is something I can help?
      </div>
      <div className="flex mx-2 p-2 max-w-8/12 gap-x-2 bg-white drop-shadow-md px-4 items-center border rounded-full">
        <div className="aspect-square flex w-8 items-center justify-center rounded-full text-primary cursor-pointer hover:bg-primary/80 hover:text-white transition-colors">
          <Plus />
        </div>
        <Textarea
          className="w-10/12 bg-transparent overflow-y [&::-webkit-scrollbar]:hidden scrollbar-none border-none shadow-none resize-none "
          rows={1}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            const maxHeight = 80;
            target.style.height = `${Math.min(
              target.scrollHeight,
              maxHeight
            )}px`;
          }}
        />
        <div className="aspect-square flex w-8 items-center justify-center rounded-full text-primary cursor-pointer hover:bg-primary/80 hover:text-white transition-colors">
          <SendHorizonal className="w-4 h-4 -rotate-90" />
        </div>
      </div>
    </div>
  );
};

export default AiModal;
