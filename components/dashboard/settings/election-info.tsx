import { UpdateEvent } from "@/app/actions/event/update";
import { DatePicker } from "@/components/ui/date-picker";
import { IEvent } from "@/models/Event";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {
  event: IEvent;
};

type DurationValueTypes = {
  title: string;
  start_date: string;
  start_time: string;
  due_date: string;
  due_time: string;
  is_lock_event: boolean;
  org_domain: string;
};

const ElectionInfo = ({ event }: Props) => {
  const router = useRouter();
  const toast = useToast();
  const {
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    register,
    setError,
  } = useForm<DurationValueTypes>();

  const watchValues = watch();

  const onSubmit = async (data: DurationValueTypes) => {
    const formData = data as unknown as Partial<IEvent>;
    const { message, status } = await UpdateEvent(formData, event._id!);
    toast({
      title: status === "success" ? "Success" : "Error",
      description: message,
      status: status,
      duration: 5000,
      position: "top-right",
    });
    router.refresh();
  };

  useEffect(() => {
    setValue("title", event.title);
    setValue("start_date", event.start_date);
    setValue("start_time", event.start_time);
    setValue("due_date", event.due_date);
    setValue("due_time", event.due_time);
  }, [event]);

  return (
    <Stack shadow={"md"} p={{ base: 4, sm: 8 }} mt={8} rounded={"lg"} bgColor={"white"}>
      <Box>
        <Text fontWeight={"bold"} fontSize={{ base: "xl", md: "2xl" }}>
          Election Information
        </Text>
        <Text color={"gray.600"} fontSize={"sm"}>
          Manage the time and title of election
        </Text>
      </Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!watchValues.start_date) {
            setError("start_date", {
              type: "manual",
              message: "Start date is required",
            });
          }
          if (!watchValues.due_date) {
            setError("due_date", {
              type: "manual",
              message: "Due date is required",
            });
          }
          handleSubmit(onSubmit)();
        }}
      >
        <Stack mt={8} gap={{ base: 4, md: 8 }} display={"grid"} gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel>Event Title</FormLabel>
            <Input
              type="text"
              size={"lg"}
              bgColor={"hsl(0 0% 100%)"}
              placeholder="Enter event title"
              {...register("title", {
                required: "Title is required",
              })}
            />
            {errors?.title && <FormErrorMessage>{errors?.title?.message}.</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.start_date}>
            <FormLabel>Start Date</FormLabel>
            <DatePicker
              date={watchValues?.start_date}
              label="start_date"
              setValue={setValue}
              clearErrors={clearErrors}
            />
            {errors?.start_date && <FormErrorMessage>{errors?.start_date?.message}.</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.start_time}>
            <FormLabel>Start Time</FormLabel>
            <Input
              type="time"
              bgColor={"hsl(0 0% 100%)"}
              size={"lg"}
              {...register("start_time", {
                required: "Time is required",
              })}
            />
            {errors?.start_time && <FormErrorMessage>{errors?.start_time?.message}.</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.due_date}>
            <FormLabel>Due Date</FormLabel>
            <DatePicker date={watchValues?.due_date} label="due_date" setValue={setValue} clearErrors={clearErrors} />
            {errors?.due_date && <FormErrorMessage>{errors?.due_date?.message}.</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.due_time}>
            <FormLabel>Due Time</FormLabel>
            <Input
              type="time"
              bgColor={"hsl(0 0% 100%)"}
              size={"lg"}
              {...register("due_time", {
                required: "Time is required",
              })}
            />
            {errors?.due_time && <FormErrorMessage>{errors?.due_time?.message}.</FormErrorMessage>}
          </FormControl>
        </Stack>
        <Button
          type="submit"
          isLoading={isSubmitting}
          bgColor={"rgba(97, 153, 203, 1)"}
          color={"white"}
          _hover={{ opacity: 0.7 }}
          _focus={{ opacity: 0.7 }}
          mt={8}
        >
          Save Changes
        </Button>
      </form>
    </Stack>
  );
};

export default ElectionInfo;
