import NextLink from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FBF6EE] flex flex-col items-center justify-center px-4 text-center">
      {/* Logo */}
      <NextLink href="/" className="mb-10 inline-block">
        <img
          src="/logo.png"
          alt="PrintBloom"
          className="h-14 w-auto aspect-square object-contain rounded-full shadow-sm"
        />
      </NextLink>

      {/* 404 */}
      <p className="font-mono text-sm tracking-[0.3em] text-[#DFBC94] uppercase mb-4">
        404 — Page Not Found
      </p>

      {/* Heading */}
      <h1 className="font-serif text-4xl md:text-5xl text-[#221F1C] mb-4 leading-tight">
        This page doesn't exist.
      </h1>

      {/* Subtext */}
      <p className="text-[#9A8F85] text-base max-w-md mb-10 leading-relaxed">
        The page you're looking for may have been moved, deleted, or never existed. 
        Let's get you back to something beautiful.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4">
        <NextLink
          href="/"
          className="bg-[#221F1C] text-white px-8 py-3 rounded-sm text-sm font-medium hover:bg-black transition-colors"
        >
          Back to Home
        </NextLink>
        <NextLink
          href="/products"
          className="border border-[#DFBC94] text-[#DFBC94] px-8 py-3 rounded-sm text-sm font-medium hover:bg-[#DFBC94]/10 transition-colors"
        >
          Browse Products
        </NextLink>
      </div>

      {/* Decorative bottom text */}
      <p className="mt-16 font-mono text-xs tracking-widest text-[#C8BEB4] uppercase">
        printbloom.in — Capture Your Memories
      </p>
    </div>
  )
}
