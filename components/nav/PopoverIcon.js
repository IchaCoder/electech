import { Icon } from "@chakra-ui/react";
import * as React from "react";
import { FiChevronDown } from "react-icons/fi";

export const PopoverIcon = ({ isOpen }) => {
	const iconStyles = {
		transform: isOpen ? "rotate(-180deg)" : undefined,
		transition: "transform 0.2s",
		transformOrigin: "center",
	};
	return <Icon aria-hidden as={FiChevronDown} __css={iconStyles} />;
};
