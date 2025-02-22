import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { createClient } from "@sanity/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth"; 

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-27",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, 
  ignoreBrowserTokenWarning: true,
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, email } = await req.json();
    
    console.log("Received Request:", { name, email });

    // Check if user already exists
    const existingUser = await client.fetch(`*[_type == "user" && email == $email][0]`, { email });

    if (existingUser) {
      console.log("User already exists:", existingUser);
      return NextResponse.json({ message: "User already exists", user: existingUser }, { status: 200 });
    }

    // Create new user if not exists
    const user = await client.create({
      _type: "user",
      name: session?.user?.name || name,
      email: session?.user?.email || email,
    });

    console.log("User created successfully:", user);
    
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


