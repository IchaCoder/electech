import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { stats } from "./data";
import { Stat } from "./Stat";
import { ResultsTable } from "./table";

type Props = {
  view: "block" | "graph" | "table";
};

const View = (props: Props) => {
  return (
    // <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: "5", md: "6" }}>
    //   {stats.map((stat, id) => (
    //     <Stat key={id} {...stat} />
    //   ))}
    // </SimpleGrid>
    <Box overflowX="auto" bgColor={"#f4f4f4"}>
      <ResultsTable />
    </Box>
  );
};

export default View;
