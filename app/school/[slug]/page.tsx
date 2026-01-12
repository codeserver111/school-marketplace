import { constructSchoolMetadata, generateSchoolJSONLD } from "@/lib/seo";
import { getSchoolBySlug } from "@/data/mockSchools";
import SchoolDetailClient from "./SchoolDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
    params: {
        slug: string;
    };
}

export function generateMetadata({ params }: PageProps): Metadata {
    const school = getSchoolBySlug(params.slug);
    if (!school) {
        return {
            title: "School Not Found | SchoolFinder",
            description: "The requested school could not be found.",
        };
    }
    return constructSchoolMetadata(school);
}

export default function SchoolDetail({ params }: PageProps) {
    const school = getSchoolBySlug(params.slug);
    if (!school) {
        notFound();
    }

    const jsonLd = generateSchoolJSONLD(school);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <SchoolDetailClient params={params} />
        </>
    );
}
