import { calculateVotePercentages } from "@/lib/helpers";
import { IParticipant } from "@/models/Category";
import { Avatar, Box, HStack, Table, TableProps, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";

interface Props extends TableProps {
  data: IParticipant[];
  sort: "asc" | "desc" | "no-sort";
}

export const ResultsTable = (props: Props) => {
  const { data, sort, ...rest } = props;
  const participants =
    sort === "no-sort"
      ? calculateVotePercentages(data)
      : sort === "asc"
      ? calculateVotePercentages(data).sort((a, b) => a.total_votes - b.total_votes)
      : calculateVotePercentages(data).sort((a, b) => b.total_votes - a.total_votes);

  return (
    <Table {...rest}>
      <Thead bgColor={"gray.200"}>
        <Tr>
          <Th>
            <Text>Name</Text>
          </Th>
          <Th>Total Votes</Th>
          <Th>Percentage</Th>
        </Tr>
      </Thead>
      <Tbody>
        {participants.map((p) => (
          <Tr key={p._id}>
            <Td>
              <HStack spacing="3">
                <Avatar name={`${p.first_name} ${p.last_name}`} src={p.imgUrl} boxSize="10" />
                <Box>
                  <Text fontWeight="medium">{`${p.first_name} ${p.middle_name} ${p.last_name}`}</Text>
                </Box>
              </HStack>
            </Td>
            <Td>
              <Text fontWeight="medium">{p.total_votes}</Text>
            </Td>
            <Td>
              <Text color="fg.muted">{p.percentage}%</Text>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
