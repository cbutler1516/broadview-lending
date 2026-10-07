import type { Metadata } from "next";
import { AudienceLearningHub } from "@/components/content/audience-learning-hub";
import { siteUrl } from "@/lib/brand/config";
export const metadata: Metadata = { title: "Homebuyer Learning Center | Make a More Informed Move", description: "Plain-language guides and working tools for affordability, seller credits, buying in a higher-rate environment, and planning ahead.", alternates: { canonical: `${siteUrl}/learn/homebuyer-center` } };
export default function HomebuyerCenterPage() { return <AudienceLearningHub audience="homebuyer" />; }
