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
      sizes,
      stock
    }
    `);
}

export async function GetOrderData(){
  return sanityClient.fetch(`
    *[_type == "order"]{
       "products": products[]->{_id, name, category, price},
      totalPrice,
      status,
      createdAt
    }
  `);
};
