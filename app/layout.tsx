import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MS Brand Store | Premium Everything Store",
  description: "Order from top restaurants, groceries, pharmacy, and more with fast delivery.",
  icons: {
    icon: "/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/logo.jpeg" type="image/x-icon" />
        <script src="https://cdn.tailwindcss.com" async></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Satoshi', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
