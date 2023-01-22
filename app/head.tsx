import DefaultTags from "app/DefaultTags";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Head() {
    return (
        <>
            <DefaultTags />
            <title>Buy With Us</title>
        </>
    );
}
