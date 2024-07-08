import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "../../hooks/use-dimension";
import { MenuToggle } from "./MenuToggle";
import Navigation from "./MobileNavigation";
import { chakra } from "@chakra-ui/react";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(25px at 260px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

const MobileNav = ({ CareersOptions }) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  const toggle = () => toggleOpen();

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className="nav"
    >
      <chakra.div
        as={motion.div}
        className="background"
        bg={isOpen ? "#00217A" : "#fff"}
        variants={sidebar}
      >
        <Navigation
          isNavOpen={isOpen}
          CareersOptions={CareersOptions}
          toggle={toggle}
        />
        <MenuToggle isOpen={isOpen} toggle={toggle} />
      </chakra.div>
    </motion.nav>
  );
};

export default MobileNav;
