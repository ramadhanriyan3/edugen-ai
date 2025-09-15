import { FloatingToolbar, Toolbar } from "@liveblocks/react-tiptap";
import { Editor } from "@tiptap/react";

import { ToolbarMedia } from "./toolbarMedia";
import { ToolbarAlignment } from "./toolbarAlignment";
import { ToolbarBlockSelector } from "./toolbarBlockSelector";
import { ToolbarList } from "./toolbarList";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { ToolbarExport } from "./toolbarExport";

type Props = {
  editor: Editor | null;
};

export function StaticToolbar({ editor }: Props) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between p-x-2 md:px-3 items-center">
        <div className="flex gap-x-2 items-end pr-2">
          <Image src={"/eduGen-Logo.png"} width={40} height={40} alt="logo" />
          <div className="flex">
            <p className="text-xs md:text-base text-muted-foreground">
              nama room
            </p>
            <div className="ml-1 cursor-pointer group hover:bg-muted-foreground/30 h-fit p-[2px] rounded-sm">
              <Pencil className="text-muted-foreground w-3 h-3 group:hover-" />
            </div>
          </div>
        </div>
        <div>disini avatar</div>
      </div>
      <Toolbar editor={editor} data-toolbar="static" className="min-h-12">
        <Toolbar.SectionHistory />
        <Toolbar.Separator />
        <ToolbarBlockSelector />
        <Toolbar.Separator />
        <Toolbar.SectionInline />
        <Toolbar.Separator />
        <ToolbarAlignment editor={editor} />
        <Toolbar.Separator />
        <ToolbarList editor={editor} />
        <Toolbar.Separator />
        <ToolbarMedia editor={editor} />
        <Toolbar.Separator />
        <Toolbar.SectionCollaboration />
        <Toolbar.Separator />
        <ToolbarExport editor={editor} />
      </Toolbar>
    </div>
  );
}

export function SelectionToolbar({ editor }: Props) {
  return (
    <FloatingToolbar editor={editor} data-toolbar="selection">
      <ToolbarBlockSelector />
      <Toolbar.Separator />
      <Toolbar.SectionInline />
      <Toolbar.Separator />
      <Toolbar.SectionCollaboration />
    </FloatingToolbar>
  );
}
