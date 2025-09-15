export type TextMark = {
  type: "bold" | "italic" | "underline" | "strike";
};

export type TextNode = {
  type: "text";
  text: string;
  marks?: TextMark[];
};

export type ParagraphNode = {
  type: "paragraph";
  attrs?: { textAlign?: "left" | "center" | "right" };
  content?: TiptapNode[];
};

export type HeadingNode = {
  type: "heading";
  attrs: { level: number; textAlign?: "left" | "center" | "right" };
  content?: TiptapNode[];
};

export type ImageNode = {
  type: "image";
  attrs: { src: string; width?: number; height?: number };
};

export type ListItemNode = {
  type: "listItem" | "taskItem";
  attrs?: { checked?: boolean };
  content?: TiptapNode[];
};

export type BulletListNode = {
  type: "bulletList";
  content?: ListItemNode[];
};

export type OrderedListNode = {
  type: "orderedList";
  content?: ListItemNode[];
};

export type BlockquoteNode = {
  type: "blockquote";
  content?: TiptapNode[];
};

export type LinkNode = {
  type: "link";
  attrs: { href: string };
  content?: TextNode[];
};

export type TiptapNode =
  | TextNode
  | ParagraphNode
  | HeadingNode
  | ImageNode
  | ListItemNode
  | BulletListNode
  | OrderedListNode
  | BlockquoteNode
  | LinkNode;
