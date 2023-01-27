import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-w-screen min-h-screen text-center content-center p-20">
            <h1>404 - Page Not Found</h1>
            <Link className="hover:bg-lime-700" href="/">
                Go back home
            </Link>
        </div>
    );
}
