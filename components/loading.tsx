import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex items-center justify-center p-1 bg-white rounded-full border border-black/30 transition-all animate-pulse repeat-infinite">
      <Image
        src={"/eduGen-Logo.png"}
        alt="logo"
        width={20}
        height={20}
        className="w-5 h-5"
      />
    </div>
  );
};

export default Loading;
