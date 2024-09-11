"use client";
import { Box, Button, Skeleton, Stack, Text, Tooltip, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import CountDown from "./count-down-timer/count-down";
import { Stats } from "./stats";
import { FaRegCopy } from "react-icons/fa6";
import { IEvent } from "@/models/Event";
import { convertTimeToAMOrPM, getTokenFromLocalStorage } from "@/lib/helpers";
import { useConditionalFetchData } from "@/hooks/useFetchData";
import { ICategory } from "@/models/Category";

type Props = {
  data: IEvent;
};

const Home = ({ data }: Props) => {
  const [isShowCountdown, setIsShowCountdown] = useState(true);
  const toast = useToast();

  const token = getTokenFromLocalStorage();
  const {
    data: categories,
    isLoading,
    error,
  } = useConditionalFetchData<ICategory[]>({ endpoint: `categories?event_id=${data?._id}`, token: token! });
  console.log(categories);

  const year = new Date(data?.start_date).getFullYear();

  return (
    <Box py={8} px={{ base: 0, sm: 4, xl: 12 }}>
      <Stack flexDir={"row"} justifyContent={"space-between"}>
        <Text fontWeight={"bold"} fontSize={{ base: "xl", lg: "3xl" }}>
          {data?.title} - {year}
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
          <Text>
            {new Date(data?.start_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            - {convertTimeToAMOrPM(data?.start_time)}
          </Text>
        </Stack>
        <Stack>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Due Date
          </Text>
          <Text>
            {new Date(data?.due_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            - {convertTimeToAMOrPM(data?.due_time)}
          </Text>
        </Stack>
      </Stack>
      {isShowCountdown && (
        <CountDown isEnded={data?.is_ended} setIsShowCountDown={setIsShowCountdown} eventId={data?._id!} />
      )}
      {isLoading ? (
        <Stack>
          <Skeleton height="30px" />
          <Skeleton height="30px" />
          <Skeleton height="30px" />
          <Skeleton height="30px" />
        </Stack>
      ) : categories?.data?.length === 0 ? (
        <Box textAlign="center" mt={8}>
          <Text fontSize={"lg"} fontWeight={"medium"}>
            No Categories or Participants found
          </Text>
          <Button bgColor={"rgba(97, 153, 203, 1)"} color={"white"} _hover={{ opacity: 0.7 }} _focus={{ opacity: 0.7 }}>
            Go to Categories
          </Button>
        </Box>
      ) : (
        <>
          {categories &&
            categories.data.length > 0 &&
            categories.data.map((category) => {
              return <Stats key={category._id} category={category} />;
            })}
        </>
      )}
    </Box>
  );
};

export default Home;
