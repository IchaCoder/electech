import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { items } from "./data";
import { AiOutlineCaretDown } from "react-icons/ai";
import { chakra, Button, ButtonGroup } from "@chakra-ui/react";

type Props = {
  isNavOpen: boolean;
  toggle: () => void;
  CareersOptions: {
    name: string;
    link: string;
  }[];
};

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const variantsTwo = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const Navigation = ({ isNavOpen, toggle, CareersOptions }: Props) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    if (isServicesOpen && !isNavOpen) {
      setIsServicesOpen(false);
    }
  }, [isNavOpen]);

  return (
    <div>
      <motion.ul variants={variants} className={`${!isNavOpen && "invisible"} mobile-nav-list-container mt-12`}>
        <motion.li variants={variantsTwo} className="w-full">
          <Link
            href="/"
            className="py-2 text-lg font-bold text-white shadow-md w-full ml-2 flex rounded-md pl-4"
            onClick={toggle}
          >
            Home
          </Link>
        </motion.li>
        <motion.li variants={variantsTwo} className="full">
          <chakra.a
            href="/blog"
            className="py-2 text-lg font-bold text-white shadow-md w-full ml-2 flex rounded-md pl-4"
            onClick={toggle}
          >
            Hosted Events
          </chakra.a>
        </motion.li>
        <motion.li variants={variantsTwo} className="full">
          <Link
            href="/#footer"
            className="py-2 text-lg font-bold text-white shadow-md w-full ml-2 flex rounded-md pl-4"
            onClick={toggle}
          >
            FAQs
          </Link>
        </motion.li>

        <div className="ml-6 mt-10">
          <ButtonGroup>
            <Button as={Link} href={"/login"}>
              Login
            </Button>
            <Button as={Link} href={"/signup"}>
              Signup
            </Button>
          </ButtonGroup>
        </div>
      </motion.ul>
    </div>
  );
};

export default Navigation;
