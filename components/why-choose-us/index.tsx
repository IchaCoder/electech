import CredibleIcon from "@/app/icons/credible";
import LeadingIcon from "@/app/icons/leading";
import SafeIcon from "@/app/icons/safe";
import { Stack, Text } from "@chakra-ui/react";

const WhyChooseUs = () => {
	return (
		<Stack maxW={"1000px"} mx={"auto"} py={20} px={4}>
			<Text
				textAlign={"center"}
				fontSize={{ base: "xl", sm: "3xl" }}
				fontWeight={"medium"}
			>
				Why Organizers choose ElecTech
			</Text>
			<Stack flexDir={{ base: "column", sm: "row" }} mt={10} gap={{ base: 4, lg: 10 }}>
				<Stack alignItems={"center"} gap={4}>
					<CredibleIcon />
					<Text textAlign={"center"} fontSize={"xl"} fontWeight={"bold"}>
						Credible
					</Text>
					<Text textAlign={"center"} fontSize={{ base: "md", sm: "sm", md: "md" }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt
					</Text>
				</Stack>
				<Stack alignItems={"center"} gap={4}>
					<SafeIcon />
					<Text textAlign={"center"} fontSize={"xl"} fontWeight={"bold"}>
						Safeguard
					</Text>
					<Text textAlign={"center"} fontSize={{ base: "md", sm: "sm", md: "md" }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt
					</Text>
				</Stack>
				<Stack alignItems={"center"} gap={4}>
					<LeadingIcon />
					<Text textAlign={"center"} fontSize={"xl"} fontWeight={"bold"}>
						Leading
					</Text>
					<Text textAlign={"center"} fontSize={{ base: "md", sm: "sm", md: "md" }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt
					</Text>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default WhyChooseUs;
