"use client";

import { Input } from "@/components/ui/input";
import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

type Props = {
  editor: Editor | null;
};

export const FontSize = ({ editor }: Props) => {
  const [fontSize, setFontSize] = useState<number>(12);

  useEffect(() => {
    if (!editor) return;

    const updateFontSize = () => {
      const attrs = editor.getAttributes("textStyle");

      if (attrs.fontSize) {
        const size = parseInt(String(attrs.fontSize).replace(/px$/, ""));
        setFontSize(size);
      } else {
        setFontSize(12);
      }
    };

    editor.on("selectionUpdate", updateFontSize);

    updateFontSize();

    return () => {
      editor.off("selectionUpdate", updateFontSize);
    };
  }, [editor]);

  return (
    <Input
      type="number"
      value={fontSize ?? 12}
      min={8}
      className="text-xs w-10 p-1"
      onChange={(e) => {
        setFontSize(Number(e.target.value));
      }}
      onBlur={() => {
        const size = `${Math.max(8, fontSize)}px`;
        editor?.chain().focus().setMark("textStyle", { fontSize: size }).run();
      }}
    />
  );
};
