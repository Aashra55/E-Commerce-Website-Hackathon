import { NextRequest } from "next/server"; 
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: '2025-01-27.acacia',
});

export async function POST(req: NextRequest) {
    try {
        const { cart } = await req.json(); // 🛒 Frontend se cart data le rahe hain

        if (!cart || cart.length === 0) {
            return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
        }

        // 🛍️ Stripe ke liye line_items format sahi tarah se bana rahe hain
        const line_items = cart.map((item: { name: string; description: string; price: number }) => ({
            quantity: 1, // Agar quantity user se le rahe hain, to usko bhi pass karein
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                    description: item.description,
                },
                unit_amount: item.price * 100, // Stripe price cents mein leta hai
            },
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: "http://localhost:3000/thankyou-page",
            cancel_url: "http://localhost:3000/checkout",
            line_items, // 🛒 Ye ab dynamically frontend se aa raha hai
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
    }
}
