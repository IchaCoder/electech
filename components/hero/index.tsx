import { Button, Image, Stack, Text } from "@chakra-ui/react";

type Props = {};

const Hero = (props: Props) => {
	return (
		<Stack maxW={"1000px"} mx={"auto"} gap={10} py={{ base: 12, lg: 20 }} px={4}>
			<Stack gap={4}>
				<Text
					fontSize={{ base: "3xl", md: "5xl" }}
					textAlign={"center"}
					fontWeight={"bold"}
				>
					Giving You The Power Of Choice, <br /> Echoing Your Voice.
				</Text>
				<Text color={"rgba(0,0,0,.8)"} textAlign={"center"}>
					Your number one electronic voting system
				</Text>
			</Stack>
			<Stack gap={4}>
				<Text color={"rgba(0,0,0,.8)"} textAlign={"center"}>
					Are you an event organizer?
				</Text>
				<Button
					rounded={"full"}
					w={"max-content"}
					size={"lg"}
					mx={"auto"}
					bgColor={"brand.primary"}
					color={"white"}
					_hover={{ opacity: 0.7 }}
				>
					Get Started
				</Button>
			</Stack>
			<Stack flexDir={"row"} flexWrap={"wrap"} justifyContent={"center"} mt={12} gap={4}>
				<Image src="/events.webp" width={"300px"} height={"300px"} alt="events" />
				<Image src="/review.webp" width={"300px"} height={"300px"} alt="review" />
				<Image src="/faq.webp" width={"300px"} height={"300px"} alt="FAQ" />
			</Stack>
		</Stack>
	);
};

export default Hero;
