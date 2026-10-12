"use client";

import { ImgHTMLAttributes, useEffect, useState } from "react";

/** Keep a local illustration visible until remote photography is available. */
export default function Photograph(props: ImgHTMLAttributes<HTMLImageElement>) {
  const [loadedSource, setLoadedSource] = useState<string>();
  useEffect(() => {
    if (!props.src || typeof props.src !== "string") return;
    let active = true;
    const image = new window.Image();
    image.onload = () => {
      if (active) setLoadedSource(image.src);
    };
    image.src = props.src;
    return () => { active = false; };
  }, [props.src]);
  return <img {...props} src={loadedSource || "/footwear-fallback.svg"} alt={loadedSource ? props.alt : "Illustrated footwear — demo image"} />;
}
