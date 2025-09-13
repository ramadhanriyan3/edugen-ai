import TaskItem from "@tiptap/extension-task-item";
import {
  NodeViewContent,
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { Checkbox } from "@/components/ui/checkbox";

export const CustomTaskItem = TaskItem.extend({
  addNodeView: () => {
    return ReactNodeViewRenderer(TiptapCheckbox);
  },
});

function TiptapCheckbox({ node, updateAttributes }: NodeViewProps) {
  return (
    <NodeViewWrapper className={"flex my-1 ml-4 "}>
      <label
        className={"flex flex-grow-0 flex-shrink-0"}
        contentEditable={false}
      >
        <Checkbox
          className="mr-1 place-self-center"
          defaultChecked={false}
          checked={node.attrs.checked}
          onCheckedChange={(checked: boolean) => updateAttributes({ checked })}
        />
      </label>
      <NodeViewContent className={"flex-auto"} />
    </NodeViewWrapper>
  );
}
