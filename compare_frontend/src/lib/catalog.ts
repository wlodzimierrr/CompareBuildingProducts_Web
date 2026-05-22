export const retailers: Record<number, string> = {
  1: "B&Q",
  2: "Tradepoint",
  3: "Screwfix",
  4: "Wickes",
};

export const categories = [
  {
    id: "15",
    title: "Building Supplies",
    group: "Building Materials",
    description: "Timber, cement, fixings, sealants, roofing, plastering and core site materials.",
  },
  {
    id: "13",
    title: "Painting & Decorating",
    group: "Building Materials",
    description: "Paint, wallpaper, decorating tools, woodcare and surface preparation.",
  },
  {
    id: "4",
    title: "Tiling & Flooring",
    group: "Building Materials",
    description: "Flooring, tiles, underlay, adhesives, trims and floor maintenance.",
  },
  {
    id: "14",
    title: "Doors & Windows",
    group: "Building Materials",
    description: "Internal and external doors, windows, frames, hardware and accessories.",
  },
  {
    id: "10",
    title: "Security & Ironmongery",
    group: "Electrical & Security",
    description: "Locks, door furniture, CCTV, alarms, sensors and general ironmongery.",
  },
  {
    id: "3",
    title: "Smart Home Technology",
    group: "Electrical & Security",
    description: "Connected lighting, heating controls, sensors and smart home devices.",
  },
  {
    id: "2",
    title: "Electrical & Lighting",
    group: "Electrical & Security",
    description: "Cables, wiring accessories, circuit protection, lamps and lighting.",
  },
  {
    id: "5",
    title: "Bathrooms & Plumbing",
    group: "Bathrooms & Kitchens",
    description: "Bathroom suites, taps, basins, showers, toilets and plumbing essentials.",
  },
  {
    id: "1",
    title: "Heating & Plumbing",
    group: "Bathrooms & Kitchens",
    description: "Radiators, pipework, drainage, heating, ventilation and water systems.",
  },
  {
    id: "6",
    title: "Kitchen & Appliances",
    group: "Bathrooms & Kitchens",
    description: "Kitchen units, sinks, taps, worktops, appliances and storage.",
  },
  {
    id: "16",
    title: "Tools & Accessories",
    group: "Tools, Garden & Home",
    description: "Hand tools, power tools, ladders, storage, safety gear and accessories.",
  },
  {
    id: "9",
    title: "Garden & Landscaping",
    group: "Tools, Garden & Home",
    description: "Landscaping, garden buildings, furniture, plant care and outdoor projects.",
  },
  {
    id: "17",
    title: "Furniture & Accessories",
    group: "Tools, Garden & Home",
    description: "Furniture, fittings and practical home or office accessories.",
  },
] as const;

export const categoryNamesById = Object.fromEntries(
  categories.map((category) => [category.id, category.title]),
) as Record<string, string>;

export const categoryGroups = categories.reduce<Record<string, typeof categories[number][]>>(
  (groups, category) => {
    groups[category.group] = [...(groups[category.group] || []), category];
    return groups;
  },
  {},
);

export const getCategoryName = (categoryId?: string | number) => {
  if (categoryId === undefined || categoryId === null) return "Building Products";
  return categoryNamesById[String(categoryId)] || "Building Products";
};

export const getRetailerName = (shopId?: number) => {
  if (!shopId) return "Unknown retailer";
  return retailers[shopId] || "Unknown retailer";
};

export const formatPrice = (price?: string | number) => {
  const value = typeof price === "string" ? Number.parseFloat(price) : price;
  if (typeof value !== "number" || Number.isNaN(value)) return "Price unavailable";
  return `£${value.toFixed(2)}`;
};
