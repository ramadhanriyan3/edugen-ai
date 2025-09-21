"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRenameModal } from "@/store/use-rename-modal";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
});

export function RenameModal() {
  const { isOpen, onClose, initialValues } = useRenameModal();
  const router = useRouter();

  const { id, orgId } = initialValues;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValues.title,
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({ title: initialValues.title });
    }
  }, [isOpen, initialValues.title, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const data = { id: id, title: values.title };

    axios
      .patch(`/api/sheet/${id}?orgId=${orgId}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        router.refresh();
        toast.success("Document renamed");
        onClose();
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] [&_[data-radix-dialog-close]]:hidden">
        <DialogHeader>
          <DialogTitle>Edit document title</DialogTitle>
          <DialogDescription>
            Enter a new title for this document.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Document title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                className="bg-blue-900 hover:bg-blue-950 items-end"
                type="submit"
              >
                Save
              </Button>
              <DialogClose asChild>
                <Button variant={"outline"}>Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
