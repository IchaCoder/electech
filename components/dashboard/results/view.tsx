import { Box, SimpleGrid } from "@chakra-ui/react";
import { stats } from "./data";
import { Stat } from "./Stat";
import { ResultsTable } from "./table";
import { ResultsChart } from "./chart";

type Props = {
  view: "block" | "chart" | "table";
};

const View = ({ view }: Props) => {
  return (
    <>
      {view === "block" ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: "5", md: "6" }}>
          {stats.map((stat, id) => (
            <Stat key={id} {...stat} />
          ))}
        </SimpleGrid>
      ) : view === "table" ? (
        <Box overflowX="auto" bgColor={"#f4f4f4"}>
          <ResultsTable />
        </Box>
      ) : (
        <ResultsChart />
      )}
    </>
  );
};

export default View;
