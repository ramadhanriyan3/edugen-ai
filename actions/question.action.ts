"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma.db";

const createQuestion = async (examId: string, content: string) => {
  try {
    const session = await auth();

    if (!session?.user?.id) throw new Error("Unauthorized");

    const newQuestion = await prisma.question.create({
      data: {
        examId,
        content,
      },
    });

    return newQuestion;
  } catch (error) {
    console.error("createQuestion", error);
  }
};

export { createQuestion };
