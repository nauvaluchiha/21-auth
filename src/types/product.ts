export type Product = {
    id: string;
    no: number;
    name: string;
    category: string;
    image?: File | HTMLImageElement | string;
    freshness: string;
    desc: string;
    price: string;
  };