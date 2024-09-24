import { Box, Button, Image, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

const NotFoundPage = () => {
	const router = useRouter();

	return (
		<Box display={"grid"}>
			<Image src={"/404.png"} alt="404 image" justifySelf={"center"} />
			<Stack mt={24} spacing={6}>
				<Text
					textTransform={"uppercase"}
					color={"#565872"}
					textAlign={"center"}
					fontWeight={"semibold"}
				>
					Opps! Page Not Found
				</Text>
				<Button
					colorScheme="blue"
					borderRadius={"full"}
					onClick={() => router.back()}
					mx={"auto"}
					px={10}
					boxShadow={"-10px 10px 20px 0 rgba(0,0,0,0.1)"}
				>
					Go Back
				</Button>
			</Stack>
		</Box>
	);
};

export default NotFoundPage;
