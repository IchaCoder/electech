// app/providers.tsx
"use client";

import { UserProvider } from "@/context/user.context";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const colors = {
  brand: {
    // you can add more custom colors here
    primary: "rgba(97, 153, 203, 1)",
    bg: "rgba(155, 214, 232, 0.2)",
    dashboard: "rgba(155, 214, 232, 0.5)",
  },
};

const theme = extendTheme({ colors });

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        {children}
        <ProgressBar height="4px" color={colors.brand.primary} options={{ showSpinner: true }} shallowRouting />
      </UserProvider>
    </ChakraProvider>
  );
}
