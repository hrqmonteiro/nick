import Head from "next/head"

interface HeadTag {
    title: string;
}

export default function HeadTag({title}: HeadTag) {
    return(<Head>
        <title>
            {title} - Nick
        </title>
    </Head>)
}