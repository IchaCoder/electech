import { Box, Button, Icon, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { VscChromeClose } from "react-icons/vsc";
import { Dispatch, SetStateAction } from "react";
import { IEvent } from "@/models/Event";
import { getEventStatus } from "@/lib/helpers";
import ConfirmEndEvent from "../dashboard/home/count-down-timer/confirm-end-event";
import { Timer } from "../dashboard/home/count-down-timer/Timer";

type CountDownProps = {
  setIsShowCountDown: Dispatch<SetStateAction<boolean>>;
  eventId: string;
  isEnded: boolean;
  event: IEvent;
};

const CountDown = ({ setIsShowCountDown, eventId, isEnded, event }: CountDownProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      {isOpen && <ConfirmEndEvent isOpen={isOpen} onClose={onClose} eventId={eventId} />}
      <Box as="section" pt="8" pb="12">
        <Box bg={isEnded ? "red.500" : "blue.600"} color="white" position="relative">
          <Box
            maxW="7xl"
            mx="auto"
            px={{ base: "4", md: "8", lg: "12" }}
            py={{ base: "3", md: "2.5" }}
            pr={{ md: "16" }}
          >
            <Stack
              direction={{ base: "column", md: "row" }}
              align="center"
              justify={{ base: "space-between", lg: "center" }}
              spacing={{ base: "2", lg: "7.5rem" }}
            >
              {isEnded ||
              getEventStatus(event.start_date, event.start_time, event.due_date, event.due_time) === "ended" ? (
                <Text fontWeight="medium" fontSize="xl" textAlign="center">
                  Voting Ended
                </Text>
              ) : (
                <>
                  {!isEnded &&
                  getEventStatus(event.start_date, event.start_time, event.due_date, event.due_time) === "ongoing" ? (
                    <>
                      <Timer event={event} />
                      <Text fontWeight="medium" fontSize="xl" textAlign="center">
                        Till voting ends
                      </Text>
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
                    </>
                  ) : (
                    <>
                      <Timer event={event} />
                      <Text fontWeight="medium" fontSize="xl" textAlign="center">
                        Till voting begins
                      </Text>
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
                    </>
                  )}
                </>
              )}
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CountDown;
