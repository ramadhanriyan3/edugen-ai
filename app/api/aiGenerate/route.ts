import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";
import pdf from "pdf-parse-new";
import OpenAi from "openai";
import { createOptimizedPrompt } from "@/lib/getPromp";

const AI_KEY = process.env.OPENROUTER_API_KEY;

const openai = new OpenAi({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: `${AI_KEY}`,
  defaultHeaders: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${AI_KEY}`,
  },
});

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user?.id;
  const formData = await req.formData();

  const file = formData.get("file");
  const prompt = formData.get("prompt");

  let fileContent = "";

  try {
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (file instanceof File) {
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: "File harus PDF atau DOCX" },
          { status: 400 }
        );
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "File terlalu besar" },
          { status: 400 }
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      if (file.type === ALLOWED_MIME_TYPES[1]) {
        const result = await mammoth.extractRawText({ buffer });
        fileContent = result.value;
      }

      if (file.type === ALLOWED_MIME_TYPES[0] || file.name.endsWith(".pdf")) {
        const pdfData = await pdf(buffer);
        fileContent = pdfData.text;
      }
    }

    const optimizedPropmpt = createOptimizedPrompt(
      prompt as string,
      fileContent
    );

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.3-70b-instruct:free",
      messages: [
        {
          role: "system",
          content:
            "You are a professional content writer that outputs only use for update tiptap text editor content.",
        },
        {
          role: "user",
          content: optimizedPropmpt,
        },
      ],
      temperature: 0.8,
      frequency_penalty: 0.5,
      presence_penalty: 0.1,
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.log({ error });
  }
}
