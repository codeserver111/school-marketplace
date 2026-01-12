import { Metadata } from 'next';

// Define a subset of the School interface needed for SEO to avoid circular deps or complex imports
// We can import the full type if it's in a shared types file, but for now we'll define the shape we need.
interface SchoolSEOData {
    name: string;
    tagline: string;
    description: string;
    slug: string;
    images: string[];
    address: string;
    city: string;
    rating?: number;
    reviewCount?: number;
    minPrice?: number;
    maxPrice?: number; // annualFee is usually a single number, but structured data supports ranges
    annualFee?: number;
    telephone?: string;
    email?: string;
}

export function constructMetadata({
    title = 'SchoolFinder - Find the Best Schools Near You',
    description = 'Discover and compare the best schools near you. Find ratings, fees, amenities and request callbacks from top schools.',
    image = 'https://lovable.dev/opengraph-image-p98pqg.png',
    icons = '/favicon.ico',
    noIndex = false,
}: {
    title?: string;
    description?: string;
    image?: string;
    icons?: string;
    noIndex?: boolean;
} = {}): Metadata {
    return {
        title: {
            default: title,
            template: '%s | SchoolFinder',
        },
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                },
            ],
            type: 'website',
            siteName: 'SchoolFinder',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
            creator: '@SchoolFinder',
        },
        icons,
        metadataBase: new URL('https://schoolfinder.skool.ai'), // Replace with actual production URL
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}

export function constructSchoolMetadata(school: SchoolSEOData): Metadata {
    const title = `${school.name} - ${school.tagline}`;
    const description = school.description.substring(0, 160); // Optimize for SERP
    const image = school.images[0] || 'https://lovable.dev/opengraph-image-p98pqg.png';

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
            images: [
                {
                    url: image,
                    alt: school.name,
                }
            ],
            siteName: 'SchoolFinder',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
    };
}

export function generateSchoolJSONLD(school: SchoolSEOData) {
    return {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization', // More specific than Organization for schools
        name: school.name,
        description: school.description,
        image: school.images,
        address: {
            '@type': 'PostalAddress',
            streetAddress: school.address,
            addressLocality: school.city,
            addressCountry: 'IN' // Assuming India based on currency
        },
        ...(school.rating && {
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: school.rating,
                reviewCount: school.reviewCount || 100, // Fallback if no count available
                bestRating: 5,
                worstRating: 1
            }
        }),
        priceRange: school.annualFee ? `₹${school.annualFee}` : undefined,
        telephone: school.telephone,
        email: school.email,
        url: `https://schoolfinder.skool.ai/school/${school.slug}`,
    };
}
