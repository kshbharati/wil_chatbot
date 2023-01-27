import DefaultTags from "app/DefaultTags";

export default function HeadComponent({params}) {
    console.log(params.slug)
    return (
        <>
            <DefaultTags />
            <title>Buy With Us</title>
        </>
    );
}
