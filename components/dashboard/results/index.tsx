"use client";

import { Box, HStack, Stack, Text, Select, SelectProps, useColorModeValue } from "@chakra-ui/react";
import { sortByOptions, viewOptions } from "./data";
import View from "./view";
import { useState } from "react";

interface Props extends SelectProps {}

type ViewTypes = "block" | "chart" | "table";

const Results = (props: Props) => {
  const [view, setView] = useState<ViewTypes>("block");

  return (
    <Box py={8} px={{ base: 0, sm: 4, xl: 12 }}>
      <Text fontWeight={"bold"} fontSize={{ base: "xl", md: "2xl", lg: "4xl" }}>
        Results
      </Text>
      <Stack mt={8} gap={8}>
        <Box>
          <Stack spacing={4} direction={{ base: "column", sm: "row" }} justifyContent={"flex-start"} mb={3}>
            <Text fontSize={{ base: "md", sm: "xl" }} fontWeight={"medium"}>
              SRC President
            </Text>
            <HStack spacing={4}>
              {view === "table" && (
                <Select
                  size="xs"
                  width={"max-content"}
                  aria-label="Sort by"
                  defaultValue={sortByOptions.defaultValue}
                  focusBorderColor={useColorModeValue("blue.500", "blue.200")}
                  rounded="md"
                  borderWidth={1}
                  borderColor={"gray.800"}
                  {...props}
                >
                  {sortByOptions.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              )}
              <Select
                size="xs"
                width={"max-content"}
                aria-label="Sort by"
                defaultValue={view}
                focusBorderColor={useColorModeValue("blue.500", "blue.200")}
                rounded="md"
                borderWidth={1}
                borderColor={"gray.800"}
                onChange={(e) => setView(e.target.value as ViewTypes)}
                {...props}
              >
                {viewOptions.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </HStack>
          </Stack>
          <View view={view} />
        </Box>
        <Box>
          <Stack spacing={4} direction={{ base: "column", sm: "row" }} justifyContent={"flex-start"} mb={3}>
            <Text fontSize={{ base: "md", sm: "xl" }} fontWeight={"medium"}>
              SRC President
            </Text>
            <HStack spacing={4}>
              {view === "table" && (
                <Select
                  size="xs"
                  width={"max-content"}
                  aria-label="Sort by"
                  defaultValue={sortByOptions.defaultValue}
                  focusBorderColor={useColorModeValue("blue.500", "blue.200")}
                  rounded="md"
                  borderWidth={1}
                  borderColor={"gray.800"}
                  {...props}
                >
                  {sortByOptions.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              )}
              <Select
                size="xs"
                width={"max-content"}
                aria-label="Sort by"
                defaultValue={view}
                focusBorderColor={useColorModeValue("blue.500", "blue.200")}
                rounded="md"
                borderWidth={1}
                borderColor={"gray.800"}
                onChange={(e) => setView(e.target.value as ViewTypes)}
                {...props}
              >
                {viewOptions.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </HStack>
          </Stack>
          <View view={view} />
        </Box>
      </Stack>
    </Box>
  );
};

export default Results;
