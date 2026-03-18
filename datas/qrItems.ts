export type QRItem = {
  id: string;
  name: string;
  description: string;
  modelUrl?: string; 
  origin?: string;
  year?: string;
};

export const qrItems: QRItem[] = [
  {
    id: "qr-1",
    name: "Cursed Monolith",
    description: "An ancient artifact discovered recently glowing with strange energy.",
    origin: "Temple of Shadows",
    year: "1405",
  },
  {
    id: "qr-2",
    name: "Tesseract Fragment",
    description: "An expression of modern minimalist art bridging 4 dimensions.",
    origin: "Neo-Tokyo Gallery",
    year: "2088",
  },
  {
    id: "qr-3",
    name: "Golden Torus",
    description: "A digital representation of spatial loops used in old ceremonies.",
    origin: "Silicon Valley Vault",
    year: "1994",
  }
];
