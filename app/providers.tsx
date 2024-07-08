// app/providers.tsx
"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

export const colors = {
	brand: {
		// you can add more custom colors here
		primary: "#F50CB5",
		text: "#EC76B3",
	},
};

const theme = extendTheme({ colors });

export function Providers({ children }: { children: React.ReactNode }) {
	return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
