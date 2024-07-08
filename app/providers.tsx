// app/providers.tsx
"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

export const colors = {
	brand: {
		// you can add more custom colors here
		primary: "rgba(97, 153, 203, 1)",
		bg: "rgba(155, 214, 232, 0.2)",
	},
};

const theme = extendTheme({ colors });

export function Providers({ children }: { children: React.ReactNode }) {
	return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
