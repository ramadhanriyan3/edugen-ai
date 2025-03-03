"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomFormField, {
  FormFieldType,
} from "@/components/form/customFormField";
import {
  difficullity,
  fieldOptions,
  gradeOptions,
  languages,
  numberOfQuestion,
  questionTypes,
} from "@/lib/constant";

const formSchema = z.object({
  topic: z.string().min(4, { message: "at least have 4 character" }),
  field: z.string(),
  numberOfQuestion: z.string(),
  questionType: z.string(),
  studentGrade: z.string(),
  lowestDifficullity: z.string(),
  highestDifficullity: z.string(),
  questionLanguage: z.string(),
});

const ExamGenerateForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      field: "",
      numberOfQuestion: "",
      studentGrade: "",
      questionType: "",
      lowestDifficullity: "",
      highestDifficullity: "",
      questionLanguage: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    alert("ga kena tah");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col w-fit gap-4 bg-white p-3 md:p-5 rounded-md drop-shadow-md shadow-lg"
      >
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <div className="flex items-center gap-x-2 justify-between sm:flex-row gap-y-1 w-full">
            <CustomFormField
              fieldType={FormFieldType.Input}
              name="topic"
              placeholder="Type a topic"
              control={form.control}
              label="Topic"
            />
            <CustomFormField
              fieldType={FormFieldType.Combobox}
              placeholder="Select a field"
              selectOptions={fieldOptions}
              control={form.control}
              label="Field"
              name="field"
              setValue={form.setValue}
            />
          </div>

          <div className="flex items-center gap-x-2 justify-between sm:flex-row gap-y-1 w-full">
            <CustomFormField
              fieldType={FormFieldType.Select}
              placeholder="Select a type"
              selectOptions={questionTypes}
              control={form.control}
              label="Question type"
              name="questionType"
            />

            <CustomFormField
              fieldType={FormFieldType.Select}
              placeholder="Select grade"
              selectOptions={gradeOptions}
              control={form.control}
              label="Student a grade"
              name="studentGrade"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <div className="flex items-center gap-x-2 justify-between sm:flex-row gap-y-1 w-full">
            <CustomFormField
              fieldType={FormFieldType.Select}
              placeholder="Select a difficullity"
              selectOptions={difficullity}
              control={form.control}
              label="Lowest difficullity"
              name="lowestDifficullity"
            />

            <CustomFormField
              fieldType={FormFieldType.Select}
              placeholder="Select a difficullity"
              selectOptions={difficullity}
              control={form.control}
              label="Highest difficullity"
              name="highestDifficullity"
            />
          </div>

          <div className="flex items-center gap-x-2 justify-between sm:flex-row gap-y-1 w-full">
            <CustomFormField
              fieldType={FormFieldType.Select}
              placeholder="Number of question"
              selectOptions={numberOfQuestion}
              control={form.control}
              label="Number of question"
              name="numberOfQuestion"
            />

            <CustomFormField
              fieldType={FormFieldType.Select}
              placeholder="Select a language"
              selectOptions={languages}
              control={form.control}
              label="Question language"
              name="questionLanguage"
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground"
        >
          Generate Exam
        </Button>
      </form>
    </Form>
  );
};

export default ExamGenerateForm;
