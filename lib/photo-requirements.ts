export interface PhotoRequirement {
  min: number;
  totalText: string;
}

// Data-driven map of minimum required photos and the total text for the UI
// Format: slug -> variant -> requirement
export const PHOTO_REQUIREMENTS: Record<string, Record<string, PhotoRequirement>> = {
  "custom-magazine": {
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
  "polaroid-set": {
    "15 Polaroids": { min: 3, totalText: "15" },
    "25 Polaroids": { min: 3, totalText: "25" },
  },
  "spotify-cards": {
    "3 Cards": { min: 3, totalText: "3" },
    "6 Cards": { min: 3, totalText: "6" },
  },
  "desk-calendar": {
    "1 Calendar": { min: 3, totalText: "13-15" },
  },
  "personalised-newspaper": {
    "4 Pages": { min: 3, totalText: "15-20" },
    "6 Pages": { min: 3, totalText: "25" },
  },
  "fridge-magnet-polaroids": {
    "1 Magnet": { min: 1, totalText: "1" },
    "2 Magnets": { min: 2, totalText: "2" },
  },
  "keychains": {
    "1 Keychain": { min: 1, totalText: "1" },
    "2 Keychains": { min: 2, totalText: "2" },
  },
  "photo-booth-strips": {
    "3 Strips": { min: 3, totalText: "9-12" },
    "6 Strips": { min: 3, totalText: "18-24" },
  }
};

// Helper function to safely get requirements. 
// Returns min: 0 if the product doesn't need photos.
export function getPhotoRequirements(slug: string, variantLabel: string): PhotoRequirement {
  const productMap = PHOTO_REQUIREMENTS[slug] || PHOTO_REQUIREMENTS[`${slug}-a5`] || PHOTO_REQUIREMENTS[`${slug}-a4`];
  
  if (productMap) {
    // Try to find exact variant match
    if (productMap[variantLabel]) {
      return productMap[variantLabel];
    }
    // Fallback: just return the first entry if variant doesn't match perfectly
    const firstKey = Object.keys(productMap)[0];
    if (firstKey) {
      return productMap[firstKey];
    }
  }

  // If product is not in the map, assume it doesn't need photos (min: 0)
  return { min: 0, totalText: "0" };
}
