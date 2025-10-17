import { Toolbar } from "@liveblocks/react-tiptap";

export function ToolbarBlockSelector() {
  return (
    <div className="flex">
      <Toolbar.BlockSelector
        data-toolbar="static"
        className={"w-[130px]"}
        items={(defaultBlockItems) => {
          const textItems = defaultBlockItems.filter(
            (item) => item.name === "Text" || item.name.startsWith("Heading")
          );

          return textItems;
        }}
      />
    </div>
  );
}
