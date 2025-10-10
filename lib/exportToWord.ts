import { Extension, Command } from "@tiptap/core";
import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  ImageRun,
  IImageOptions,
  AlignmentType,
  ExternalHyperlink,
} from "docx";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    exportToWord: {
      exportToWord: () => ReturnType;
    };
  }
}

interface TiptapMark {
  type: string;
  attrs?: Record<string, unknown>;
}

interface TiptapNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TiptapNode[];
  text?: string;
  marks?: TiptapMark[];
}

interface TiptapDoc {
  type: string;
  content?: TiptapNode[];
}

const getAlignment = (attrs?: Record<string, unknown>) => {
  switch (attrs?.textAlign) {
    case "center":
      return AlignmentType.CENTER;
    case "right":
      return AlignmentType.RIGHT;
    case "justify":
    case "both":
      return AlignmentType.JUSTIFIED;
    default:
      return AlignmentType.LEFT;
  }
};

export const ExportToWord = Extension.create({
  name: "exportToWord",

  addCommands() {
    return {
      exportToWord:
        (): Command =>
        ({ editor }) => {
          (async () => {
            try {
              const json = editor.getJSON() as TiptapDoc;
              const paragraphs: Paragraph[] = [];

              const processContent = (
                content: TiptapNode[] | undefined
              ): TextRun[] => {
                const textRuns: TextRun[] = [];

                if (!content) return textRuns;

                for (const node of content) {
                  if (node.type === "text") {
                    textRuns.push(
                      new TextRun({
                        text: node.text || "",
                        bold: node.marks?.some((m) => m.type === "bold"),
                        italics: node.marks?.some((m) => m.type === "italic"),
                        underline: node.marks?.some(
                          (m) => m.type === "underline"
                        )
                          ? {}
                          : undefined,
                        strike: node.marks?.some((m) => m.type === "strike"),
                        size: (() => {
                          const sizeMark = node.marks?.find(
                            (m) => m.type === "textStyle" && m.attrs?.fontSize
                          );
                          if (
                            sizeMark &&
                            typeof sizeMark.attrs?.fontSize === "string"
                          ) {
                            const fontSize = parseInt(sizeMark.attrs.fontSize);
                            if (!isNaN(fontSize)) return fontSize * 2;
                          }
                          return 24;
                        })(),
                        font: (() => {
                          const fontMark = node.marks?.find(
                            (m) => m.type === "textStyle" && m.attrs?.fontFamily
                          );
                          return fontMark?.attrs?.fontFamily || undefined;
                        })(),
                      })
                    );
                  } else if (node.type === "hardBreak") {
                    textRuns.push(new TextRun({ text: "", break: 1 }));
                  } else if (node.content) {
                    textRuns.push(...processContent(node.content));
                  }
                }

                return textRuns;
              };

              const processNode = async (node: TiptapNode): Promise<void> => {
                switch (node.type) {
                  case "doc":
                    if (node.content) {
                      for (const child of node.content) {
                        await processNode(child);
                      }
                    }
                    break;

                  case "paragraph":
                    const paraRuns = processContent(node.content);
                    paragraphs.push(
                      new Paragraph({
                        children: paraRuns.length
                          ? paraRuns
                          : [new TextRun("")],
                        alignment: getAlignment(node.attrs),
                      })
                    );
                    break;

                  case "heading":
                    const headingLevel =
                      node.attrs?.level === 1
                        ? HeadingLevel.HEADING_1
                        : node.attrs?.level === 2
                        ? HeadingLevel.HEADING_2
                        : node.attrs?.level === 3
                        ? HeadingLevel.HEADING_3
                        : node.attrs?.level === 4
                        ? HeadingLevel.HEADING_4
                        : node.attrs?.level === 5
                        ? HeadingLevel.HEADING_5
                        : HeadingLevel.HEADING_6;

                    paragraphs.push(
                      new Paragraph({
                        heading: headingLevel,
                        children: processContent(node.content),
                        alignment: getAlignment(node.attrs),
                      })
                    );
                    break;

                  case "image":
                    try {
                      const src = node.attrs?.src as string;
                      const width = (node.attrs?.width as number) || 300;
                      const height = (node.attrs?.height as number) || 200;

                      if (src.startsWith("data:image")) {
                        const base64Data = src.split(",")[1];
                        const buffer = Buffer.from(base64Data, "base64");

                        paragraphs.push(
                          new Paragraph({
                            children: [
                              new ImageRun({
                                data: buffer,
                                transformation: { width, height },
                              } as IImageOptions),
                            ],
                            alignment: "center",
                          })
                        );
                        break;
                      }

                      const response = await fetch(src);
                      if (!response.ok)
                        throw new Error(`Fetch failed: ${response.status}`);

                      if (src.toLowerCase().endsWith(".webp")) {
                        paragraphs.push(
                          new Paragraph({
                            children: [
                              new ExternalHyperlink({
                                children: [
                                  new TextRun({
                                    text: `Open Image: ${src}`,
                                    style: "Hyperlink",
                                  }),
                                ],
                                link: src,
                              }),
                            ],
                          })
                        );
                        break;
                      }
                    } catch (error) {
                      console.error("Error loading image:", error);
                      const src = (node.attrs?.src as string) || "Unavailable";

                      paragraphs.push(
                        new Paragraph({
                          children: [
                            new ExternalHyperlink({
                              children: [
                                new TextRun({
                                  text: `Open Image: ${src}`,
                                  style: "Hyperlink",
                                }),
                              ],
                              link: src,
                            }),
                          ],
                        })
                      );
                    }
                    break;

                  case "bulletList":
                    if (node.content) {
                      for (const item of node.content) {
                        if (item.type === "listItem" && item.content) {
                          for (const child of item.content) {
                            if (child.type === "paragraph") {
                              paragraphs.push(
                                new Paragraph({
                                  children: processContent(child.content),
                                  bullet: { level: 0 },
                                  indent: { left: 240, hanging: 240 },
                                  alignment: AlignmentType.LEFT,
                                })
                              );
                            }
                          }
                        }
                      }
                    }
                    break;

                  case "orderedList":
                    if (node.content) {
                      for (const item of node.content) {
                        if (item.type === "listItem" && item.content) {
                          for (const child of item.content) {
                            if (child.type === "paragraph") {
                              paragraphs.push(
                                new Paragraph({
                                  children: processContent(child.content),
                                  numbering: {
                                    reference: "ordered-list",
                                    level: 0,
                                  },
                                  indent: { left: 240, hanging: 240 },
                                  alignment: AlignmentType.LEFT,
                                })
                              );
                            }
                          }
                        }
                      }
                    }
                    break;

                  case "blockquote":
                    paragraphs.push(
                      new Paragraph({
                        children: processContent(node.content),
                        border: {
                          left: {
                            color: "999999",
                            size: 6,
                            space: 4,
                            style: "single",
                          },
                        },
                        indent: { left: 240 },
                      })
                    );
                    break;

                  default:
                    if (node.content) {
                      paragraphs.push(
                        new Paragraph({
                          children: processContent(node.content),
                        })
                      );
                    }
                    break;
                }
              };

              if (json.content) {
                for (const node of json.content) {
                  await processNode(node);
                }
              }

              const doc = new Document({
                numbering: {
                  config: [
                    {
                      reference: "ordered-list",
                      levels: [
                        {
                          level: 0,
                          format: "decimal",
                          text: "%1.",
                          alignment: "left",
                        },
                      ],
                    },
                  ],
                },
                sections: [{ properties: {}, children: paragraphs }],
              });

              const blob = await Packer.toBlob(doc);
              saveAs(blob, "document.docx");
            } catch (error) {
              console.error("Error exporting to Word:", error);
            }
          })();

          return true;
        },
    };
  },
});
