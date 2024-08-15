import { Avatar, Badge, Box, HStack, Table, TableProps, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

export const members = [
  {
    id: "1",
    name: "Christian Nwamba",
    votes: "1000",
    percentage: "50.00%",
    avatarUrl: "https://bit.ly/code-beast",
  },
  {
    id: "2",
    name: "Kent C. Dodds",
    votes: "1280",
    percentage: "50.00%",
    avatarUrl: "https://bit.ly/kent-c-dodds",
  },
];

export const ResultsTable = (props: TableProps) => (
  <Table {...props}>
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
      {members.map((member) => (
        <Tr key={member.id}>
          <Td>
            <HStack spacing="3">
              <Avatar name={member.name} src={member.avatarUrl} boxSize="10" />
              <Box>
                <Text fontWeight="medium">{member.name}</Text>
              </Box>
            </HStack>
          </Td>
          <Td>
            <Text fontWeight="medium">{member.votes}</Text>
          </Td>
          <Td>
            <Text color="fg.muted">{member.percentage}</Text>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);
