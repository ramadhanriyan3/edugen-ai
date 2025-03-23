/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Control, UseFormSetValue } from "react-hook-form";
import { ReactNode, useState } from "react";
import Image from "next/image";
import { Check, ChevronsUpDown, Eye, EyeClosed } from "lucide-react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export enum FormFieldType {
  Select = "SELECT",
  Input = "INPUT",
  Password = "PASSWORD",
  InputNumber = "INPUT_NUMBER",
  Combobox = "COMBOBOX",
}

type SelectOptions = {
  id: string;
  label: string;
  value: string;
};

interface CustomPropsField {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  inputType?: string;
  dateFormat?: string;
  selectOptions?: SelectOptions[];
  children?: ReactNode;
  setValue?: UseFormSetValue<{
    field: string;
    studentGrade: string;
    topic: string;
    questionType: string;
    lowestDifficulty: string;
    highestDifficulty: string;
    numberOfQuestion: string;
    questionLanguage: string;
  }>;
}

const RenderField = ({
  field,
  props,
}: {
  field: any;
  props: CustomPropsField;
}) => {
  const {
    fieldType,
    name,
    placeholder,
    iconSrc,
    iconAlt,
    selectOptions,
    setValue,
  } = props;

  const [isShow, setIsShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  switch (fieldType) {
    case "INPUT":
      return (
        <div className="pl-1 flex rounded-md border focus-within:border-primary border-slate-400 items-center">
          {iconSrc && (
            <Image
              alt={iconAlt || "icon"}
              src={iconSrc}
              width={24}
              height={24}
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="border-0 appearance-none focus:outline-none placeholder:text-xs sm:placeholder:text-sm"
            />
          </FormControl>
        </div>
      );

    case "PASSWORD":
      return (
        <div className="px-1 flex rounded-md border focus-within:border-primary border-slate-400 items-center">
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              type={isShow ? "text" : "password"}
              className="border-0 appearance-none focus:outline-none placeholder:text-xs sm:placeholder:text-sm"
            />
          </FormControl>
          {isShow ? (
            <Eye
              className="w-6 h-6 text-primary cursor-pointer"
              onClick={() => setIsShow(false)}
            />
          ) : (
            <EyeClosed
              className="w-6 h-6 text-primary cursor-pointer"
              onClick={() => setIsShow(true)}
            />
          )}
        </div>
      );

    case "SELECT":
      return (
        <div className="px-1 flex rounded-md border focus-within:border-primary border-slate-400 items-center">
          <Select
            onValueChange={field.onChange}
            value={field.value}
            name={name}
          >
            <FormControl>
              <SelectTrigger className="border-0 text-xs sm:text-sm ">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                {selectOptions!.map((option) => (
                  <SelectItem
                    key={option.id}
                    value={option.value}
                    className="text-xs sm:text-sm"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      );

    case "COMBOBOX":
      return (
        <div className="px-1 flex rounded-md border focus-within:border-primary border-slate-400 items-center">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="ghost"
                  role="combobox"
                  className={cn(
                    "w-full pr-2 flex items-center overflow-hidden justify-between hover:bg-transparent text-xs sm:text-sm",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <p className="w-[85%] overflow-hidden text-start">
                    {field.value
                      ? selectOptions!.find(
                          (option) => option.value === field.value
                        )?.label
                      : "Select field"}
                  </p>
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search field..."
                  className="h-9 text-xs sm:text-sm"
                />
                <CommandList>
                  <CommandEmpty className="text-xs sm:text-sm p-1 sm:p-2 ">
                    No field found.
                  </CommandEmpty>
                  <CommandGroup>
                    {selectOptions!.map((option) => (
                      <CommandItem
                        className="text-xs sm:text-sm"
                        value={option.value}
                        key={option.value}
                        onSelect={() => {
                          setValue!("field", option.value);
                          setIsOpen(false);
                        }}
                      >
                        {option.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            option.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      );
  }
};

const CustomFormField = (props: CustomPropsField) => {
  const { control, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1 min-w-20 ">
          <FormLabel className="text-xs sm:text-sm w-[100px]">
            {label}
          </FormLabel>
          <RenderField field={field} props={props} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
