import sanityClient from "./sanity.client";

export default async function GetProductData() {
  return sanityClient.fetch(`
    *[_type == "products"]{
      _id,
      name,
      description,
      price,
      image,
      category,
      discountPercent,
      isNew,
      colors,
      sizes
    }`);
}
