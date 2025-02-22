import sanityClient from "@/sanity/sanity.client";
import { User } from "next-auth";

export async function saveUserToSanity(user: User) {
  if (!user.email) return;

  try {
    const existingUser = await sanityClient.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email: user.email }
    );

    if (!existingUser) {
      // Save user to Sanity without image
      await sanityClient.create({
        _type: "user",
        _id: user.id,
        name: user.name || "Unknown",
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      console.log("✅ User saved to Sanity!");
    }
  } catch (error: any) {
    console.error("❌ Error saving user to Sanity:", error.response || error);
  }
}
