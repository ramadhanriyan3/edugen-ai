import { getExamById } from "@/actions/exam.action";
import ChatRoom from "@/components/chatRoom";
import { redirect } from "next/navigation";

const UserHomePage = async ({
  params,
}: {
  params: Promise<{ examId: string }>;
}) => {
  const examId = (await params).examId;

  const exam = await getExamById(examId);

  if (!exam) redirect("/not-found");

  return (
    <div className="flex flex-1 h-full w-full flex-col items-start justify-center gap-y-4">
      {/* <p>{examId}</p> */}
      <ChatRoom examId={examId} />
    </div>
  );
};

export default UserHomePage;
