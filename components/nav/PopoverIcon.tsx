import { Icon } from "@chakra-ui/react";
import * as React from "react";
import { FiChevronDown } from "react-icons/fi";

type PopoverIconProps = {
  isOpen: boolean;
};

export const PopoverIcon = ({ isOpen }: PopoverIconProps) => {
  const iconStyles = {
    transform: isOpen ? "rotate(-180deg)" : undefined,
    transition: "transform 0.2s",
    transformOrigin: "center",
  };
  return <Icon aria-hidden as={FiChevronDown} __css={iconStyles} />;
};
