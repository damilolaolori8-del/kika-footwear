"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
type PhotographProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  sizes?: string;
};
export default function Photograph({
  src,
  alt,
  className,
  loading,
  sizes,
}: PhotographProps) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  return (
    <Image
      src={failed ? "/footwear-fallback.svg" : src}
      alt={failed ? "Footwear illustration — image unavailable" : alt}
      className={className}
      width={1000}
      height={1000}
      sizes={sizes || "(max-width: 600px) 50vw, (max-width: 900px) 40vw, 500px"}
      loading={loading}
      quality={85}
      data-cutout={src.endsWith(".png") ? "true" : undefined}
      onError={() => setFailed(true)}
    />
  );
}
