import { Toolbar } from "@liveblocks/react-tiptap";
import { Editor } from "@tiptap/react";
import { ListOrdered, List, SquareCheckBig, TextQuote } from "lucide-react";

type Props = {
  editor: Editor | null;
};

export function ToolbarList({ editor }: Props) {
  return (
    <>
      <Toolbar.Toggle
        name="Bullet List"
        icon={<List />}
        active={editor?.isActive("bulletList") ?? false}
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
      />

      <Toolbar.Toggle
        name="Ordered List"
        icon={<ListOrdered />}
        active={editor?.isActive("orderedList") ?? false}
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      />
      <Toolbar.Toggle
        name="quoteblock"
        icon={<TextQuote />}
        active={editor?.isActive("blockquote") ?? false}
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
      />

      <Toolbar.Toggle
        name="Task List"
        icon={<SquareCheckBig size={"sm"} />}
        active={editor?.isActive("taskList") ?? false}
        onClick={() => editor?.chain().focus().toggleTaskList().run()}
      />
    </>
  );
}
