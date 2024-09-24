import { Avatar, Box, Container, HStack, Stack, Text } from "@chakra-ui/react";
import { RadioCard, RadioCardGroup } from "./RadioCardGroup";
import { Dispatch, SetStateAction } from "react";
import { IParticipant } from "@/models/Category";

type CustomRadioType = {
  participants: IParticipant[];
  setSelectedVotes: Dispatch<SetStateAction<SelectedVotesType>>;
  category_id: string;
};
type SelectedVotesType = {
  [key: string]: string;
};
const CustomRadio = ({ participants, setSelectedVotes, category_id }: CustomRadioType) => {
  return (
    <Box as="section" bg="bg.surface" pb={4}>
      <RadioCardGroup defaultValue="one" spacing="8" flexDir={"row"} flexWrap={"wrap"} justifyContent={"center"}>
        {participants?.map((participant, index) => (
          <RadioCard
            key={index}
            value={participant._id}
            onClick={() => {
              setSelectedVotes((prev) => ({ ...prev, [category_id]: participant._id }));
            }}
          >
            <HStack flexDir={"column"} spacing={6}>
              <Avatar name="Dan Abramov" size={"2xl"} src="https://bit.ly/dan-abramov" />
              <Stack spacing={0}>
                <Text fontSize={"lg"} color={"rgba(92, 90, 168, 1)"} fontWeight={"semibold"}>
                  Candidate name:
                </Text>
                <Text
                  fontSize={"xl"}
                >{`${participant.first_name} ${participant.middle_name} ${participant.last_name}`}</Text>
              </Stack>
            </HStack>
          </RadioCard>
        ))}
      </RadioCardGroup>
    </Box>
  );
};

export default CustomRadio;
