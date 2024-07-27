"use client";
import { Box, Button, ButtonGroup, useColorModeValue, chakra } from "@chakra-ui/react";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { useEffect, useState } from "react";
import LogoIcon from "@/app/icons/logo";

const CareersOptions = [
  {
    name: "Apply for Internship",
    link: "mailto:hr@dawurobo.com?subject=Application for Internship",
  },
  {
    name: "Apply for a Job",
    link: "mailto:hr@dawurobo.com?subject=Application for a Job",
  },
  {
    name: "Apply for NSS",
    link: "mailto:hr@dawurobo.com?subject=Application for NSS",
  },
];

const Nav = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

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

  return (
    <section>
      <Box as="nav" boxShadow={useColorModeValue("sm", "sm-dark")} className="w-screen sticky" paddingX={4} zIndex={5}>
        <chakra.div
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          className="mx-auto max-w-[1280px] "
        >
          <Link href="/" className="w-max">
            <LogoIcon width={"150px"} />
          </Link>

          <ButtonGroup
            spacing="2"
            alignItems={"center"}
            justifySelf="center"
            gap={{ base: 4, xl: 8 }}
            display={{ base: "none", md: "flex" }}
          >
            <Button as={Link} bgColor={"transparent"} _hover={{ opacity: 0.7 }} href={"/"}>
              Home
            </Button>
            <Button as={Link} bgColor={"transparent"} _hover={{ opacity: 0.7 }} href={"/"}>
              Hosted Events
            </Button>
            <Button as={Link} bgColor={"transparent"} _hover={{ opacity: 0.7 }} href={"/"}>
              FAQ
            </Button>
          </ButtonGroup>
          <chakra.div display={{ base: "block", md: "none" }}>
            <MobileNav CareersOptions={CareersOptions} />
          </chakra.div>

          <ButtonGroup display={{ base: "none", md: "flex" }}>
            <Button
              rounded={"full"}
              variant={"outline"}
              bgColor={"transparent"}
              borderColor={"brand.primary"}
              color={"brand.primary"}
              borderWidth={2}
              _hover={{ bg: "brand.primary", color: "white" }}
            >
              Login
            </Button>
            <Button rounded={"full"} bgColor={"brand.primary"} color={"white"} _hover={{ opacity: 0.7 }}>
              Signup
            </Button>
          </ButtonGroup>
        </chakra.div>
      </Box>
    </section>
  );
};

export default Nav;
