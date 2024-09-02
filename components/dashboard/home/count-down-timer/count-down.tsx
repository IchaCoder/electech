import { Box, Button, Icon, LightMode, Stack, Text, useToast } from "@chakra-ui/react";
import { VscChromeClose } from "react-icons/vsc";
import { Timer } from "./Timer";
import { Dispatch, SetStateAction, useState } from "react";
import { UpdateEvent } from "@/app/actions/event/update";
import { getTokenFromLocalStorage } from "@/lib/helpers";

type CountDownProps = { setIsShowCountDown: Dispatch<SetStateAction<boolean>> };

const CountDown = ({ setIsShowCountDown }: CountDownProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const endVote = async () => {
    setIsLoading(true);
    const token = getTokenFromLocalStorage();
    const { message, status } = await UpdateEvent({ is_ended: true }, token!);
    toast({
      title: status === "success" ? "Success" : "Error",
      description: message,
      status: status,
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
    setIsLoading(false);
  };

  return (
    <Box as="section" pt="8" pb="12">
      <Box bg="blue.600" color="white" position="relative">
        <Box maxW="7xl" mx="auto" px={{ base: "4", md: "8", lg: "12" }} py={{ base: "3", md: "2.5" }} pr={{ md: "16" }}>
          <Stack
            direction={{ base: "column", md: "row" }}
            align="center"
            justify={{ base: "space-between", lg: "center" }}
            spacing={{ base: "2", lg: "7.5rem" }}
          >
            <Timer />
            <Text fontWeight="medium" fontSize="xl" textAlign="center">
              Till voting begins
            </Text>

            <Button
              colorScheme="red"
              px="8"
              _focus={{ boxShadow: "none" }}
              _focusVisible={{ boxShadow: "outline" }}
              onClick={endVote}
              isLoading={isLoading}
            >
              End Event
            </Button>
            <Box
              as="button"
              aria-label="Close banner"
              position="absolute"
              right={{ base: "2", md: "4", lg: "6" }}
              top={{ base: "2", md: "unset" }}
              onClick={() => setIsShowCountDown(false)}
            >
              <Icon as={VscChromeClose} boxSize={{ base: "5", md: "6" }} />
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default CountDown;
