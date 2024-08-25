"use client";
import { Box, Text, Stack, ButtonGroup, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import CountDown from "../dashboard/home/count-down-timer/count-down";
import CustomRadio from "./card-group";
import { ConfirmVoteModal } from "./confirm-vote";

type Props = {};

const Voting = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {isOpen && <ConfirmVoteModal isOpen={isOpen} onClose={onClose} />}
      <Box bgColor={"brand.primary"} minH={"100vh"} py={10}>
        <Box maxW={"1000px"} mx={"auto"} px={{ base: 4, sm: 8 }} py={12} bgColor={"#f4f4f4"} rounded={"2xl"}>
          <Text fontWeight={"bold"} fontSize={{ base: "xl", lg: "3xl" }}>
            UG SRC General Elections - 2024
          </Text>
          <Stack flexDir={"row"} gap={10}>
            <Stack>
              <Text fontSize={"lg"} fontWeight={"bold"}>
                Start Date
              </Text>
              <Text>9th June 2024 - 09:00 AM</Text>
            </Stack>
            <Stack>
              <Text fontSize={"lg"} fontWeight={"bold"}>
                Due Date
              </Text>
              <Text>9th June 2024 - 07:00 AM</Text>
            </Stack>
          </Stack>
          <CountDown />
          <Stack spacing={4}>
            <Stack bgColor={"rgba(155, 214, 232, 0.5)"} py={8} gap={8} px={{ base: 2, sm: 4, xl: 12 }} rounded={"xl"}>
              <Text fontSize={"xl"} fontWeight={"medium"}>
                SRC President
              </Text>
              <Stack mt={8} borderColor={"black"}>
                <CustomRadio />
              </Stack>
            </Stack>
            <Stack bgColor={"rgba(155, 214, 232, 0.5)"} py={8} gap={8} px={{ base: 2, sm: 4, xl: 12 }} rounded={"xl"}>
              <Text fontSize={"xl"} fontWeight={"medium"}>
                SRC General Secretary
              </Text>
              <Stack mt={8} borderColor={"black"}>
                <CustomRadio />
              </Stack>
            </Stack>
          </Stack>
          <ButtonGroup mt={8}>
            <Button colorScheme="red" size={"lg"}>
              Go to Home
            </Button>
            <Button colorScheme="blue" size={"lg"} onClick={onOpen}>
              Submit
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </>
  );
};

export default Voting;
