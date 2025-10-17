import { create } from "zustand";

const defaultValues = { id: "", title: "", orgId: "" };

interface IRenameModall {
  isOpen: boolean;
  initialValues: typeof defaultValues;
  onOpen: (id: string, tiltle: string, orgId: string) => void;
  onClose: () => void;
}

export const useRenameModal = create<IRenameModall>((set) => ({
  isOpen: false,
  onOpen: (id, title, orgId) =>
    set({
      isOpen: true,
      initialValues: { id, title, orgId },
    }),
  onClose: () =>
    set({
      isOpen: false,
      initialValues: defaultValues,
    }),
  initialValues: defaultValues,
}));
