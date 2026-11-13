import Head from "next/head";

interface SeoProps {
    title: string;
    description: string;
}

export default function Seo({ title, description }: SeoProps) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="/mosque.png" />
            <meta name="twitter:card" content="summary_large_image" />
        </Head>
    );
}
