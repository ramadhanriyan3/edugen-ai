import OtpModal from "@/components/otpModal";

const VerificationPage = () => {
  return (
    <div className="flex-1 bg-transparent items-start pt-20 justify-center flex ">
      <div
        className="flex flex-col gap-y-4 w-full max-w-md min-w-72 min-h-72
     bg-white/70
      shadow-md drop-shadow-lg rounded-lg p-5 items-center mx-4"
      >
        <OtpModal />
      </div>
    </div>
  );
};

export default VerificationPage;
