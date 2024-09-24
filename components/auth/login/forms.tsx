import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  StackProps,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import LogoIcon from "@/app/icons/logo";
import { Link } from "@chakra-ui/next-js";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { url } from "@/lib/helpers";
import { AuthResponseType } from "@/types/auth";
import { IUser } from "@/models/User";
import { useRouter } from "next/navigation";

type FormValueTypes = {
  email: string;
  password: string;
};

export const LogInForm = (props: StackProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const toast = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValueTypes>();

  const onSubmit = async (data: FormValueTypes) => {
    const res = await fetch(`${url}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const { message, token, status, user } = (await res.json()) as AuthResponseType<Partial<IUser>>;

    toast({
      title: message,
      status: status,
      duration: 3000,
      position: "top-right",
    });
    if (status === "success" && user?.is_verified) {
      router.push("/dashboard");
    } else if (status === "success" && !user?.is_verified) {
      router.push("/verify");
    }
    localStorage.setItem("e_token", token!);
  };

  return (
    <Stack spacing="8" {...props}>
      <Stack spacing="6">
        <Box display={{ md: "none" }} w={"max-content"} mx={"auto"}>
          <LogoIcon width={"200px"} />
        </Box>
        <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
          <Heading size={{ base: "md", md: "lg" }}>Sigin to your account</Heading>
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
            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup display={"flex-"}>
                <InputRightElement>
                  <IconButton
                    variant="link"
                    aria-label={isOpen ? "Mask password" : "Reveal password"}
                    icon={isOpen ? <HiEyeOff /> : <HiEye />}
                    onClick={onToggle}
                  />
                </InputRightElement>
                <Input
                  id="password"
                  type={isOpen ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="*******"
                  border="1px solid rgba(0,0,0,0.2)"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
              </InputGroup>
              {errors.password && <FormErrorMessage fontSize="sm">{errors.password.message}</FormErrorMessage>}
            </FormControl>
          </Stack>
          <HStack justify="space-between">
            <Button as={Link} href={"reset-password"} variant="text" color={"brand.primary"} size="sm">
              Forgot password
            </Button>
          </HStack>
          <Stack spacing="4">
            <Button
              bgColor={"brand.primary"}
              _hover={{ opacity: 0.7 }}
              _focus={{ opacity: 0.7 }}
              type="submit"
              color={"white"}
              isLoading={isSubmitting}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};
