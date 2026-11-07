import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: `Programs — ${SITE.centreName}, ${SITE.university}`,
  description: `Explore events, workshops, conferences, and outreach programs organized by ${SITE.centreName} at ${SITE.university}.`,
};

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
