"use client";
import { Box, Button, Heading, Stack, HStack, StackProps, Text, PinInput, PinInputField } from "@chakra-ui/react";
import LogoIcon from "@/app/icons/logo";
import { useRouter } from "next/navigation";
type FormValueTypes = {
  email: string;
};

export const Verify = (props: StackProps) => {
  const router = useRouter();

  const onSubmit = (data: FormValueTypes) => {
    console.log(data);
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
            <Text color="fg.muted">An OTP has been sent to your email, please verify to continue using Electech</Text>
          </Stack>
        </Stack>

        <Stack spacing="6">
          <HStack>
            <PinInput type="alphanumeric">
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
            // isLoading={isSubmitting}
          >
            Submit
          </Button>
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
