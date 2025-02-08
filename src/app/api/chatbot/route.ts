import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  console.log("User message received:", message);

  // Convert the message to lowercase for easier matching
  const userMessage = message.toLowerCase();

  let botResponse = "I didn't understand that. Can you clarify?";

  // Add conditional logic for different cases
  if (userMessage.includes("hello") || userMessage.includes("hi")) {
    botResponse = "Hello! How can I assist you today?";
  } else if (userMessage.includes("product")) {
    botResponse = "We have a variety of products! What are you looking for?";
  } else if (userMessage.includes("price")) {
    botResponse = "The prices vary depending on the product. Could you specify which one?";
  } else if (userMessage.includes("shipping")) {
    botResponse = "We offer free shipping on orders over $50!";
  } else if (userMessage.includes("return")) {
    botResponse = "You can return any product within 30 days of purchase.";
  } else if (userMessage.includes("thank you") || userMessage.includes("thanks")) {
    botResponse = "You're welcome! Let me know if there's anything else I can help with.";
  } else if (userMessage.includes("order status")) {
    botResponse = "You can track your order status in your account under 'My Orders'. Need help finding it?";
  } else if (userMessage.includes("discount") || userMessage.includes("offer")) {
    botResponse = "We currently have special discounts! Check our homepage for the latest offers.";
  } else if (userMessage.includes("customer support") || userMessage.includes("help")) {
    botResponse = "Our customer support is available 24/7. You can contact us via email or live chat.";
  } else if (userMessage.includes("business hours") || userMessage.includes("open hours")) {
    botResponse = "Our business hours are Monday to Friday, 9 AM to 6 PM.";
  } else if (userMessage.includes("payment method")) {
    botResponse = "We accept credit/debit cards, PayPal, and Apple Pay.";
  } else if (userMessage.includes("technical issue") || userMessage.includes("not working")) {
    botResponse = "Try refreshing the page or clearing your browser cache. If the issue persists, contact our support team.";

  }

  console.log("Bot response:", botResponse);

  return NextResponse.json({ response: botResponse });
}
