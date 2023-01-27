import Link from "next/link";

export default function FooterComponent() {
    return (
        <div className="flex bottom-0 w-full p-6 space-x-20 bg-slate-800 text-white text-center place-content-center">
            <div className="">
                <Link href="/privacy">Privacy Policy</Link>
            </div>
            <div className="">
                <Link href="/sitemap">Sitemap</Link>
            </div>
        </div>
    );
}
