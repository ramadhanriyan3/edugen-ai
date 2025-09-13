"use client";

import {
  useLiveblocksExtension,
  FloatingComposer,
  FloatingThreads,
} from "@liveblocks/react-tiptap";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { EditorView } from "prosemirror-view";
import { useThreads } from "@liveblocks/react/suspense";
// import { DocumentSpinner } from "@/primitives/Spinner";

import { SelectionToolbar, StaticToolbar } from "./toolbars/toolbars";
import { CustomTaskItem } from "./customTaskItem";

export function Editor() {
  const liveblocks = useLiveblocksExtension();

  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "border-none outline-none flex-grow w-full h-full p-[4rem] bg-white",
      },
    },
    extensions: [
      liveblocks,
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
      Image.configure({
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
    <div className="flex flex-col bg-[rgb(244,244,245)] absolute top-0 right-0 left-0 bottom-0">
      <div
        className="top-0 left-0 bottom-0 right-0 flex-shrink-0 flex-grow-0 flex justify-between items-start bg-white 
      border-1 border-gray-100 px-2 py-1 z-[100]"
      >
        <StaticToolbar editor={editor} />
      </div>
      <div className="flex flex-1 overflow-y-scroll p-4 pb-0">
        <EditorContent
          editor={editor}
          className="relative min-h-full w-full bg-white"
        />
        <FloatingComposer editor={editor} style={{ width: 350 }} />
        <FloatingThreads editor={editor} style={{ width: 350 }} />
        <SelectionToolbar editor={editor} />
      </div>
    </div>
  );
}
