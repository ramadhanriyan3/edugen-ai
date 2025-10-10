import { Editor } from "@tiptap/react";

type Props = {
  editor: Editor | null;
};

export const FontSelector = ({ editor }: Props) => {
  const fonts = [
    { name: "Arial", value: "Arial, sans-serif" },
    { name: "Times New Roman", value: "Times New Roman, serif" },
    { name: "Calibri", value: "Calibri, sans-serif" },
    { name: "Cambria", value: "Cambria, serif" },
    { name: "Garamond", value: "Garamond, serif" },
    { name: "Georgia", value: "Georgia, serif" },
    { name: "Verdana", value: "Verdana, sans-serif" },
  ];

  return (
    <select
      onChange={(e) => {
        editor?.chain().focus().setFontFamily(e.currentTarget.value).run();
        console.log(e.currentTarget.value);
        console.log(editor?.getAttributes("textStyle").fontFamily || "ga ada");
      }}
      value={
        editor?.getAttributes("textStyle").fontFamily || "Arial, sans-serif"
      }
      className="border rounded px-2 py-2 text-sm"
    >
      {fonts.map((font) => (
        <option
          key={font.value}
          value={font.name}
          style={{ fontFamily: font.value }}
        >
          {font.name}
        </option>
      ))}
    </select>
  );
};
