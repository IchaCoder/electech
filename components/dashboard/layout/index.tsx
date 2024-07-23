import Nav from "@/components/dashboard/nav";
import Sidebar from "@/components/dashboard/sidebar";
import { Box, Stack } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Nav />
      <Box height={"90vh"} overflow={"auto"} display={"flex"}>
        <Sidebar />
        <main>{children}</main>
      </Box>
    </>
  );
};

export default Layout;
