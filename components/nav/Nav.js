import {
  Box,
  Button,
  ButtonGroup,
  useBreakpointValue,
  useColorModeValue,
  chakra,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { ResourcesPopover } from "./ResourcesPopover";
import MobileNav from "./MobileNav";
import { WhiteButton } from "../buttons/Buttons";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context";
import { MenuToggle } from "./MenuToggle";

const CareersOptions = [
  {
    name: "Apply for Internship",
    link: "mailto:hr@dawurobo.com?subject=Application for Internship"
  },
  {
    name: "Apply for a Job",
    link: "mailto:hr@dawurobo.com?subject=Application for a Job"
  },
  {
    name: "Apply for NSS",
    link: "mailto:hr@dawurobo.com?subject=Application for NSS"
  }
];

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { logout, userData } = useAuthContext();

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <section>
      <Box
        as="nav"
        boxShadow={useColorModeValue("sm", "sm-dark")}
        className="w-screen fixed"
        padding={4}
        bg={"brand.blue"}
        zIndex={5}
      >
        <div className="mx-auto max-w-full lg:max-w-[90%] xl:max-w-[1220px] ">
          <chakra.div display={"flex"} justifyContent={"space-between"}>
            <Link href="/" className="flex-1 4xl:flex-[.5] flex gap-2">
              <Image
                src="/logo.png"
                alt="dawurobo logo"
                width={50}
                height="50"
                className="h-[45px]"
              />
              <chakra.span color="#fff" fontWeight={"800"} alignSelf={"center"}>
                Dawurobo
              </chakra.span>
            </Link>
            {isDesktop ? (
              <ButtonGroup
                variant="link"
                spacing="8"
                alignItems={"center"}
                justifySelf="center"
                gap={{ base: 4, xl: 8 }}
              >
                <Link href="/">
                  <Button color="white" fontSize={"lg"}>
                    Home
                  </Button>
                </Link>
                <ResourcesPopover />
                <chakra.a href="/blog">
                  <Button color="white" fontSize={"lg"}>
                    Blog
                  </Button>
                </chakra.a>
                <Link href="/#footer">
                  <Button color="white" fontSize={"lg"}>
                    Contact
                  </Button>
                </Link>
                <Link href="/#footer">
                  <Button color="white" fontSize={"lg"}>
                    About
                  </Button>
                </Link>
              </ButtonGroup>
            ) : (
              <chakra.div>
                <MobileNav
                  isNavOpen={isNavOpen}
                  setIsNavOpen={setIsNavOpen}
                  CareersOptions={CareersOptions}
                />
              </chakra.div>
            )}
            {userData ? (
              <Button
                variant="solid"
                bg="#fff"
                color="brand.blue"
                _hover={{
                  outline: "2px solid white",
                  bg: "none",
                  color: "white"
                }}
                w="max-content"
                py={6}
                px={10}
                borderRadius={"25px"}
                fontWeight={"700"}
                fontSize={"19px"}
                display={{ base: "none", lg: "flex" }}
                onClick={logout}
              >
                Logout
              </Button>
            ) : (
              <div className="hidden lg:flex">
                <Menu display={{ base: "none", md: "flex" }}>
                  <MenuButton>
                    <WhiteButton>Careers</WhiteButton>
                  </MenuButton>
                  <MenuList>
                    {CareersOptions.map((option, index) => (
                      <MenuItem as="a" href={option.link} key={index}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </div>
            )}
          </chakra.div>
        </div>
      </Box>
    </section>
  );
};

export default Nav;
