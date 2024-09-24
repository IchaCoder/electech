"use client";
import { Link } from "@chakra-ui/next-js";
import { Box, Button, Stack } from "@chakra-ui/react";
import { nav_links } from "./links";
import { MdLogout } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { CgEventbrite } from "react-icons/cg";
import { createElement } from "react";
import { useUser } from "@/context/user.context";
import { removeTokenFromLocalStorage } from "@/lib/helpers";

const Sidebar = () => {
  const pathname = usePathname() as any;
  const router = useRouter();
  const { user, loading } = useUser();
  const id = pathname.split("/")[2];

  if (loading) {
    return null;
  }
  return (
    <Stack px={{ base: 5, lg: 8 }} my={4} display={{ base: "none", md: "flex" }} position={"relative"}>
      <Button
        size={"lg"}
        aria-label="sign out"
        position={"absolute"}
        bottom={"10px"}
        borderRadius={"full"}
        leftIcon={<MdLogout />}
        onClick={() => {
          removeTokenFromLocalStorage();
          router.push("/");
        }}
      >
        Sign Out
      </Button>
      {pathname !== "/dashboard" ? (
        nav_links?.[user?.role!]?.map((link, index) => {
          return (
            <Stack flexDir={"row"} gap={".25rem"} key={index}>
              <Link
                href={`/dashboard/${id}/${link.href}`}
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
                {createElement(link.icon)} {link.name}
              </Link>
              {pathname === `/dashboard/${id}/${link.href}` && (
                <Box height={"full"} w={"5px"} bgColor={"rgba(97, 153, 203, 1)"}></Box>
              )}
            </Stack>
          );
        })
      ) : (
        <>
          <Stack flexDir={"row"} gap={".25rem"}>
            <Link
              href={"/dashboard"}
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
              <CgEventbrite /> Events
            </Link>
            {pathname === "/dashboard" && <Box height={"full"} w={"5px"} bgColor={"rgba(97, 153, 203, 1)"}></Box>}
          </Stack>
          {/* <Stack flexDir={"row"} gap={".25rem"}>
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
            {pathname === "/dashboard/account" && (
              <Box height={"full"} w={"5px"} bgColor={"rgba(97, 153, 203, 1)"}></Box>
            )}
          </Stack> */}
        </>
      )}
    </Stack>
  );
};

export default Sidebar;
