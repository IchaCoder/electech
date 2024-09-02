"use client";
import { AddEventRequest } from "@/app/actions/event/add";
import { DatePicker } from "@/components/ui/date-picker";
import { getTokenFromLocalStorage } from "@/lib/helpers";
import { IEvent } from "@/models/Event";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

type FormValueTypes = {
  title: string;
  start_date: Date;
  start_time: string;
  due_date: Date;
  due_time: string;
  is_lock_event: boolean;
  org_domain: string;
};

const AddEvent = (props: Props) => {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    setError,
    clearErrors,
    reset,
  } = useForm<FormValueTypes>({ defaultValues: { is_lock_event: false } });

  const [start_date, due_date, is_lock_event] = watch(["start_date", "due_date", "is_lock_event"]);

  const onSubmit = async (data: FormValueTypes) => {
    const token = getTokenFromLocalStorage();
    const { message, status } = await AddEventRequest(data as unknown as IEvent, token!);
    toast({
      title: message,
      status: status,
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
    if (status === "success") {
      reset();
    }
  };

  return (
    <Box py={8} px={{ base: 0, sm: 4, xl: 12 }}>
      <Text fontWeight={"bold"} fontSize={{ base: "xl", md: "2xl", lg: "4xl" }}>
        Add Event
      </Text>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!start_date) {
            setError("start_date", {
              type: "manual",
              message: "Start date is required",
            });
          }
          if (!due_date) {
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
            <DatePicker date={start_date} label="start_date" setValue={setValue} clearErrors={clearErrors} />
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
            <DatePicker date={due_date} label="due_date" setValue={setValue} clearErrors={clearErrors} />
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
        <Stack gap={{ base: 2, md: 4 }}>
          <FormControl isInvalid={!!errors.is_lock_event} mt={{ base: 4, md: 8 }}>
            <Checkbox {...register("is_lock_event")} border={"black"} size={"sm"} defaultChecked={is_lock_event}>
              Lock this event to organization
            </Checkbox>
            <FormHelperText mt={0}>
              Locking this event means this event can only be accessed by people in your organization
            </FormHelperText>
            {errors?.is_lock_event && <FormErrorMessage>{errors?.is_lock_event?.message}.</FormErrorMessage>}
          </FormControl>
          {is_lock_event && (
            <FormControl isInvalid={!!errors.org_domain}>
              <FormLabel>Organization domain</FormLabel>
              <Input
                type="text"
                size={"md"}
                maxW={"400px"}
                bgColor={"hsl(0 0% 100%)"}
                placeholder="eg; @st.ug.edu.gh"
                {...register("org_domain", {
                  required: "Domain is required",
                })}
              />
              {errors?.org_domain && <FormErrorMessage>{errors?.org_domain?.message}.</FormErrorMessage>}
              <FormHelperText mt={0}>Only voters with this domain will be able to access this event</FormHelperText>
            </FormControl>
          )}
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
          Add Event
        </Button>
      </form>
    </Box>
  );
};

export default AddEvent;
