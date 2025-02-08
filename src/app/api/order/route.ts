import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: "2024-02-04",
  token: process.env.SANITY_API_TOKEN // Use an environment variable for security
});

export async function POST(req: NextRequest) {
  try {
    const { user, email, products, totalPrice } = await req.json();

    if (!user || !email || !products.length || !totalPrice) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save order to Sanity
    const order = await client.create({
      _type: "order",
      user,
      email,
      products,
      totalPrice,
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: "Order placed successfully!", order });
  } catch (error) {
    console.error("Error placing order:", error);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}
