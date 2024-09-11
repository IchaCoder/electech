import { Box, Heading, Stack, Text } from "@chakra-ui/react";

interface Props {
  label: string;
  value: string;
}
export const Stat = (props: Props) => {
  const { label, value, ...boxProps } = props;
  return (
    <Box
      px={{ base: "4", md: "6" }}
      py={{ base: "5", md: "6" }}
      bg="gray.50"
      borderRadius="lg"
      boxShadow="sm"
      {...boxProps}
    >
      <Stack>
        <Text textStyle="sm" color="fg.muted">
          {label}
        </Text>
        <Heading size={"xl"}>{value}%</Heading>
      </Stack>
    </Box>
  );
};
