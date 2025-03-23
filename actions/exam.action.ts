"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma.db";

const getExams = async () => {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      throw new Error("Unauthorized");
    }

    const exams = await prisma.exam.findMany({
      where: {
        userId: session.user?.id,
      },
      select: {
        id: true,
        title: true,
      },
    });

    return exams;
  } catch (error) {
    console.error("GET_EXAMS", error);
    return [];
  }
};

const getExamById = async (examId: string) => {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      throw new Error("Unauthorized");
    }

    const exam = await prisma.exam.findFirst({
      where: {
        id: examId,
        userId: session.user.id,
      },
      include: {
        questions: true,
      },
    });

    if (!exam) {
      console.warn(`exam not found: ${examId}`);
      return null;
    }

    return exam;
  } catch (error) {
    console.error("GET_EXAM_BY_ID", error);
    return null;
  }
};

const createExam = async (title: string) => {
  try {
    const session = await auth();
    if (!session || !session.user?.id) throw new Error("Unauthorized");

    const newExam = await prisma.exam.create({
      data: {
        title,
        userId: session.user.id,
      },
    });
    return newExam;
  } catch (error) {
    console.error("Create Exam", error);
  }
};

const updateExam = async (title: string, examId: string) => {
  try {
    const session = await auth();
    if (!session || !session.user?.id) throw new Error("Unauthorized");

    const newExam = await prisma.exam.update({
      where: {
        id: examId,
        userId: session.user.id,
      },
      data: {
        title,
      },
    });
    return newExam;
  } catch (error) {
    console.error("Create Exam", error);
  }
};

const deleteExamById = async (examId: string) => {
  try {
    const session = await auth();
    if (!session || !session.user?.id) throw new Error("Unauthorized");

    const newExam = await prisma.exam.delete({
      where: {
        id: examId,
        userId: session.user.id,
      },
    });
    return newExam;
  } catch (error) {
    console.error("Create Exam", error);
  }
};

const deleteExams = async () => {
  try {
    const session = await auth();
    if (!session || !session.user?.id) throw new Error("Unauthorized");

    await prisma.exam.deleteMany({
      where: {
        userId: session.user.id,
      },
    });

    return { success: true, message: "All exams has been deleted" };
  } catch (error) {
    console.log("DELETE_EXAMS", error);
    return { success: false, message: "Fail to delete exams" };
  }
};

export {
  getExams,
  getExamById,
  createExam,
  updateExam,
  deleteExamById,
  deleteExams,
};
