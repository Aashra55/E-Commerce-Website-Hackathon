import { NextRequest, NextResponse } from "next/server";
import client from "../../../sanity/sanity.client"

export const POST = async (req: NextRequest) => {
  try {
    const { productId, quantity } = await req.json(); // Parse JSON from request

    if (!productId || quantity === undefined) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Fetch product data from Sanity
    const product = await client.getDocument<{ stock: number }>(productId);

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    // Calculate new stock value (ensure it doesn't go below 0)
    const updatedStock = Math.max(0, (product.stock || 0) - quantity);

    // Update stock in Sanity
    await client.patch(productId).set({ stock: updatedStock }).commit();

    return NextResponse.json({ message: "Stock updated", newStock: updatedStock }, { status: 200 });
  } catch (error) {
    console.error("Error updating stock:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
