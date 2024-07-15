import LogoIcon from "@/app/icons/logo";
import {
	Box,
	Button,
	ButtonGroup,
	Divider,
	IconButton,
	Stack,
	Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { FiPhone } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaTiktok } from "react-icons/fa";
import { BsFacebook, BsInstagram, BsWhatsapp, BsLinkedin } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
	return (
		<Box as="footer" bg="rgba(229, 245, 229, 0.2)" pt={10} py="4">
			<Stack
				flexDir={{ base: "column", md: "row" }}
				px={4}
				maxW={"1000px"}
				mx={"auto"}
				justifyContent={"space-between"}
				alignItems={"center"}
				spacing={8}
			>
				<LogoIcon width={"200"} />
				<Stack>
					<Text
						fontSize={"lg"}
						textAlign={{ base: "center", md: "left" }}
						fontWeight={"bold"}
					>
						Contact Us
					</Text>
					<ButtonGroup flexDir={"column"} gap={0} alignItems={"start"}>
						<Button
							as={Link}
							href={"tel:+233555543385"}
							fontWeight={"medium"}
							leftIcon={<FiPhone />}
							bgColor={"transparent"}
							p={0}
							_hover={{ bgColor: "transparent" }}
						>
							+233555543385
						</Button>
						<Button
							fontWeight={"medium"}
							leftIcon={<HiOutlineLocationMarker />}
							bgColor={"transparent"}
							p={0}
							marginInlineStart={"0px !important"}
							_hover={{ bgColor: "transparent" }}
						>
							Legon
						</Button>
					</ButtonGroup>
				</Stack>
				<Stack>
					<Text
						fontSize={"lg"}
						textAlign={{ base: "center", md: "left" }}
						fontWeight={"bold"}
					>
						Follow Us
					</Text>
					<ButtonGroup variant="solid" mx={{ base: "auto", sm: "inherit" }}>
						<IconButton
							bgColor="black"
							as="a"
							target={"_blank"}
							rel="noreferrer"
							href="#"
							aria-label="WhatsApp"
							icon={<BsWhatsapp fontSize="1.25rem" color="white" />}
							_hover={{ opacity: 0.8 }}
							rounded="full"
						/>
						<IconButton
							bgColor="black"
							as="a"
							target={"_blank"}
							rel="noreferrer"
							href="#"
							aria-label="Facebook"
							icon={<BsFacebook fontSize="1.25rem" color="white" />}
							_hover={{ opacity: 0.8 }}
							rounded="full"
						/>
						<IconButton
							bgColor="black"
							as="a"
							target={"_blank"}
							rel="noreferrer"
							href="#"
							aria-label="Instagram"
							icon={<BsInstagram fontSize="1.25rem" color="white" />}
							_hover={{ opacity: 0.8 }}
							rounded="full"
						/>
						<IconButton
							bgColor="black"
							as="a"
							target={"_blank"}
							rel="noreferrer"
							href="#"
							aria-label="Twitter"
							icon={<FaXTwitter fontSize="1.25rem" color="white" />}
							_hover={{ opacity: 0.8 }}
							rounded="full"
						/>
						<IconButton
							bgColor="black"
							as="a"
							target={"_blank"}
							rel="noreferrer"
							href="#"
							aria-label="TikTok"
							icon={<FaTiktok fontSize="1.25rem" color="white" />}
							_hover={{ opacity: 0.8 }}
							rounded="full"
						/>
						<IconButton
							bgColor="black"
							as="a"
							target={"_blank"}
							rel="noreferrer"
							href="#"
							aria-label="LinkedIn"
							icon={<BsLinkedin fontSize="1.25rem" color="white" />}
							_hover={{ opacity: 0.8 }}
							rounded="full"
						/>
					</ButtonGroup>
				</Stack>
			</Stack>
			<Divider borderColor={"rgba(0,0,0,0.5)"} my={4} maxW={"1000px"} mx={"auto"} />
			<Box maxW="1000px" mx="auto" textAlign={"center"} fontSize={"sm"}>
				&copy; {new Date().getFullYear()} ElecTech. All rights reserved.
			</Box>
		</Box>
	);
};

export default Footer;
