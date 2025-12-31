"use client";

import CardioNerveWebsite from "@/components/CardioNerveWebsite";
import { ThemeProvider } from "@/components/next-themes";

export default function Home() {
  return (
    <ThemeProvider>
       <CardioNerveWebsite />
    </ThemeProvider>
  );
}
