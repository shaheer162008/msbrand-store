import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { CartProvider } from "@/lib/cart-context";
import FloatingButtons from "@/components/FloatingButtons";

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
        <style>{`
          .bg-brand { background-color: #FFD600; }
          .text-brand { color: #FFD600; }
          .border-brand { border-color: #FFD600; }
          .hover\\:bg-brand:hover { background-color: #FFD600; }
          .hover\\:text-brand:hover { color: #FFD600; }
        `}</style>
      </head>
      <body className="antialiased" style={{ fontFamily: "'Satoshi', sans-serif" }}>
        <AuthProvider>
          <CartProvider>
            {children}
            <FloatingButtons />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
