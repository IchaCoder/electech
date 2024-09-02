"use client";
import { Link } from "@chakra-ui/next-js";
import { Box, Button, Stack } from "@chakra-ui/react";
import { nav_links } from "./links";
import { MdLogout } from "react-icons/md";
import { usePathname } from "next/navigation";
import { IoPersonOutline } from "react-icons/io5";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <Stack px={{ base: 5, lg: 8 }} my={4} display={{ base: "none", md: "flex" }} position={"relative"}>
      <Button
        size={"lg"}
        aria-label="sign out"
        position={"absolute"}
        bottom={"10px"}
        borderRadius={"full"}
        leftIcon={<MdLogout />}
      >
        Sign Out
      </Button>
      {pathname !== "/dashboard" ? (
        nav_links.admin.map((link, index) => (
          <Stack flexDir={"row"} gap={".25rem"} key={index}>
            <Link
              href={link.href}
              w={{ base: "150px", lg: "170px" }}
              p={{ base: 2, lg: 3 }}
              pl={{ base: 3, lg: 6 }}
              alignItems={"center"}
              _hover={{ textDecor: "none" }}
              display={"flex"}
              fontSize={{ base: "md", lg: "lg" }}
              gap={{ base: 4, lg: 6 }}
              bg={"brand.dashboard"}
              borderRadius={"25px 0 0 25px"}
            >
              {" "}
              <link.icon /> {link.name}
            </Link>
            <Box height={"full"} w={"5px"} bgColor={"rgba(97, 153, 203, 1)"}></Box>
          </Stack>
        ))
      ) : (
        <Stack flexDir={"row"} gap={".25rem"}>
          <Link
            href={"/dashboard/account"}
            w={{ base: "150px", lg: "170px" }}
            p={{ base: 2, lg: 3 }}
            pl={{ base: 3, lg: 6 }}
            alignItems={"center"}
            _hover={{ textDecor: "none" }}
            display={"flex"}
            fontSize={{ base: "md", lg: "lg" }}
            gap={{ base: 4, lg: 6 }}
            bg={"brand.dashboard"}
            borderRadius={"25px 0 0 25px"}
          >
            {" "}
            <IoPersonOutline /> Account
          </Link>
          <Box height={"full"} w={"5px"} bgColor={"rgba(97, 153, 203, 1)"}></Box>
        </Stack>
      )}
    </Stack>
  );
};

export default Sidebar;
