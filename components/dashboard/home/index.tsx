"use client";
import { Box, Button, Stack, Text, Tooltip, useToast } from "@chakra-ui/react";
import React from "react";
import CountDown from "./count-down-timer/count-down";
import { Stats } from "./stats";
import { FaRegCopy } from "react-icons/fa6";

type Props = {};

const Home = (props: Props) => {
  const toast = useToast();

  return (
    <Box py={8} px={{ base: 0, sm: 4, xl: 12 }}>
      <Stack flexDir={"row"} justifyContent={"space-between"}>
        <Text fontWeight={"bold"} fontSize={{ base: "xl", lg: "3xl" }}>
          UG SRC General Elections - 2024
        </Text>
        <Tooltip hasArrow label="Copy link to share to voters" bg="gray.600">
          <Button
            variant={"outline"}
            _hover={{ backgroundColor: "blue.400", color: "white" }}
            rightIcon={<FaRegCopy />}
            colorScheme="blue"
            onClick={() =>
              toast({
                title: "Link Copied Successfully",
                status: "info",
                duration: 3000,
                position: "top-right",
              })
            }
          >
            Copy
          </Button>
        </Tooltip>
      </Stack>
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
