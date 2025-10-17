import { FloatingToolbar, Toolbar } from "@liveblocks/react-tiptap";
import { Editor } from "@tiptap/react";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { ToolbarExport } from "./toolbarExport";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

import { ToolbarMedia } from "./toolbarMedia";
import { ToolbarAlignment } from "./toolbarAlignment";
import { ToolbarBlockSelector } from "./toolbarBlockSelector";
import { ToolbarList } from "./toolbarList";
import { WorksheetType } from "@/lib/types";
import { useRenameModal } from "@/store/use-rename-modal";
import { Avatars } from "./avatars";
import { FontSelector } from "./fontSelector";
import { FontSize } from "./fontSize";

type Props = {
  editor: Editor | null;
  sheetId?: string;
  orgId?: string;
};

export function StaticToolbar({ editor, sheetId, orgId }: Props) {
  const [worksheetData, setWorksheetData] = useState<WorksheetType>();
  const { onOpen } = useRenameModal();

  useEffect(() => {
    axios
      .get(`/api/sheet/${sheetId}`)
      .then((res) => {
        setWorksheetData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sheetId]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between p-x-2 md:px-3 items-center">
        <div className="flex gap-x-2 items-end pr-2">
          <Link href={`/${orgId}/worksheets`}>
            <Image src={"/eduGen-Logo.png"} width={40} height={40} alt="logo" />
          </Link>
          <div className="flex">
            <p className="text-xs md:text-base text-muted-foreground">
              {worksheetData?.title}
            </p>
            <div className="ml-1 cursor-pointer group hover:bg-muted-foreground/30 h-fit p-[2px] rounded-sm">
              <Pencil
                onClick={() => {
                  onOpen(sheetId!, worksheetData?.title || "", orgId!);
                }}
                className="text-muted-foreground w-3 h-3 group:hover-"
              />
            </div>
          </div>
        </div>
        <div>
          <Avatars />
        </div>
      </div>
      <Toolbar
        editor={editor}
        data-toolbar="static"
        className="min-h-12 flex-wrap flex"
      >
        <Toolbar.SectionHistory />
        <Toolbar.Separator />
        <FontSelector editor={editor} />
        <FontSize editor={editor} />
        {/* <ToolbarBlockSelector /> */}
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
        <ToolbarExport
          editor={editor}
          title={worksheetData?.title || "Document"}
        />
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
