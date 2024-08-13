import { Badge, Card, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type Props = {};

const EventList = (props: Props) => {
  return (
    <Stack direction={{ base: "column", sm: "row" }} spacing="4" flexWrap={"wrap"}>
      <Card
        as={Link}
        href={"/dashboard/11"}
        maxW={"400px"}
        bgColor={"gray.100"}
        borderRadius={"xl"}
        p={4}
        flex="1"
        minW={"300px"}
      >
        <Text fontSize={{ base: "xl", xl: "2xl" }} fontWeight={"bold"}>
          UG SRC Elections
        </Text>
        <Text fontSize={{ base: "md", xl: "lg" }} fontWeight={"semibold"}>
          12th June, 2021
        </Text>
        <Badge variant="solid" colorScheme="red" w={"max-content"}>
          Ended
        </Badge>
      </Card>
      <Card
        as={Link}
        href={"/dashboard/11"}
        maxW={"400px"}
        bgColor={"gray.100"}
        borderRadius={"xl"}
        p={4}
        flex="1"
        minW={"300px"}
      >
        <Text fontSize={{ base: "xl", xl: "2xl" }} fontWeight={"bold"}>
          Event 2
        </Text>
        <Text fontSize={{ base: "lg", xl: "xl" }} fontWeight={"semibold"}>
          12th June, 2021
        </Text>
        <Badge variant="solid" colorScheme="green" w={"max-content"}>
          Not Started
        </Badge>
      </Card>
      <Card
        as={Link}
        href={"/dashboard/home"}
        maxW={"400px"}
        bgColor={"gray.100"}
        borderRadius={"xl"}
        p={4}
        flex="1"
        minW={"300px"}
      >
        <Text fontSize={{ base: "xl", xl: "2xl" }} fontWeight={"bold"}>
          Event 2
        </Text>
        <Text fontSize={{ base: "lg", xl: "xl" }} fontWeight={"semibold"}>
          12th June, 2021
        </Text>
        <Badge variant="solid" colorScheme="blue" w={"max-content"}>
          Ongoing
        </Badge>
      </Card>
    </Stack>
  );
};

export default EventList;
