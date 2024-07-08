import {
	Button,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Stack,
	Text,
} from "@chakra-ui/react";
import * as React from "react";
import { items } from "./data";
import { PopoverIcon } from "./PopoverIcon";
import Link from "next/link";

export const ResourcesPopover = () => (
	<Popover
		trigger="hover"
		openDelay={0}
		placement="bottom"
		defaultIsOpen={false}
		gutter={12}
	>
		{({ isOpen }) => (
			<>
				<PopoverTrigger>
					<Button
						fontSize="lg"
						color="white"
						variant="link"
						rightIcon={<PopoverIcon isOpen={isOpen} />}
					>
						Services
					</Button>
				</PopoverTrigger>
				<PopoverContent p="1" width={{ base: "sm", md: "3xs" }}>
					{items.map((item, id) => (
						<Link href={item.href} key={id} className="hover:bg-blue-200">
							<Stack spacing="4" direction="row" p="3">
								<Text fontWeight="medium" fontSize="xs">
									{item.title}
								</Text>
							</Stack>
						</Link>
					))}
				</PopoverContent>
			</>
		)}
	</Popover>
);
