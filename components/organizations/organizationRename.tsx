"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFetch } from "@/hooks/use-fetch";
import { OrganizationType } from "@/lib/types";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { DialogClose } from "../ui/dialog";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

const OrganizationRename = ({ orgId }: { orgId: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { data, isLoading } = useFetch<OrganizationType>(
    ["orgName", orgId],
    `/api/organization/${orgId}`
  );

  const { mutate } = useApiMutation("patch", `/api/organization/${orgId}`);

  useEffect(() => {
    if (data?.name) {
      form.reset({ name: data.name });
    }
  }, [data, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const data = { name: values.name };
    mutate({ payload: data });

    toast.success("Organization renamed");
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center ">
        <LoaderCircle className="w-5 h-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full h-full flex flex-col justify-between"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-primary">
                Organization name
              </FormLabel>
              <FormControl>
                <Input placeholder="Organization name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-x-2 self-end">
          <Button
            className="bg-blue-900 hover:bg-blue-950 items-end"
            type="submit"
          >
            Save
          </Button>
          <DialogClose
            type="button"
            className="border border-blue-900 px-2 rounded-md text-sm text-blue-900 hover:bg-black/10"
          >
            Cancel
          </DialogClose>
        </div>
      </form>
    </Form>
  );
};

export default OrganizationRename;
