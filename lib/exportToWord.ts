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
  INumberingOptions,
} from "docx";
import { TiptapNode } from "./tiptap.type";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    exportToWord: {
      exportToWord: () => ReturnType;
    };
  }
}

export const ExportToWord = Extension.create({
  name: "exportToWord",

  addCommands() {
    return {
      exportToWord:
        (): Command =>
        ({ editor }) => {
          (async () => {
            const json = editor.getJSON() as {
              type: string;
              content?: TiptapNode[];
            };
            const paragraphs: Paragraph[] = [];

            const numbering: INumberingOptions = {
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
                {
                  reference: "bullet-list",
                  levels: [
                    {
                      level: 0,
                      format: "bullet",
                      text: "•",
                      alignment: "left",
                    },
                  ],
                },
              ],
            };

            const createTextRuns = (content?: TiptapNode[]): TextRun[] => {
              const runs: TextRun[] = [];
              content?.forEach((child) => {
                if (child.type === "text") {
                  runs.push(
                    new TextRun({
                      text: child.text,
                      bold: child.marks?.some((m) => m.type === "bold"),
                      italics: child.marks?.some((m) => m.type === "italic"),
                      underline: child.marks?.some(
                        (m) => m.type === "underline"
                      )
                        ? {}
                        : undefined,
                      strike: child.marks?.some((m) => m.type === "strike"),
                    })
                  );
                } else if (child.type === "link") {
                  const linkText =
                    child.content?.map((t) => t.text).join("") ??
                    child.attrs.href;
                  runs.push(
                    new TextRun({ text: linkText, style: "Hyperlink" })
                  );
                }
              });
              return runs;
            };

            const parseNode = async (node: TiptapNode) => {
              switch (node.type) {
                case "paragraph":
                  paragraphs.push(
                    new Paragraph({
                      children: createTextRuns(node.content),
                      alignment: node.attrs?.textAlign || "left",
                    })
                  );
                  break;

                case "heading":
                  paragraphs.push(
                    new Paragraph({
                      heading:
                        node.attrs.level === 1
                          ? HeadingLevel.HEADING_1
                          : node.attrs.level === 2
                          ? HeadingLevel.HEADING_2
                          : HeadingLevel.HEADING_3,
                      children: createTextRuns(node.content),
                      alignment: node.attrs?.textAlign || "left",
                    })
                  );
                  break;

                case "image":
                  try {
                    const res = await fetch(node.attrs.src);
                    const arrayBuffer = await res.arrayBuffer();
                    const data = new Uint8Array(arrayBuffer);

                    const image: IImageOptions = {
                      data,
                      transformation: {
                        width: node.attrs.width ?? 300,
                        height: node.attrs.height ?? 200,
                      },
                    } as unknown as IImageOptions;

                    paragraphs.push(
                      new Paragraph({ children: [new ImageRun(image)] })
                    );
                  } catch (e) {
                    console.error("Failed to load image:", node.attrs.src, e);
                  }
                  break;

                case "bulletList":
                case "orderedList": {
                  const isOrdered = node.type === "orderedList";
                  for (const item of node.content ?? []) {
                    paragraphs.push(
                      new Paragraph({
                        children: createTextRuns(item.content),
                        numbering: {
                          reference: isOrdered ? "ordered-list" : "bullet-list",
                          level: 0,
                        },
                      })
                    );
                  }
                  break;
                }

                case "listItem":
                case "taskItem": {
                  paragraphs.push(
                    new Paragraph({
                      children: createTextRuns(node.content),
                      numbering: { reference: "bullet-list", level: 0 },
                    })
                  );
                  break;
                }

                case "blockquote":
                  paragraphs.push(
                    new Paragraph({
                      children: createTextRuns(node.content),
                      indent: { left: 720 },
                      border: {
                        left: {
                          color: "999999",
                          space: 1,
                          size: 6,
                          style: "single",
                        },
                      },
                    })
                  );
                  break;

                default:
                  break;
              }

              if ("content" in node && node.content) {
                for (const child of node.content) {
                  await parseNode(child);
                }
              }
            };

            if (json.content) {
              for (const node of json.content) {
                await parseNode(node);
              }
            }

            const doc = new Document({
              sections: [{ properties: {}, children: paragraphs }],
              numbering,
            });

            const blob = await Packer.toBlob(doc);
            saveAs(blob, "document.docx");
          })();

          return true;
        },
    };
  },
});
