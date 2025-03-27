"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomFormField, {
  FormFieldType,
} from "@/components/form/customFormField";
import {
  difficulty,
  fieldOptions,
  gradeOptions,
  languages,
  numberOfQuestion,
  questionTypes,
} from "@/lib/constant";
import { Dispatch, SetStateAction, useState } from "react";
import { getQuestionMarkdown } from "@/lib/getQuestionsNode";
import { getOutput } from "@/app/actions/ai.action";
import { createExam } from "@/app/actions/exam.action";
import { createQuestion } from "@/app/actions/question.action";
import { useExamFormStore } from "@/lib/store/generatorFormStore";
import {
  AlertDialogTitle,
  AlertDialog,
  AlertDialogContent,
} from "../ui/alert-dialog";

const formSchema = z.object({
  topic: z.string().min(4, { message: "at least have 4 character" }),
  field: z.string(),
  numberOfQuestion: z.string(),
  questionType: z.string(),
  studentGrade: z.string(),
  lowestDifficulty: z.string(),
  highestDifficulty: z.string(),
  questionLanguage: z.string(),
});

type ExamGenerateFormProps = {
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setLastQuestion?: Dispatch<SetStateAction<string>>;
};

const ExamGenerateForm = ({
  setIsOpen,
  setLastQuestion,
}: ExamGenerateFormProps) => {
  const router = useRouter();

  const pathname = usePathname();
  const examId = pathname.split("/")[2];

  const { generateStatus, updateGenerateStatus } = useExamFormStore();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      field: "",
      numberOfQuestion: "",
      studentGrade: "",
      questionType: "",
      lowestDifficulty: "",
      highestDifficulty: "",
      questionLanguage: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (setIsOpen && setLastQuestion) {
        setIsOpen(false);
        updateGenerateStatus(true);
        const questionOutput = await getOutput(values);
        const questionText = getQuestionMarkdown(questionOutput);
        setLastQuestion(questionText);
        await createQuestion(examId, questionText);
        updateGenerateStatus(false);
      } else {
        updateGenerateStatus(true);
        const questionOutput = await getOutput(values);
        const questionText = getQuestionMarkdown(questionOutput);
        const newExam = await createExam(`${values.topic} questions`);
        await createQuestion(newExam!.id, questionText);
        updateGenerateStatus(false);
        router.push(`/e/${newExam!.id}`);
      }
    } catch (error) {
      console.log(error);
      setIsAlertOpen(true);
      setTimeout(() => {
        setIsAlertOpen(false);
      }, 3000);
      updateGenerateStatus(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col w-fit gap-4 bg-white p-3 md:p-5 rounded-md drop-shadow-md shadow-lg"
      >
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <div className="flex items-center gap-x-2 justify-between sm:flex-row gap-y-1 w-full lg:w-1/2">
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

          <div className="flex items-center gap-x-2 justify-between sm:flex-row gap-y-1 w-full lg:w-1/2">
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
          <div className="flex items-center gap-x-2 justify-between sm:flex-row gap-y-1 w-full lg:w-1/2">
            <CustomFormField
              fieldType={FormFieldType.Select}
              placeholder="Select a Difficulty"
              selectOptions={difficulty}
              control={form.control}
              label="Lowest Difficulty"
              name="lowestDifficulty"
            />

            <CustomFormField
              fieldType={FormFieldType.Select}
              placeholder="Select a Difficulty"
              selectOptions={difficulty}
              control={form.control}
              label="Highest Difficulty"
              name="highestDifficulty"
            />
          </div>

          <div className="flex items-center gap-x-2 justify-between sm:flex-row gap-y-1 w-full lg:w-1/2">
            <CustomFormField
              fieldType={FormFieldType.Select}
              placeholder="Select a number"
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
          disabled={generateStatus}
          type="submit"
          className={`w-full bg-primary text-primary-foreground`}
        >
          {!generateStatus ? (
            "Generate Exam"
          ) : (
            <p className={` ${generateStatus && "animate-pulse"}`}>
              Generating...
            </p>
          )}
        </Button>
      </form>
      <AlertDialog open={isAlertOpen}>
        <AlertDialogContent className="flex flex-col w-full max-w-80">
          <AlertDialogTitle></AlertDialogTitle>
          <div className="flex flex-col w-full items-center">
            <Image
              src="/planet.png"
              width={150}
              height={150}
              alt="rocket-icon"
            />
            <p className="text-primary">
              Failed to generate exam. Please try again.
            </p>
            <a
              href="https://www.flaticon.com/free-icons/something-went-wrong"
              className="text-[8px] self-end"
              title="something went wrong icons"
            >
              icons created by andinur - Flaticon
            </a>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  );
};

export default ExamGenerateForm;
