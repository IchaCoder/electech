"use client";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

type FormValueTypes = {
  first_name: string;
  middle_name: string;
  last_name: string;
  imgUrl: string;
};

const AddCategory = (props: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<FormValueTypes>();

  return (
    <Box py={8} px={{ base: 0, sm: 4, xl: 12 }}>
      <Text fontWeight={"bold"} fontSize={{ base: "xl", md: "2xl", lg: "4xl" }}>
        Add Category
      </Text>
      <form></form>
    </Box>
  );
};

export default AddCategory;
