"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import NProgress from "nprogress";
import NextNProgress from "nextjs-progressbar";
import "nprogress/nprogress.css";
import { colors } from "@/app/providers";

export const NextNProgressWrapper = () => {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    NProgress.start();
  }, [router]);

  useEffect(() => {
    NProgress.done();
  }, [path]);

  return (
    <NextNProgress
      color={colors.brand.primary}
      startPosition={0.3}
      options={{ showSpinner: true }}
      stopDelayMs={200}
      height={4}
    />
  );
};
