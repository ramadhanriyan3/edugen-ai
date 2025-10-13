import { Toolbar } from "@liveblocks/react-tiptap";
import { Editor } from "@tiptap/react";
import { Download } from "lucide-react";

type Props = {
  editor: Editor | null;
  title: string;
};

export function ToolbarExport({ editor, title }: Props) {
  return (
    <Toolbar.Button
      name="Export to word"
      icon={<Download />}
      onClick={() => editor?.chain().focus().exportToWord(title).run()}
    />
  );
}
