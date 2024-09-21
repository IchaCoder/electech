"use client";

import { Box, HStack, Stack, Text, Select, SelectProps, useColorModeValue, Skeleton, Button } from "@chakra-ui/react";
import { sortByOptions, viewOptions } from "./data";
import View from "./view";
import React, { useState } from "react";
import { getTokenFromLocalStorage } from "@/lib/helpers";
import { useConditionalFetchData } from "@/hooks/useFetchData";
import { ICategory } from "@/models/Category";
import { IEvent } from "@/models/Event";

interface Props extends SelectProps {
  data: IEvent;
}

type ViewTypes = "block" | "chart" | "table";

const Results = ({ data, ...rest }: Props) => {
  const [view, setView] = useState<ViewTypes>("block");
  const [sort, setSort] = useState<"asc" | "desc" | "no-sort">("no-sort");

  const token = getTokenFromLocalStorage();
  const {
    data: categories,
    isLoading,
    error,
  } = useConditionalFetchData<ICategory[]>({
    endpoint: `categories?event_id=${data?._id}`,
    token: token!,
  });

  return (
    <Box py={8} px={{ base: 0, sm: 4, xl: 12 }}>
      <Stack flexDir={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Text fontWeight={"bold"} fontSize={{ base: "xl", md: "2xl", lg: "4xl" }}>
          Results
        </Text>
        <HStack spacing={4}>
          {view === "table" && (
            <Select
              size="sm"
              width={"max-content"}
              aria-label="Sort by"
              defaultValue={sortByOptions.defaultValue}
              focusBorderColor={useColorModeValue("blue.500", "blue.200")}
              rounded="md"
              borderWidth={1}
              borderColor={"gray.800"}
              onChange={(e) => setSort(e.target.value as "asc" | "desc" | "no-sort")}
              {...rest}
            >
              {sortByOptions.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          )}
          <Select
            size="sm"
            width={"max-content"}
            aria-label="Sort by"
            defaultValue={view}
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
            rounded="md"
            borderWidth={1}
            borderColor={"gray.800"}
            onChange={(e) => setView(e.target.value as ViewTypes)}
            {...rest}
          >
            {viewOptions.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </HStack>
      </Stack>
      <Stack mt={8} gap={8}>
        {isLoading ? (
          <Stack>
            <Skeleton h={"30px"} />
            <Skeleton h={"30px"} />
            <Skeleton h={"30px"} />
            <Skeleton h={"30px"} />
          </Stack>
        ) : categories?.data?.length === 0 ? (
          <Box textAlign="center" mt={8}>
            <Text fontSize={"lg"} fontWeight={"medium"}>
              No Categories or Participants found
            </Text>
            <Button
              bgColor={"rgba(97, 153, 203, 1)"}
              color={"white"}
              _hover={{ opacity: 0.7 }}
              _focus={{ opacity: 0.7 }}
            >
              Go to Categories
            </Button>
          </Box>
        ) : (
          <>
            {categories?.data?.map((category) => {
              return (
                <React.Fragment key={category._id}>
                  {category?.participants && category?.participants?.length > 0 && (
                    <Box>
                      <Stack spacing={4} direction={{ base: "column", sm: "row" }} justifyContent={"flex-start"} mb={3}>
                        <Text fontSize={{ base: "md", sm: "xl" }} fontWeight={"medium"}>
                          {category.title}
                        </Text>
                      </Stack>
                      <View view={view} data={category.participants} sort={sort} />
                    </Box>
                  )}
                </React.Fragment>
              );
            })}
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Results;
