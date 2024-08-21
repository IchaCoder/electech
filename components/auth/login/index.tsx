"use client";
import {
  Avatar,
  AvatarGroup,
  Box,
  Center,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { LogInForm } from "./forms";
import LogoIcon from "@/app/icons/logo";

const Login = () => (
  <Flex
    minH={{ base: "auto", md: "100vh" }}
    bgGradient={{
      md: "linear(to-r, bg.accent.default 50%, bg.surface 50%)",
    }}
  >
    <Flex width="full">
      <Box flex="1" bgColor={"brand.primary"} color={"white"} display={{ base: "none", md: "block" }}>
        <Flex direction="column" px={{ base: "4", md: "8" }} height="full" color="fg.accent.default">
          <Flex align="center" h="24">
            <LogoIcon width={"200px"} fill="#fff" />
          </Flex>
          <Flex flex="1" align="center">
            <Stack spacing="8">
              <Stack spacing="6">
                <Heading size={{ md: "xl", xl: "2xl" }}>Start organizing your polls with us</Heading>
                <Text fontSize="lg" maxW="md" fontWeight="medium">
                  Welcome back to electech, Sign into your account
                </Text>
              </Stack>
              <HStack spacing="4">
                <AvatarGroup size="md" max={useBreakpointValue({ base: 2, lg: 5 })} borderColor="fg.accent.default">
                  <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
                  <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
                  <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
                  <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
                  <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
                </AvatarGroup>
                <Text fontWeight="medium">Join 10.000+ users</Text>
              </HStack>
            </Stack>
          </Flex>
          <Flex align="center" h="24">
            <Text color="fg.accent.subtle" textStyle="sm">
              © 2022 Electech. All rights reserved.
            </Text>
          </Flex>
        </Flex>
      </Box>
      <Center flex="1">
        <LogInForm px={{ base: "4", md: "8" }} py={12} width="full" maxW="md" />
      </Center>
    </Flex>
  </Flex>
);

export default Login;
