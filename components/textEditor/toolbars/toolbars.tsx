import { FloatingToolbar, Toolbar } from "@liveblocks/react-tiptap";
import { Editor } from "@tiptap/react";

import { ToolbarMedia } from "./toolbarMedia";
import { ToolbarAlignment } from "./toolbarAlignment";
import { ToolbarBlockSelector } from "./toolbarBlockSelector";
import { ToolbarList } from "./toolbarList";

type Props = {
  editor: Editor | null;
};

export function StaticToolbar({ editor }: Props) {
  return (
    <Toolbar editor={editor} data-toolbar="static">
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
    </Toolbar>
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
