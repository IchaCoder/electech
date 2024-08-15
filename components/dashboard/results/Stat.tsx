import { As, Avatar, Box, Heading, HStack, Icon, Square, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { FiArrowDownRight, FiArrowUpRight, FiMoreVertical } from "react-icons/fi";

interface Props {
  value: string;
  percentage: string;
  name: string;
}
export const Stat = (props: Props) => {
  const { name, value, percentage, ...boxProps } = props;
  return (
    <Box
      px={{ base: "4", md: "6" }}
      py={{ base: "5", md: "6" }}
      bg="#f4f4f4"
      borderRadius="lg"
      boxShadow="sm"
      {...boxProps}
    >
      <Stack spacing={{ base: "5", md: "6" }}>
        <Stack direction="row" justify="space-between">
          <HStack spacing="4">
            {/* 
              use fill if size is unknown and remove widht && height

            */}
            {/* <Image src="/logo.svg" alt="logo" width="40" height="40" /> */}
            <Avatar name={name} />
            <Text fontWeight="medium">{name}</Text>
          </HStack>
        </Stack>
        <Stack spacing="4">
          <Heading size={{ base: "md", md: "lg" }} fontWeight={"semibold"}>
            {value} votes
          </Heading>
          <Heading size={{ base: "sm", md: "md" }}>{percentage}</Heading>
        </Stack>
      </Stack>
    </Box>
  );
};
