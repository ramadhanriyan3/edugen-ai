"use client";

import Markdown from "react-markdown";
import { memo, useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

const ChatBoxComponent = ({
  question,
  isTyping,
}: {
  question: string;
  isTyping?: boolean;
}) => {
  const [text, setText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const markdownRef = useRef<HTMLDivElement | null>(null);

  const copyToClipboard = async () => {
    try {
      const textToCopy = markdownRef.current?.innerText || "";
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setText(question.slice(0, index));
      index++;
      if (index > question.length) clearInterval(interval);
    }, 10);
  }, [question]);

  return (
    <div className="flex flex-col rounded-md p-2 whitespace-pre-wrap">
      <div ref={markdownRef}>
        <Markdown>
          {(isTyping ? text : question).replace(/\n\n/g, "  \n")}
        </Markdown>
      </div>
      <div className="w-fit flex gap-x-2 items-center py-4 self-end">
        <div
          onClick={copyToClipboard}
          className="p-2 w-fit border rounded-full bg-primary-foreground/90 text-primary cursor-pointer hover:bg-primary-foreground/80"
        >
          {isCopied ? (
            <Check className="w-4 h-4 " />
          ) : (
            <Copy className="w-4 h-4 " />
          )}
        </div>
        {/* <div className="p-2 w-fit border rounded-full bg-primary-foreground/90 text-primary cursor-pointer hover:bg-primary-foreground/80">
          <Download className="w-4 h-4 " />
        </div> */}
      </div>
    </div>
  );
};

const ChatBox = memo(ChatBoxComponent);

export default ChatBox;
