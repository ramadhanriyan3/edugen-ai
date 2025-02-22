/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Control } from "react-hook-form";
import { ReactNode, useState } from "react";

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
} from "@/components/ui/select";
import Image from "next/image";
import { Eye, EyeClosed } from "lucide-react";

export enum FormFieldType {
  Select = "SELECT",
  Input = "INPUT",
  Password = "PASSWORD",
  InputNumber = "INPUT_NUMBER",
}

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
  children?: ReactNode;
}

const RenderField = ({
  field,
  props,
}: {
  field: any;
  props: CustomPropsField;
}) => {
  const { fieldType, name, label, placeholder, iconSrc, iconAlt, dateFormat } =
    props;

  const [isShow, setIsShow] = useState(false);

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
              className="border-0 appearance-none focus:outline-none"
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
              className="border-0 appearance-none focus:outline-none"
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
  }
};

const CustomFormField = (props: CustomPropsField) => {
  const { control, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel>{label}</FormLabel>
          <RenderField field={field} props={props} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
