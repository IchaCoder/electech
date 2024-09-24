import { Box, Stack, Text } from "@chakra-ui/react";

type Props = {};

const Events = (props: Props) => {
	return (
		<Box bgColor={"brand.bg"} p={10}>
			<Text fontSize={"2xl"} textAlign={"center"}>
				Join over 5000+ organizers nationwide to schedule votes for...
			</Text>
			<Stack
				maxW={"500px"}
				mx={"auto"}
				mt={14}
				fontWeight={"bold"}
				color={"rgba(0,0,0,.7)"}
				fontSize={{ base: "3xl", sm: "5xl" }}
			>
				<Text>Radio/TV award</Text>
				<Text>Pageant shows</Text>
				<Text>Event managers</Text>
				<Text>School portfolio</Text>
				<Text>Religious bodies</Text>
				<Text>Reality shows</Text>
			</Stack>
		</Box>
	);
};

export default Events;
