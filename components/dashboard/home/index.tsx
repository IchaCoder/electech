"use client";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import CountDown from "./count-down-timer/count-down";
import { Stats } from "./stats";

type Props = {};

const Home = (props: Props) => {
  return (
    <Box py={8} px={{ base: 0, sm: 4, xl: 12 }}>
      <Text fontWeight={"bold"} fontSize={{ base: "xl", lg: "3xl" }}>
        UG SRC General Elections
      </Text>
      <CountDown />
      <Stats />
    </Box>
  );
};

export default Home;
