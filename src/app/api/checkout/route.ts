import { NextRequest } from "next/server"; 
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: '2025-01-27.acacia',
});

export async function POST(req: NextRequest) {
    try {
        const { cart } = await req.json(); //Taking cart data from frontend

        if (!cart || cart.length === 0) {
            return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
        }

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
            success_url: "http://localhost:3000/thankyou-page",
            cancel_url: "http://localhost:3000/checkout",
            line_items, 
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
    }
}
