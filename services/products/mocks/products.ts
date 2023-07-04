import { Product } from "../core/entities/product.js";

export const mockProducts: Product[] = [
  {
    upc: "1",
    name: "Table",
    price: 899,
    weight: 100,
    imageUrl:
      "https://www.ikea.com/us/en/images/products/tarsele-extendable-table-oak-veneer-black__0944977_pe797515_s5.jpg",
    isNew: false,
  },
  {
    upc: "2",
    name: "Couch",
    price: 1299,
    weight: 1000,
    imageUrl:
      "https://www.ikea.com/us/en/images/products/kivik-corner-sectional-5-seat-w-chaise-tresund-anthracite__1124079_pe874996_s5.jpg",
    isNew: true,
  },
  {
    upc: "3",
    name: "Chair",
    price: 54,
    weight: 50,
    imageUrl:
      "https://www.ikea.com/us/en/images/products/ekenaeset-armchair-kilanda-light-beige__1179060_pe895831_s5.jpg",
    isNew: false,
  },
];
