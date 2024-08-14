"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UseFormClearErrors, UseFormSetValue } from "react-hook-form";

type FormValueTypes = {
  title: string;
  start_date: Date;
  start_time: string;
  due_date: Date;
  due_time: string;
  is_lock_event: boolean;
  org_domain: string;
};

type Props = {
  date: Date | undefined;
  setValue: UseFormSetValue<FormValueTypes>;
  label: keyof FormValueTypes;
  clearErrors: UseFormClearErrors<FormValueTypes>;
};

export function DatePicker({ label, date, setValue, clearErrors }: Props) {
  const onSelect = (date: Date | undefined) => {
    setValue(label, date?.toISOString()!);
    clearErrors(label);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal py-[1.45rem]", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={onSelect} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
