"use client";
import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";
import CountDown from "./count-down-timer/count-down";
import { Stats } from "./stats";

type Props = {};

const Home = (props: Props) => {
  return (
    <Box py={8} px={{ base: 0, sm: 4, xl: 12 }}>
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
      <Stats />
    </Box>
  );
};

export default Home;
