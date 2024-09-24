import Nav from "@/components/dashboard/nav";
import Sidebar from "@/components/dashboard/sidebar";
import { Box } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Nav />
      <Box height={"90vh"} overflow={"auto"} display={"flex"}>
        <Sidebar />
        <Box bgColor={"brand.dashboard"} m={{ base: 1, sm: 4 }} p={4} overflow={"auto"} borderRadius={"lg"} w={"full"}>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
