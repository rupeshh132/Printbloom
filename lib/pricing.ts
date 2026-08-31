export type ProductVariant = { label: string; price: number; };

export const productVariantsMap: Record<string, ProductVariant[]> = {
  'custom-magazine-a5': [{ label: '8 Pages', price: 349 }, { label: '12 Pages', price: 499 }, { label: '16 Pages', price: 649 }, { label: '20 Pages', price: 799 }],
  'custom-magazine-a4': [{ label: '8 Pages', price: 449 }, { label: '12 Pages', price: 599 }, { label: '16 Pages', price: 749 }, { label: '20 Pages', price: 899 }],
  'softcopy-magazine': [{ label: '8 Pages', price: 249 }, { label: '12 Pages', price: 299 }, { label: '16 Pages', price: 349 }, { label: '20 Pages', price: 399 }],
  'photo-frames': [{ label: 'Small', price: 249 }, { label: 'Medium', price: 349 }, { label: 'Large', price: 449 }],
  'polaroids': [{ label: '15 pcs', price: 199 }, { label: '25 pcs', price: 349 }],
  'spotify-cards': [{ label: '3 cards', price: 149 }, { label: '6 cards', price: 249 }],
  'desk-calendar': [{ label: 'Default', price: 499 }],
  'personalised-newspaper': [{ label: '4 Pages', price: 249 }, { label: '6 Pages', price: 339 }],
  'fridge-magnet-polaroids': [{ label: '2 Magnets', price: 299 }, { label: '4 Magnets', price: 449 }],
  'keychains': [{ label: '1 pc', price: 149 }, { label: 'Set of 2', price: 249 }],
  'photo-booth-strips': [{ label: '3 strips', price: 149 }, { label: '6 strips', price: 249 }]
};