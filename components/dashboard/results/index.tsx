"use client";

import {
  Box,
  HStack,
  Stack,
  Text,
  Select,
  SelectProps,
  useColorModeValue,
  Skeleton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { sortByOptions, viewOptions } from "./data";
import View from "./view";
import React, { useState } from "react";
import { getTokenFromLocalStorage } from "@/lib/helpers";
import { useConditionalFetchData } from "@/hooks/useFetchData";
import { ICategory } from "@/models/Category";
import { IEvent } from "@/models/Event";
import { AiOutlineSortDescending } from "react-icons/ai";
import { MdOutlineViewArray } from "react-icons/md";
import { useUser } from "@/context/user.context";
import { useRouter } from "next/navigation";

interface Props extends SelectProps {
  data: IEvent;
}

type ViewTypes = "block" | "chart" | "table";

const Results = ({ data, ...rest }: Props) => {
  const [view, setView] = useState<ViewTypes>("block");
  const [sort, setSort] = useState<"asc" | "desc" | "no-sort">("no-sort");
  const router = useRouter();

  const { error, loading } = useUser();

  const token = getTokenFromLocalStorage();
  const { data: categories, isLoading } = useConditionalFetchData<ICategory[]>({
    endpoint: `categories?event_id=${data?._id}`,
    token: token!,
  });

  if (loading) {
    return (
      <Stack>
        <Skeleton height="20px" width="full" />
        <Skeleton height="20px" width="full" />
        <Skeleton height="20px" width="full" />
        <Skeleton height="20px" width="full" />
        <Skeleton height="20px" width="full" />
        <Skeleton height="20px" width="full" />
      </Stack>
    );
  }

  if (error === "Token expired") {
    router.push("/login");
  }

  return (
    <Box py={8} px={{ base: 0, sm: 4, xl: 12 }}>
      <Stack flexDir={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Text fontWeight={"bold"} fontSize={{ base: "xl", md: "2xl", lg: "4xl" }}>
          Results
        </Text>
        <HStack spacing={4}>
          {view === "table" && (
            <Menu>
              <MenuButton px={2} as={Button}>
                <AiOutlineSortDescending size={25} />
              </MenuButton>
              <MenuList>
                {sortByOptions.options.map((option) => (
                  <MenuItem
                    key={option.value}
                    fontSize={"sm"}
                    onClick={() => setSort(option.value as "asc" | "desc" | "no-sort")}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          )}
          <Menu>
            <MenuButton px={2} as={Button}>
              <MdOutlineViewArray size={25} />
            </MenuButton>
            <MenuList>
              {viewOptions.options.map((option) => (
                <MenuItem key={option.value} fontSize={"sm"} onClick={() => setView(option.value as ViewTypes)}>
                  {option.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
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
