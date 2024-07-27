import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Stack,
  Box,
  DrawerHeader,
} from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";
import { nav_links } from "./links";
import { Link } from "@chakra-ui/next-js";
import LogoIcon from "@/app/icons/logo";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileSidebar = ({ isOpen, onClose }: Props) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          {" "}
          <Link href="/dashboard" className="w-max">
            <LogoIcon width={"120px"} />
          </Link>
        </DrawerHeader>

        <DrawerBody>
          <Stack px={{ base: 5, lg: 8 }} my={4} display={{ base: "flex", md: "none" }} position={"relative"}>
            {nav_links.map((link, index) => (
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
            ))}
          </Stack>
        </DrawerBody>

        <DrawerFooter flexDir={"column"} gap={2} width={"max-content"} mx={"auto"}>
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
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileSidebar;
