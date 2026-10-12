import { notFound } from "next/navigation";
import UtilityPage from "@/components/utility-pages";
const pages = [
  "cart",
  "checkout",
  "wishlist",
  "login",
  "signup",
  "account",
  "about",
  "contact",
  "faq",
  "shipping",
];
export function generateStaticParams() {
  return pages.map((page) => ({ page }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  if (!pages.includes(page)) notFound();
  return <UtilityPage page={page} />;
}
