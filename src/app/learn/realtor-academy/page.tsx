import type { Metadata } from "next";
import { AudienceLearningHub } from "@/components/content/audience-learning-hub";
import { siteUrl } from "@/lib/brand/config";
export const metadata: Metadata = { title: "Realtor Academy | Client Strategy & Practical Tools", description: "Agent playbooks, client-conversation checklists, offer comparisons, and rental analysis tools from Broadview Lending.", alternates: { canonical: `${siteUrl}/learn/realtor-academy` } };
export default function RealtorAcademyPage() { return <AudienceLearningHub audience="realtor" />; }
