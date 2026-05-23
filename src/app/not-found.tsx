import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-white px-5">
      <section className="w-full max-w-xl rounded-[32px] bg-[#171717] p-8 text-center text-white sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#FD853A]">404</p>
        <h1 className="mt-3 text-4xl font-semibold">Page not found</h1>
        <p className="mt-3 text-white/70">The page you are looking for is not available.</p>
        <Link
          href="/"
          className="mt-7 inline-flex rounded-full bg-[#FD853A] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#e46e24]"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}
