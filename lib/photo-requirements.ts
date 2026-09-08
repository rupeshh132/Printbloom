export interface PhotoRequirement {
  min: number;
  totalText: string;
}

// Data-driven map of minimum required photos and the total text for the UI
// EXACTLY matches slugs and variant labels from lib/pricing.ts
export const PHOTO_REQUIREMENTS: Record<string, Record<string, PhotoRequirement>> = {
  "custom-magazine-a5": {
    "8 Pages": { min: 3, totalText: "30-35" },
    "12 Pages": { min: 3, totalText: "45-55" },
    "16 Pages": { min: 3, totalText: "65-75" },
    "20 Pages": { min: 3, totalText: "80-90+" },
  },
  "custom-magazine-a4": {
    "8 Pages": { min: 3, totalText: "30-35" },
    "12 Pages": { min: 3, totalText: "45-55" },
    "16 Pages": { min: 3, totalText: "65-75" },
    "20 Pages": { min: 3, totalText: "80-90+" },
  },
  "softcopy-magazine": {
    "8 Pages": { min: 3, totalText: "30-35" },
    "12 Pages": { min: 3, totalText: "45-55" },
    "16 Pages": { min: 3, totalText: "65-75" },
    "20 Pages": { min: 3, totalText: "80-90+" },
  },
  "photo-frames": {
    "Small": { min: 3, totalText: "7-8" },
    "Medium": { min: 3, totalText: "10-12" },
    "Large": { min: 3, totalText: "15-20" },
  },
  "polaroids": {
    "15 pcs": { min: 3, totalText: "15" },
    "25 pcs": { min: 3, totalText: "25" },
  },
  "spotify-cards": {
    "3 cards": { min: 3, totalText: "3" },
    "6 cards": { min: 3, totalText: "6" },
  },
  "desk-calendar": {
    "Default": { min: 3, totalText: "13-15" },
  },
  "personalised-newspaper": {
    "4 Pages": { min: 3, totalText: "15-20" },
    "6 Pages": { min: 3, totalText: "25" },
  },
  "fridge-magnet-polaroids": {
    "2 Magnets": { min: 2, totalText: "2" },
    "4 Magnets": { min: 4, totalText: "4" },
  },
  "keychains": {
    "1 pc": { min: 1, totalText: "1" },
    "Set of 2": { min: 2, totalText: "2" },
  },
  "photo-booth-strips": {
    "3 strips": { min: 3, totalText: "9-12" },
    "6 strips": { min: 3, totalText: "18-24" },
  }
};

export function getPhotoRequirements(slug: string, variantLabel: string): PhotoRequirement {
  if (PHOTO_REQUIREMENTS[slug] && PHOTO_REQUIREMENTS[slug][variantLabel]) {
    return PHOTO_REQUIREMENTS[slug][variantLabel];
  }
  // Default fallback if a variant is not mapped
  return { min: 0, totalText: "0" };
}
