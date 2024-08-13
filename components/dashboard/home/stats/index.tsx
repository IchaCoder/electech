import { Box, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Stat } from "./stat-item";

const stats = [
  { label: "Dan Abramov", value: "32.01%" },
  { label: "Emmanuel Yeboah", value: "56.87%" },
  { label: "Idris Elba", value: "12.87%" },
];

export const Stats = () => (
  <Stack my={4} gap={6}>
    <Box as="section">
      <Text fontSize="lg" fontWeight="semibold" mb="2">
        President
      </Text>
      <Box>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, xl: 4 }} gap={{ base: "5", md: "6" }}>
          {stats.map(({ label, value }) => (
            <Stat key={label} label={label} value={value} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
    <Box as="section">
      <Text fontSize="lg" fontWeight="semibold" mb="2">
        Secretary
      </Text>
      <Box>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, xl: 4 }} gap={{ base: "5", md: "6" }}>
          {stats.map(({ label, value }) => (
            <Stat key={label} label={label} value={value} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  </Stack>
);
