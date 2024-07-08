import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { items } from "./data";
import { AiOutlineCaretDown } from "react-icons/ai";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  chakra,
  Button
} from "@chakra-ui/react";
import { WhiteButton } from "../buttons/Buttons";
import { useAuthContext } from "../../context";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const variantsTwo = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const Navigation = ({ isNavOpen, toggle, CareersOptions }) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { userData, logout } = useAuthContext();

  useEffect(() => {
    if (isServicesOpen && !isNavOpen) {
      setIsServicesOpen(false);
    }
  }, [isNavOpen]);

  return (
    <div>
      <motion.ul
        variants={variants}
        className={`${!isNavOpen && "invisible"} mobile-nav-list-container`}
      >
        <motion.li variants={variantsTwo} className="w-full">
          <Link
            href="/"
            className="py-2 hover:tracking-widest text-lg font-bold text-white shadow-md w-full ml-2 flex rounded-md pl-4"
            onClick={toggle}
          >
            Home
          </Link>
        </motion.li>
        <div
          className="text-lg over:tracking-widest font-bold shadow-md w-full ml-2 rounded-md"
          onClick={() => setIsServicesOpen(!isServicesOpen)}
        >
          <motion.div
            className="flex justify-between w-full text-white rounded-md pt-2 pl-4"
            variants={variantsTwo}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="flex-1 hover:tracking-widest">Services</span>
            <AiOutlineCaretDown className="mt-1" />
          </motion.div>
          <motion.div className="flex flex-col ml-4 text-[14px] mt-2">
            <AnimatePresence>
              {isServicesOpen &&
                items.map((item, index) => {
                  return (
                    <motion.li
                      variants={variantsTwo}
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                    >
                      <Link
                        href={item.href}
                        className="py-2 hover:tracking-widest text-sm font-bold text-white shadow-md w-full mx-2 flex rounded-md pl-4"
                        onClick={toggle}
                      >
                        {item.title}
                      </Link>
                    </motion.li>
                  );
                })}
            </AnimatePresence>
          </motion.div>
        </div>
        <motion.li variants={variantsTwo} className="full">
          <chakra.a
            href="/blog"
            className="py-2 hover:tracking-widest text-lg font-bold text-white shadow-md w-full ml-2 flex rounded-md pl-4"
            onClick={toggle}
          >
            Blog
          </chakra.a>
        </motion.li>
        <motion.li variants={variantsTwo} className="full">
          <Link
            href="/#footer"
            className="py-2 hover:tracking-widest text-lg font-bold text-white shadow-md w-full ml-2 flex rounded-md pl-4"
            onClick={toggle}
          >
            Contact
          </Link>
        </motion.li>
        <motion.li variants={variantsTwo} className="full">
          <Link
            href="/#footer"
            className="py-2 hover:tracking-widest text-lg font-bold text-white shadow-md w-full ml-2 flex rounded-md pl-4"
            onClick={toggle}
          >
            About Us
          </Link>
        </motion.li>
        <div className="ml-6 mt-10">
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
              onClick={logout}
            >
              Logout
            </Button>
          ) : (
            <div className="">
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
        </div>
      </motion.ul>
    </div>
  );
};

export default Navigation;
