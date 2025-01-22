import { createClient, type ClientConfig } from "next-sanity";

// Sanity client configuration
const SanityClient: ClientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-01-18",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
};

export default createClient(SanityClient);
