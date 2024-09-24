"use client";
import { Box, Text, Stack, ButtonGroup, Button, useDisclosure, Skeleton } from "@chakra-ui/react";
import React, { useState } from "react";
import CustomRadio from "./card-group";
import { ConfirmVoteModal } from "./confirm-vote";
import { IEvent } from "@/models/Event";
import { convertTimeToAMOrPM, getEmailDomain, getEventStatus, getTokenFromLocalStorage } from "@/lib/helpers";
import Link from "next/link";
import { useUser } from "@/context/user.context";
import CountDown from "./count-down";
import { useConditionalFetchData } from "@/hooks/useFetchData";
import { ICategory } from "@/models/Category";

type Props = {
  data: IEvent;
};

type SelectedVotesType = {
  [key: string]: string;
};

const Voting = ({ data }: Props) => {
  const [selectedVotes, setSelectedVotes] = useState<SelectedVotesType>({});
  const [isShowCountDown, setIsShowCountDown] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const year = new Date(data?.start_date).getFullYear();

  const { user, error, loading } = useUser();

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
        <Skeleton height="20px" width="full" />
        <Skeleton height="20px" width="full" />
      </Stack>
    );
  }

  return (
    <>
      {isOpen && (
        <ConfirmVoteModal
          setSelectedVotes={setSelectedVotes}
          selectedVotes={selectedVotes}
          isOpen={isOpen}
          onClose={onClose}
          event_id={data?._id!}
        />
      )}
      <Box bgColor={"brand.primary"} minH={"100vh"} py={10}>
        {user && data?.voters?.includes(user?._id!) ? (
          <Box padding={"10"}>
            <Text fontSize={"3xl"} color={"white"}>
              Your vote has already been submitted
            </Text>
            <Button href="/dashboard" as={Link}>
              Go to Dashboard
            </Button>
          </Box>
        ) : (
          <Box maxW={"1280px"} mx={"auto"} px={{ base: 4, sm: 8 }} py={12} bgColor={"#f4f4f4"} rounded={"2xl"}>
            <Text fontWeight={"bold"} fontSize={{ base: "xl", lg: "3xl" }} textTransform={"uppercase"}>
              {data?.title} - {year}
            </Text>
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

            {isShowCountDown && (
              <CountDown
                event={data}
                eventId={data?._id!}
                isEnded={data?.is_ended}
                setIsShowCountDown={setIsShowCountDown}
              />
            )}
            {data?.is_lock_event && getEmailDomain(user?.email!) !== data?.org_domain ? (
              <Stack my={6} textAlign={"center"}>
                <Text fontSize={"3xl"} fontWeight={"bold"}>
                  Election Locked
                </Text>
                <Text>Are you sure you belong to this organisation? Login and try again</Text>
              </Stack>
            ) : (data?.is_lock_event && getEmailDomain(user?.email!) === data?.org_domain) || !data?.is_lock_event ? (
              <Stack spacing={8}>
                {categories?.data?.map((category) => {
                  return (
                    <Stack
                      key={category._id}
                      bgColor={"rgba(155, 214, 232, 0.5)"}
                      py={8}
                      gap={8}
                      px={{ base: 2, sm: 4, xl: 12 }}
                      rounded={"xl"}
                    >
                      <Text fontSize={"xl"} fontWeight={"medium"}>
                        {category.title}
                      </Text>
                      <Stack mt={8} borderColor={"black"}>
                        <CustomRadio
                          participants={category.participants}
                          category_id={category._id!}
                          setSelectedVotes={setSelectedVotes}
                        />
                      </Stack>
                    </Stack>
                  );
                })}
              </Stack>
            ) : (
              <div></div>
            )}
            <ButtonGroup mt={8}>
              <Button as={Link} href={"/"} colorScheme="red" size={"lg"}>
                Go to Home
              </Button>
              <Button colorScheme="blue" size={"lg"} onClick={onOpen}>
                Submit
              </Button>
            </ButtonGroup>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Voting;
