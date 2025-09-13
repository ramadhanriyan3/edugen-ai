import { Toolbar } from "@liveblocks/react-tiptap";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import { Code, ImagePlus } from "lucide-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Props = {
  editor: Editor | null;
};

export function ToolbarMedia({ editor }: Props) {
  const [imageUrl, setImageUrl] = useState<string>("");

  function addImage(url: string) {
    if (!url.length || !editor) {
      return;
    }

    editor.chain().setImage({ src: url }).run();
  }

  return (
    <>
      <Toolbar.Toggle
        name="Code block"
        icon={<Code />}
        active={editor?.isActive("codeBlock") ?? false}
        onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
        disabled={!editor?.can().chain().focus().toggleCodeBlock().run()}
      />

      <Popover>
        <PopoverTrigger asChild>
          <Toolbar.Toggle
            name="Image"
            icon={<ImagePlus />}
            active={editor?.isActive("image") ?? false}
            disabled={!editor?.can().chain().setImage({ src: "" }).run()}
          />
        </PopoverTrigger>
        <PopoverContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addImage(imageUrl);
            }}
          >
            <div className="flex flex-col gap-y-2 w-full">
              <Label className="text-xs">Add image URL</Label>
              <div className="flex gap-x-2 items-end">
                <Input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <Button type="submit">Add image</Button>
              </div>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
}
