"use client";

import {
  SendHorizonal,
  Plus,
  File as DocFile,
  LoaderCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Editor } from "@tiptap/react";

import { Textarea } from "./ui/textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { AxiosError } from "axios";

const formSchema = z.object({
  prompt: z.string().min(2),
  file: z
    .instanceof(File)
    .refine(
      (file) =>
        [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      "Only .pdf and .docx files are allowed"
    )
    .optional(),
});

interface AiModalProps {
  editor: Editor | null;
  setClose: () => void;
}

const AiModal = ({ editor, setClose }: AiModalProps) => {
  const session = useSession().data?.user;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync } = useApiMutation("post", "/api/aiGenerate", true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const firstname = session?.name?.split(" ")[0];

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("prompt", values.prompt);
      if (values.file) {
        formData.append("file", values.file);
      }

      const response = await mutateAsync({ payload: formData });
      const result = (response as { result: string }).result;

      if (result) {
        editor?.commands.insertContent(result);
        form.reset();
      } else {
        toast.error("No content generated");
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      const errorMessage =
        (axiosError.response?.data as { error?: string })?.error ||
        axiosError.message;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setClose();
    }
  };

  const fileDocument = form.watch("file") as File | undefined;

  return (
    <div className="w-full bg-white flex flex-col justify-center rounded-md py-4">
      <div className="font-bold flex-col text-lg md:tex-2xl min-h-[150px] text-primary flex items-center justify-center">
        <Image src={"/eduGen-Logo.png"} alt="logo" width={30} height={30} />
        Hai {firstname}, There is something I can help?
      </div>
      {fileDocument && (
        <div className=" text-xs border bg-white drop-shadow-sm border-primary text-primary my-2 ml-8 flex gap-x-1 p-1 rounded-md w-fit">
          <DocFile className="w-4 h-4" /> {fileDocument.name || "no name"}
        </div>
      )}
      <Form {...form}>
        <div className="flex-flex-col gap-y-1 w-11/12 mx-auto bg-white drop-shadow-md  items-center border rounded-full ">
          <form
            className="flex mx-2 py-2 gap-x-1 items-center justify-between"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      ref={inputRef}
                      type="file"
                      className="hidden"
                      name="file"
                      accept=".pdf,.docx"
                      onChange={(e) =>
                        field.onChange(
                          e.target.files ? e.target.files[0] : null
                        )
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div
              onClick={() => inputRef.current?.click()}
              className="h-10 flex w-10 items-center justify-center rounded-full text-primary cursor-pointer hover:bg-primary/80 hover:text-white transition-colors"
            >
              <Plus />
            </div>
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="w-10/12">
                  <FormControl className="w-full">
                    <Textarea
                      className="w-full bg-transparent overflow-y [&::-webkit-scrollbar]:hidden scrollbar-none border-none shadow-none resize-none px-1"
                      rows={1}
                      {...field}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        const maxHeight = 150;
                        target.style.height = `${Math.min(
                          target.scrollHeight,
                          maxHeight
                        )}px`;
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="h-10 flex w-10 items-center justify-center rounded-full text-primary cursor-pointer hover:bg-primary/80 hover:text-white transition-color disabled:text-white disabled:bg-primary/80"
            >
              {isLoading ? (
                <LoaderCircle className="w-4 h-4 -rotate-90 animate-spin" />
              ) : (
                <SendHorizonal className="w-4 h-4 -rotate-90" />
              )}
            </button>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default AiModal;
