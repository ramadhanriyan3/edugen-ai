import Image from "next/image";

export function Loading() {
  return (
    <div className={`w-screen h-screen flex items-center justify-center`}>
      <div className="flex flex-col gap-y-2 items-center animate-pulse">
        <Image src={"/eduGen-Logo.png"} alt="icon" width={50} height={60} />
      </div>
    </div>
  );
}
