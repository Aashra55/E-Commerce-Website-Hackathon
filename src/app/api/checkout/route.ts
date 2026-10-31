import { NextRequest, NextResponse } from "next/server"; 
import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_key_for_build";
const stripe = new Stripe(stripeKey, {
    apiVersion: '2025-01-27.acacia',
});

export async function POST(req: NextRequest) {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            return NextResponse.json({ error: "Stripe secret key not configured" }, { status: 500 });
        }

        const { cart } = await req.json(); //Taking cart data from frontend

        if (!cart || cart.length === 0) {
            return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
        }

        const origin = req.headers.get("origin") || process.env.NEXTAUTH_URL || "http://localhost:3000";

        const line_items = cart.map((item: { name: string; description: string; price: number }) => ({
            quantity: 1,
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                    description: item.description,
                },
                unit_amount: item.price * 100, //Stripe takes price in cents
            },
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${origin}/thankyou-page`,
            cancel_url: `${origin}/checkout`,
            line_items, 
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
    }
}
