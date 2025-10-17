import { useOthers, useSelf } from "@liveblocks/react/suspense";
import Image from "next/image";

export function Avatars() {
  const users = useOthers();
  const currentUser = useSelf();

  return (
    <div className={"flex flex-row-reverse px-3 -space-x-2"}>
      {users.map(({ connectionId, info }) => {
        return (
          <Avatar key={connectionId} picture={info.avatar} name={info.name} />
        );
      })}
      {currentUser && (
        <div className="relative first:ml-0">
          <Avatar picture={currentUser.info.avatar} name={"You"} />
        </div>
      )}
    </div>
  );
}

export function Avatar({ picture, name }: { picture: string; name: string }) {
  return (
    <div
      className="relative flex shrink-0 place-content-center border-[2px] border-white rounded-full w-9 h-9 bg-gray-400 -ml-4 transition-transform duration-150 hover:-translate-y-1 hover:z-30 hover:scale-105
      before:content-[attr(data-tooltip)] before:absolute before:top-full before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-150 
      before:ease-in before:px-1 before:py-[2px] before:text-[10px] before:rounded-lg before:mt-2.5 before:z-[1] before:bg-gray-600
      before:text-white before:whitespace-nowrap"
      data-tooltip={name.split(" ")[0]}
    >
      <Image
        alt={name}
        src={picture}
        className="w-full h-full rounded-full"
        data-tooltip={name}
        width={40}
        height={40}
      />
    </div>
  );
}
