'use client';
import Link from "next/link";

export default function GlobalError({
    error,
    reset
}:{error:Error; 
    reset:()=>void;}) {
    return (
        <div className="flex h-screen text-center content-center p-20">
            <h1>{error.message}</h1>
            <Link className="hover:bg-lime-700" href="/">
                Home
            </Link>
        </div>
    );
}
