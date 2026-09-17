import { routing } from "@/i18n/routing";
import { assetPath } from "@/lib/site";

export default function RootPage() {
  const target = assetPath(`/${routing.defaultLocale}/`);
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.replace('${target}');`,
          }}
        />
        <title>Fistashion — The Bakery House</title>
      </head>
      <body
        style={{
          backgroundColor: "#FAF7F2",
          color: "#0F2418",
          fontFamily: "system-ui, sans-serif",
          display: "grid",
          minHeight: "100vh",
          placeItems: "center",
          margin: 0,
        }}
      >
        <p style={{ letterSpacing: "0.15em", textTransform: "uppercase", fontSize: "14px" }}>
          Redirecting to <a href={target} style={{ color: "#0F2418", fontWeight: "bold" }}>Fistashion</a>...
        </p>
      </body>
    </html>
  );
}
