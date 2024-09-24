import { Box, HStack, Text } from "@chakra-ui/react";
import { useTimer } from "@/hooks/useTimer";
import { IEvent } from "@/models/Event";
import { getEventStatus, getStartDateTime } from "@/lib/helpers";

type TimerProps = {
  event: IEvent;
};

export const Timer = ({ event }: TimerProps) => {
  const eventStatus = getEventStatus(event.start_date, event.start_time, event.due_date, event.due_time);
  const expiresInSeconds =
    eventStatus === "not started"
      ? getStartDateTime(event.start_date, event.start_time)
      : eventStatus === "ongoing"
      ? getStartDateTime(event.due_date, event.due_time)
      : 0;
  const { seconds, minutes, hours, days } = useTimer({
    expiresInSeconds,
  });

  return (
    <HStack spacing="4">
      <TimeUnit value={days} label="DAY" />
      <TimeUnit value={hours} label="HRS" />
      <TimeUnit value={minutes} label="MIN" />
      <TimeUnit value={seconds} label="SEC" />
    </HStack>
  );
};

interface Props {
  value: number;
  label: string;
}

const TimeUnit = (props: Props) => {
  const { value, label } = props;

  return (
    <Box textAlign="center">
      <Text fontWeight="medium" fontSize="xl" lineHeight="1.2">
        {value.toLocaleString("en-US", { minimumIntegerDigits: 2 })}
      </Text>
      <Text fontSize="xs" fontWeight="semibold" color="whiteAlpha.700" textTransform="uppercase" lineHeight="1rem">
        {label}
      </Text>
    </Box>
  );
};
