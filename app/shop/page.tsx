import { Suspense } from "react";
import Shop from "@/components/shop";
export default function ShopPage() {
  return (
    <Suspense
      fallback={<div className="page-shell">Loading the collection…</div>}
    >
      <Shop />
    </Suspense>
  );
}
