export type typeOfData = {
    _id:string,
    image:string,
    discountPercent:number,
    sizes:string[],
    colors:string[],
    description:string,
    name:string,
    price:number,
    category:string,
    isNew:boolean,
    stock:number
}

export interface Order {
    _id: string;
    user: string;
    email: string;
    products: typeOfData[];
    totalPrice: number;
    status: "pending" | "shipped" | "delivered";
    createdAt: string;
  }
  