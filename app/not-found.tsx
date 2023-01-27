import Link from "next/link";

export default function HomeNotFound() {
    return (
        <div className="flex h-screen text-center content-center p-20">
            <h1>Error 404 | Content Not Found</h1>
            <Link className="hover:bg-lime-700" href="/">
                Home
            </Link>
        </div>
    );
}
