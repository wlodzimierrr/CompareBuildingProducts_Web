"use client";

import Image from "next/image";
import { ImageOff } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface ProductImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

const isValidImageSrc = (src?: string | null) => {
  if (!src) return false;

  const trimmedSrc = src.trim();
  if (!trimmedSrc || trimmedSrc.toLowerCase() === "n/a") return false;
  if (trimmedSrc.startsWith("/")) return true;

  try {
    const url = new URL(trimmedSrc);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const ProductImage = ({
  src,
  alt,
  className = "object-contain p-2",
  priority,
  sizes = "144px",
}: ProductImageProps) => {
  const imageSrc = useMemo(() => src?.trim() ?? "", [src]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [imageSrc]);

  if (!isValidImageSrc(imageSrc) || hasError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-stone-950/50 text-stone-500">
        <ImageOff className="h-8 w-8" aria-hidden="true" />
        <span className="sr-only">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      priority={priority}
      unoptimized
      sizes={sizes}
      className={className}
      onError={() => setHasError(true)}
    />
  );
};

export default ProductImage;
