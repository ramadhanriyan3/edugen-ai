"use client";

import Markdown from "react-markdown";
import { getQuestionMarkdown, getQuestionNode } from "@/lib/getQuestionsNode";
import { useEffect, useState } from "react";
import { Copy, Download } from "lucide-react";

type Question = {
  question: string;
  options: string[];
  difficulty: string;
  answer: string;
  explanation: string;
};

const ChatBox = ({ questionList }: { questionList: Question[] }) => {
  const textAnimation = getQuestionMarkdown(questionList);

  const [text, setText] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setText(textAnimation.slice(0, index));
      index++;
      if (index > textAnimation.length) clearInterval(interval);
    }, 30);
  }, []);

  return (
    <div className="w-fit h-[84vh] overflow-y-auto p-4 flex flex-col gap-y-4 rounded-lg">
      <div className="flex flex-col rounded-md p-2 whitespace-pre-wrap">
        <Markdown>{text}</Markdown>
        <div className="w-fit flex gap-x-2 items-center py-4 self-end">
          <div className="p-2 w-fit border rounded-full bg-primary-foreground/90 text-primary cursor-pointer hover:bg-primary-foreground/80">
            <Copy className="w-4 h-4 " />
          </div>
          <div className="p-2 w-fit border rounded-full bg-primary-foreground/90 text-primary cursor-pointer hover:bg-primary-foreground/80">
            <Download className="w-4 h-4 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
