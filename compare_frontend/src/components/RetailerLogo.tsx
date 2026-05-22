import type { ReactNode } from "react";
import { BQSVG, ScrewfixSVG, TradepointSVG, WickesSVG } from "@/images/tradepoint";
import { getRetailerName } from "@/lib/catalog";

const logos: Record<number, ReactNode> = {
  1: <BQSVG />,
  2: <TradepointSVG />,
  3: <ScrewfixSVG />,
  4: <WickesSVG />,
};

interface RetailerLogoProps {
  shopId: number;
  compact?: boolean;
}

const RetailerLogo = ({ shopId, compact = false }: RetailerLogoProps) => {
  const logo = logos[shopId];

  if (!logo) {
    return <span className="text-sm font-medium text-stone-300">{getRetailerName(shopId)}</span>;
  }

  return (
    <div
      aria-label={getRetailerName(shopId)}
      className={compact ? "flex h-8 w-12 items-center justify-center" : "flex h-10 w-16 items-center justify-center"}
    >
      {logo}
    </div>
  );
};

export default RetailerLogo;
