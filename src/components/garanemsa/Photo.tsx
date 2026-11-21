"use client";

import Image from "next/image";
import { useState } from "react";
import { LeafBranch } from "./decor";

interface PhotoProps {
  src: string | null;
  alt: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Renders an official photo when one is configured, and an intentional
 * botanical placeholder otherwise. If a configured file is missing or fails
 * to load, it falls back to the placeholder instead of showing a broken image.
 */
export function Photo({
  src,
  alt,
  priority = false,
  sizes = "100vw",
}: PhotoProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <PhotoPlaceholder />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className="gr-photo__img"
      onError={() => setFailed(true)}
    />
  );
}

export function PhotoPlaceholder() {
  return (
    <div className="gr-photo-placeholder" aria-hidden="true">
      <span className="gr-photo-placeholder__glow" />
      <span className="gr-photo-placeholder__rings" />
      <LeafBranch className="gr-photo-placeholder__branch" />
    </div>
  );
}
