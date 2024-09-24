import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  StackProps,
  Text,
} from "@chakra-ui/react";
import LogoIcon from "@/app/icons/logo";
import { Link } from "@chakra-ui/next-js";
import { useForm } from "react-hook-form";

type FormValueTypes = {
  email: string;
};

export const LogInForm = (props: StackProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValueTypes>();

  const onSubmit = (data: FormValueTypes) => {
    console.log(data);
  };

  return (
    <Stack spacing="8" {...props}>
      <Stack spacing="6">
        <Box display={{ md: "none" }} w={"max-content"} mx={"auto"}>
          <LogoIcon width={"200px"} />
        </Box>
        <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
          <Heading size={{ base: "md", md: "lg" }}>Reset your password</Heading>
          <Text color="fg.muted">
            Don't have an account?{" "}
            <Link href="/signup" color={"brand.primary"}>
              Signup
            </Link>
          </Text>
        </Stack>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter your email"
                type="email"
              />
              {errors.email && <FormErrorMessage fontSize="sm">{errors.email.message}</FormErrorMessage>}
            </FormControl>
          </Stack>
          <Stack spacing="4">
            <Button
              bgColor={"brand.primary"}
              _hover={{ opacity: 0.7 }}
              _focus={{ opacity: 0.7 }}
              type="submit"
              color={"white"}
              isLoading={isSubmitting}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};
