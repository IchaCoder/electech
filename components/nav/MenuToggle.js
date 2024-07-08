import * as React from "react";
import { motion } from "framer-motion";

const Path = (props) => {
  const { isOpen, ...rest } = props;

  return (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke={isOpen ? "red" : "#142b33"}
      strokeLinecap="round"
      {...rest}
    />
  );
};
export const MenuToggle = ({ toggle, isOpen }) => (
  <button
    className="mobile-nav-btn"
    onClick={toggle}
    style={{ cursor: "none" }}
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" }
        }}
        isOpen={isOpen}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
        isOpen={isOpen}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" }
        }}
        isOpen={isOpen}
      />
    </svg>
  </button>
);
