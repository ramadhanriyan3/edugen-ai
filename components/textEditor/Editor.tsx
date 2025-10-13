"use client";

import {
  useLiveblocksExtension,
  FloatingComposer,
  FloatingThreads,
} from "@liveblocks/react-tiptap";
import Image from "next/image";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { Image as TiptapImage } from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";

import { useThreads } from "@liveblocks/react/suspense";

import { SelectionToolbar, StaticToolbar } from "./toolbars/toolbars";
import { CustomTaskItem } from "./customTaskItem";
import { ExportToWord } from "@/lib/exportToWord";
import { FontSize } from "@/lib/fontSizeExtention";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AiModal from "../aiModal";
import { useState } from "react";

export function Editor({ sheetId, orgId }: { sheetId: string; orgId: string }) {
  const liveblocks = useLiveblocksExtension();
  const [isOpen, setIsOpen] = useState(false);

  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "border-none outline-none flex-grow w-full h-full p-[4rem] bg-white",
      },
    },
    extensions: [
      liveblocks,
      TextStyle,
      FontSize,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      ExportToWord,
      StarterKit.configure({
        blockquote: {
          HTMLAttributes: {
            class: "tiptap-blockquote",
          },
        },
        code: {
          HTMLAttributes: {
            class: "tiptap-code",
          },
        },
        codeBlock: {
          languageClassPrefix: "language-",
          HTMLAttributes: {
            class: "tiptap-code-block bg-black text-green-600",
            SpellCheck: false,
          },
        },
        heading: {
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: "tiptap-heading",
          },
        },
        history: false,
        horizontalRule: {
          HTMLAttributes: {
            class: "tiptap-hr",
          },
        },
        listItem: {
          HTMLAttributes: {
            class: "tiptap-list-item",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "tiptap-ordered-list",
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: "tiptap-paragraph",
          },
        },
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "tiptap-highlight",
        },
      }),
      TiptapImage.configure({
        HTMLAttributes: {
          class: "tiptap-image",
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class: "tiptap-link",
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing…",
        emptyEditorClass: "tiptap-empty",
      }),
      CustomTaskItem,
      TaskList.configure({
        HTMLAttributes: {
          class: "tiptap-task-list",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: "tiptap-task-list",
        },
      }),
      Typography,
    ],
    immediatelyRender: false,
  });

  const { threads } = useThreads();

  return (
    <div className="flex flex-col bg-[rgb(244,244,245)] absolute inset-0">
      <div
        className="flex-shrink-0 flex justify-between items-start bg-white 
        border-b border-gray-200 px-2 py-1 z-[100] shadow-sm"
      >
        <StaticToolbar editor={editor} orgId={orgId} sheetId={sheetId} />
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="relative min-h-screen w-full  bg-white shadow-md rounded-md p-8">
          <EditorContent editor={editor} />
        </div>

        <FloatingComposer editor={editor} style={{ width: 350 }} />
        <FloatingThreads
          editor={editor}
          style={{ width: 350 }}
          threads={threads}
        />
        <SelectionToolbar editor={editor} />
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="absolute w-fit  bottom-10 right-14" asChild>
          <Button className="flex items-center gap-0 px-1 p-0 rounded-full">
            <Image
              alt="logo"
              width={30}
              height={30}
              src={"/eduGen-white.png"}
            />
            <p className="pr-2 text-xs">Use AI</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md mx-4 p-0 rounded-md">
          <DialogTitle className="sr-only" />
          <AiModal editor={editor} setClose={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
