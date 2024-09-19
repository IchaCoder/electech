"use client";
import {
  Box,
  ButtonGroup,
  useColorModeValue,
  chakra,
  IconButton,
  Stack,
  Avatar,
  Text,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import LogoIcon from "@/app/icons/logo";
import { FaBell } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import MobileSidebar from "../sidebar/mobile-sidebar";
import { useUser } from "@/context/user.context";

const Nav = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { loading, user } = useUser();

  return (
    <>
      <MobileSidebar isOpen={isOpen} onClose={onClose} />
      <section>
        <Box as="nav" boxShadow={useColorModeValue("sm", "sm-dark")} className="w-screen" paddingX={2} zIndex={5}>
          <chakra.div
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            className="mx-auto max-w-[100%] md:max-w-[90%] "
          >
            <HStack>
              <IconButton
                aria-label="menu button"
                bgColor={"transparent"}
                display={{ base: "flex", md: "none" }}
                fontSize={"25px"}
                icon={<RxHamburgerMenu />}
                onClick={onOpen}
              />
              <Link href="/dashboard" className="w-max">
                <LogoIcon width={"120px"} />
              </Link>
            </HStack>

            <ButtonGroup gap={{ base: 0, sm: 8 }} alignItems={"center"}>
              <IconButton
                aria-label="notification"
                fontSize={{ base: "20px", md: "30px" }}
                bgColor={"transparent"}
                icon={<FaBell />}
              />

              <Stack flexDir={"row"}>
                <Avatar size={{ base: "sm", md: "md" }} name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                <Stack gap={0}>
                  <Text fontSize={{ base: "sm", sm: "md" }} fontWeight={"bold"}>
                    {user?.name}
                  </Text>
                  <Text fontSize={{ base: "xs", sm: "sm" }} color={"gray.500"}>
                    {user?.role === "admin" ? "Admin" : "Voter"}
                  </Text>
                </Stack>
              </Stack>
            </ButtonGroup>
          </chakra.div>
        </Box>
      </section>
    </>
  );
};

export default Nav;
