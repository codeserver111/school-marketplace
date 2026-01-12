import { constructMetadata } from "@/lib/seo";
import SchoolsClient from "./SchoolsClient";

export const metadata = constructMetadata({
  title: "Browse Best Schools - Find Top Rated Schools Near You",
  description: "Browse our extensive list of top-rated schools. Filter by board, fees, location and more to find the perfect school for your child.",
});

export default function SchoolsPage() {
  return <SchoolsClient />;
}
