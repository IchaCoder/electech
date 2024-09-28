"use client";
import {
  Box,
  Button,
  Heading,
  Stack,
  HStack,
  StackProps,
  Text,
  PinInput,
  PinInputField,
  useToast,
} from "@chakra-ui/react";
import LogoIcon from "@/app/icons/logo";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmOtp from "@/app/actions/otp/confirm-otp";
import { VerifyAccount } from "@/app/actions/auth/verify-account";
import { useUser } from "@/context/user.context";

export const Verify = (props: StackProps) => {
  const router = useRouter();
  const [otp, setOpt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUser();

  const toast = useToast();

  const onSubmit = async () => {
    setIsLoading(true);
    const { status, message } = await ConfirmOtp({ otp, id: user?._id! });

    if (status === "success") {
      const { status, message } = await VerifyAccount(user?.email!);
      toast({
        title: status === "success" ? "Success" : "Error",
        description: message,
        status: status === "success" ? "success" : "error",
        duration: 3000,
        isClosable: true,
      });
      router.push("/dashboard");
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  return (
    <Stack maxW={"500px"} mx={"auto"} height={"100vh"} justifyContent={"center"} {...props}>
      <Stack spacing="8" alignItems={"center"}>
        <Stack spacing="6">
          <Box display={{ md: "none" }} w={"max-content"} mx={"auto"}>
            <LogoIcon width={"150px"} />
          </Box>
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "md", md: "lg" }}>Verify your account</Heading>
            <Text color="fg.muted">
              An OTP has been sent to {user?.email}, please verify to continue using Electech
            </Text>
          </Stack>
        </Stack>

        <Stack spacing="6">
          <HStack>
            <PinInput type="alphanumeric" onChange={(e) => setOpt(e)}>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          <Button
            bgColor={"brand.primary"}
            _hover={{ opacity: 0.7 }}
            _focus={{ opacity: 0.7 }}
            type="submit"
            color={"white"}
            isLoading={isLoading}
            onClick={onSubmit}
          >
            Submit
          </Button>
          {/* <Text textAlign={"center"} cursor={"pointer"}>
            OTP not received?{" "}
            <Button variant={"link"} color={"brand.primary"} onClick={() => setContactType("email")}>
              Use Email
            </Button>
          </Text> */}
          <Button
            colorScheme="blue"
            variant={"outline"}
            _hover={{ opacity: 0.7 }}
            _focus={{ opacity: 0.7 }}
            type="submit"
            onClick={() => router.push("/")}
          >
            Go Home
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
