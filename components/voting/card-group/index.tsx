import { Avatar, Box, Container, HStack, Stack, Text } from "@chakra-ui/react";
import { RadioCard, RadioCardGroup } from "./RadioCardGroup";
import { CiLocationOn } from "react-icons/ci";
import { Dispatch, SetStateAction } from "react";

// type CustomRadioType = {
//   // address: UserTypes["address"];
//   setAddressId: Dispatch<SetStateAction<string>>;
// };
const CustomRadio = () => {
  return (
    <Box as="section" bg="bg.surface" pb={4}>
      <RadioCardGroup defaultValue="one" spacing="3" flexDir={"row"} flexWrap={"wrap"} justifyContent={"center"}>
        {["0", "2", "1"].map((option, index) => (
          <RadioCard
            key={index}
            value={option}
            // onClick={() => setAddressId(option)}
          >
            <HStack flexDir={"column"} spacing={6}>
              <Avatar name="Dan Abramov" size={"2xl"} src="https://bit.ly/dan-abramov" />
              <Stack spacing={0}>
                <Text fontSize={"lg"} color={"rgba(92, 90, 168, 1)"} fontWeight={"semibold"}>
                  Candidate name:
                </Text>
                <Text fontSize={"xl"}>Dan Abramov</Text>
              </Stack>
            </HStack>
          </RadioCard>
        ))}
      </RadioCardGroup>
    </Box>
  );
};

export default CustomRadio;
