import { Box, SimpleGrid } from "@chakra-ui/react";
import { Stat } from "./Stat";
import { ResultsTable } from "./table";
import { ResultsChart } from "./chart";
import { IParticipant } from "@/models/Category";
import { calculateVotePercentages } from "@/lib/helpers";

type Props = {
  view: "block" | "chart" | "table";
  data: IParticipant[];
  sort: "asc" | "desc" | "no-sort";
};

const View = ({ view, data, sort }: Props) => {
  const participants = calculateVotePercentages(data);

  return (
    <>
      {view === "block" ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: "5", md: "6" }}>
          {participants.map((participant) => (
            <Stat
              key={participant._id}
              name={`${participant.first_name} ${participant.last_name}`}
              percentage={participant.percentage}
              value={participant.total_votes}
            />
          ))}
        </SimpleGrid>
      ) : view === "table" ? (
        <Box overflowX="auto" bgColor={"#f4f4f4"}>
          <ResultsTable data={data} sort={sort} />
        </Box>
      ) : (
        <ResultsChart participants={data} />
      )}
    </>
  );
};

export default View;
