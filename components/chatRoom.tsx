"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowDown, Plus } from "lucide-react";

import ChatBox from "@/components/chatBox";
import ExamGenerateForm from "@/components/form/examGenerateForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getExamById } from "@/actions/exam.action";
import Loading from "@/components/loading";
import { useExamFormStore } from "@/store/generatorFormStore";

type questionsType = {
  id: string;
  createdAt: Date;
  examId: string;
  content: string;
};

const ChatRoom = ({ examId }: { examId: string }) => {
  const [questionList, setQuestionList] = useState<questionsType[]>([]);
  const [lastQuestion, setLastQuestion] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const { generateStatus } = useExamFormStore();

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getExamById(examId);
      const questions = data?.questions;
      setQuestionList(questions ? questions : []);
    };
    fetchData();
  }, [examId]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    const handleScroll = () => {
      const isAtBottom =
        chatContainer.scrollHeight - chatContainer.scrollTop <=
        chatContainer.clientHeight + 50;
      setShowScrollButton(!isAtBottom);
    };

    chatContainer.addEventListener("scroll", handleScroll);

    const isAtBottom =
      chatContainer.scrollHeight - chatContainer.scrollTop <=
      chatContainer.clientHeight + 50;

    if (isAtBottom) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    return () => chatContainer.removeEventListener("scroll", handleScroll);
  }, [questionList, lastQuestion, generateStatus]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col w-full h-full relative">
      <div
        ref={chatContainerRef}
        className="w-full h-[84vh] overflow-y-auto p-4 flex flex-col gap-y-4 rounded-lg"
      >
        {questionList.map((question) => (
          <ChatBox key={question.id} question={question.content} />
        ))}
        {lastQuestion.length ? (
          <div className="w-full">
            {generateStatus ? (
              <Loading />
            ) : (
              <ChatBox question={lastQuestion} isTyping />
            )}
          </div>
        ) : null}
        <div ref={chatEndRef} />
      </div>
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-40 p-2 right-1/2 bg-primary text-primary-foreground rounded-full"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      )}
      <div className="w-fit h-fit self-center py-4 sm:py-5">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground rounded-full flex items-center">
              New questions <Plus className="w-4 h-4 text-primary-foreground" />
            </Button>
          </DialogTrigger>
          <DialogTitle />
          <DialogContent className="p-0 w-fit">
            <ExamGenerateForm
              setIsOpen={setIsOpen}
              setLastQuestion={setLastQuestion}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ChatRoom;
