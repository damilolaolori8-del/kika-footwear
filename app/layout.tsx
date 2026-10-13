import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import { AccountProvider } from "@/components/account";
import { StoreProvider, Header, Footer } from "@/components/store";
export const metadata: Metadata = {
  title: "KIKA Footwear — Keep It Klassic Always",
  description:
    "Lagos footwear retailer. Original-brand icons, student-friendly campus pairs and smart shoes for your 9–5. Keep It Klassic Always.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <AccountProvider>
          <StoreProvider>
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </StoreProvider>
        </AccountProvider>
      </body>
    </html>
  );
}
