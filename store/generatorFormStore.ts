"use client";

import { create } from "zustand";

type ExamFormState = {
  generateStatus: boolean;
  updateGenerateStatus: (newStatus: boolean) => void;
};

const useExamFormStore = create<ExamFormState>((set) => ({
  generateStatus: false,
  updateGenerateStatus: (newStatus: boolean) =>
    set({ generateStatus: newStatus }),
}));

export { useExamFormStore };
