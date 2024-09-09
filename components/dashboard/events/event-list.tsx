import { IEvent } from "@/models/Event";
import { Badge, Card, IconButton, Stack, Text, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { FaRegCopy } from "react-icons/fa6";
import React from "react";
import { getEventStatus } from "@/lib/helpers";

type Props = { data: IEvent[] };

const EventList = ({ data }: Props) => {
  const toast = useToast();
  const uri = new URL(window.location.href);

  return (
    <Stack direction={{ base: "column", sm: "row" }} spacing="4" flexWrap={"wrap"}>
      {data?.map((event) => {
        const status = getEventStatus(event.start_date, event.start_time, event.due_date, event.due_time);
        return (
          <Card
            key={event._id}
            as={Link}
            href={`/dashboard/${event._id}`}
            maxW={"400px"}
            bgColor={"gray.100"}
            borderRadius={"xl"}
            p={4}
            flex="1"
            minW={"300px"}
          >
            <Stack flexDir={"row"} justifyContent={"space-between"}>
              <Text fontSize={{ base: "xl", xl: "2xl" }} fontWeight={"bold"}>
                {event.title}
              </Text>
              <IconButton
                aria-label="copy"
                title="Copy election url"
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText(`${uri.origin}/vote/${event._id}`);
                  toast({
                    title: "Copied to clipboard",
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                    position: "bottom-right",
                  });
                }}
                icon={<FaRegCopy />}
              />
            </Stack>
            <Text fontSize={{ base: "md", xl: "lg" }} fontWeight={"medium"}>
              {new Date(event.start_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
            {status === "ended" ? (
              <Badge variant="solid" colorScheme="red" w={"max-content"} mt={1}>
                Ended
              </Badge>
            ) : status === "ongoing" ? (
              <Badge variant="solid" colorScheme="green" w={"max-content"} mt={1}>
                Ongoing
              </Badge>
            ) : (
              <Badge variant="solid" colorScheme="blue" w={"max-content"} mt={1}>
                Not Started
              </Badge>
            )}
          </Card>
        );
      })}
    </Stack>
  );
};

export default EventList;
