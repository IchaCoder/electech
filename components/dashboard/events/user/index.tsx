import { Box, Button, FormControl, FormHelperText, Input, Skeleton, Stack, Text, chakra } from "@chakra-ui/react";
import { Image } from "@chakra-ui/next-js";
import EventList from "../event-list";
import { API_RESPONSE } from "@/lib/types";
import { IEvent } from "@/models/Event";

type Props = {
  data: API_RESPONSE<IEvent[]>;
  isLoading: boolean;
};

const VoterDashboard = ({ data, isLoading }: Props) => {
  return (
    <Box py={8} px={{ base: 0, sm: 4, xl: 12 }}>
      <Stack
        bgColor={"rgba(97, 153, 203, 1)"}
        position={"relative"}
        flexDir={"row"}
        p={6}
        py={{ base: 8, md: 12 }}
        borderRadius={{ base: "xl", xl: "2xl" }}
      >
        <Stack color={"white"} maxW={{ base: "full", lg: "60%" }}>
          <Text fontSize={{ base: "xl", xl: "2xl" }}>
            Hey! <chakra.span fontWeight={"semibold"}>Emmanuel</chakra.span>👋,
          </Text>
          <Text fontSize={{ base: "xl", xl: "2xl" }}>
            Welcome to <chakra.span fontWeight={"bold"}>ElecTec</chakra.span> online votiong system. Feel free to add an
            event or navigate to an existing event
          </Text>
        </Stack>
        <Image
          src={"/dashboard.png"}
          width={300}
          height={230}
          position={"absolute"}
          right={"40px"}
          top={"-20px"}
          alt={"dashboard"}
          display={{ base: "none", lg: "block" }}
        />
      </Stack>
      {/* <Stack direction={{ base: "column", md: "row" }} mx={"auto"} my={8} width="full" maxW={{ md: "lg" }} spacing="4">
        <FormControl flex="1">
          <Input type="email" size="lg" placeholder="Enter event name" borderColor={"gray.400"} />
          <FormHelperText color="gray.500">Search for an event</FormHelperText>
        </FormControl>
        <Button
          size="lg"
          bgColor={"rgba(97, 153, 203, 1)"}
          color={"white"}
          _hover={{ opacity: 0.7 }}
          _focus={{ opacity: 0.7 }}
        >
          Search
        </Button>
      </Stack> */}
      {isLoading ? (
        <Stack>
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} height="30px" width="full" />
            ))}
        </Stack>
      ) : data && data.data.length > 0 ? (
        <EventList data={data.data} />
      ) : (
        <Box textAlign="center" mt={8}>
          <Text fontSize={{ base: "xl", xl: "2xl" }} fontWeight={"bold"}>
            Elections you have participated in will appear here
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default VoterDashboard;
