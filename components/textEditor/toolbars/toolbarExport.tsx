import { Toolbar } from "@liveblocks/react-tiptap";
import { Editor } from "@tiptap/react";
import { Download } from "lucide-react";

type Props = {
  editor: Editor | null;
};

export function ToolbarExport({ editor }: Props) {
  return (
    <Toolbar.Button
      name="Export to word"
      icon={<Download />}
      onClick={() => editor?.chain().focus().exportToWord().run()}
    />
  );
}
