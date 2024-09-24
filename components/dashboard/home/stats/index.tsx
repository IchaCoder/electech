import { Box, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Stat } from "./stat-item";
import { ICategory } from "@/models/Category";
import { calculateVotePercentages } from "@/lib/helpers";

type StatProps = { category: ICategory };

export const Stats = ({ category }: StatProps) => (
  <Stack my={4} gap={6}>
    {category?.participants?.length > 0 && (
      <Box as="section">
        <Text fontSize="lg" fontWeight="semibold" mb="2">
          {category?.title}
        </Text>
        <Box>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, xl: 4 }} gap={{ base: "5", md: "6" }}>
            {calculateVotePercentages(category.participants)?.map((participant) => {
              return (
                <Stat
                  key={participant._id}
                  label={`${participant.first_name} ${participant.middle_name} ${participant.last_name}`}
                  value={participant.percentage}
                />
              );
            })}
          </SimpleGrid>
        </Box>
      </Box>
    )}
  </Stack>
);
