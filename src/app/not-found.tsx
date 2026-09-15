import { SITE } from "@/lib/site";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="grid min-h-svh place-items-center bg-[#0f2418] text-[#e8d5a3]">
        <a href="/en" className="tracking-[0.28em]">
          {SITE.brand}
        </a>
      </body>
    </html>
  );
}
