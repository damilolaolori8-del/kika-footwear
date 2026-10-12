import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider, Header, Footer } from "@/components/store";
export const metadata: Metadata = {
  title: "KIKA Footwear — Find your next step",
  description:
    "Discover a considered edit of footwear from the brands you love. Sneakers, heels, boots and everyday favourites.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
