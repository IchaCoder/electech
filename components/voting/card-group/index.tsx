import { Box, Container, HStack, Text } from "@chakra-ui/react";
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
      <RadioCardGroup defaultValue="one" spacing="3">
        {["0", "2"].map((option, index) => (
          <RadioCard
            key={index}
            value={option}
            // onClick={() => setAddressId(option)}
          >
            <HStack>
              <CiLocationOn />
              <Text fontWeight={"medium"}>Dan Abramov</Text>
            </HStack>
          </RadioCard>
        ))}
      </RadioCardGroup>
    </Box>
  );
};

export default CustomRadio;
