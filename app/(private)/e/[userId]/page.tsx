import { getOutput } from "@/actions/ai.action";
import ChatBox from "@/components/chatBox";
import ExamGenerateForm from "@/components/form/examGenerateForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";

const UserHomePage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const userId = (await params).userId;

  const outputAi = await getOutput();

  return (
    <div className="flex flex-1 h-full w-full flex-col items-start justify-center gap-y-4">
      {/* <p>{userId}</p> */}
      <ChatBox questionList={outputAi} />
      <div className="w-fit h-fit self-center py-4 sm:py-5">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground rounded-full flex items-center">
              New questions <Plus className="w-4 h-4 text-primary-foreground" />
            </Button>
          </DialogTrigger>
          <DialogTitle />
          <DialogContent className="p-0 w-fit">
            <ExamGenerateForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UserHomePage;
