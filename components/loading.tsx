import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex px-2 py-1 w-fit items-center justify-center p-1 bg-primary text-primary-foreground rounded-full borde transition-all animate-pulse repeat-infinite">
      <Image
        src={"/eduGen-white.png"}
        alt="logo"
        width={25}
        height={25}
        className="w-6 h-6"
      />
    </div>
  );
};

export default Loading;
