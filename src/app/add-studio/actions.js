"use server";

import { revalidatePath } from "next/cache";
import { createStudio } from "@/lib/studios";

const REQUIRED_FIELDS = ["title", "category", "location", "overview"];

// CREATE — called from the /add-studio form.
// TODO: authenticate — derive hostName/hostEmail from the real session
// instead of trusting the client payload before this goes to production.
export async function createStudioAction(data) {
  if (!data || typeof data !== "object") {
    return { ok: false, error: "Invalid submission." };
  }

  for (const field of REQUIRED_FIELDS) {
    if (!data[field] || !String(data[field]).trim()) {
      return { ok: false, error: `Please fill in “${field}”.` };
    }
  }

  const inputs = [
    ["hourlyRate", 1, 10_000],
    ["securityDeposit", 0, 100_000],
    ["maxCapacity", 1, 1_000],
  ];
  for (const [field, min, max] of inputs) {
    const value = Number(data[field]);
    if (Number.isNaN(value) || value < min || value > max) {
      return { ok: false, error: `${field} must be a number between ${min} and ${max}.` };
    }
  }

  let insertedId;
  try {
    const result = await createStudio({
      title: String(data.title).trim(),
      category: String(data.category).trim(),
      hourlyRate: Number(data.hourlyRate),
      securityDeposit: Number(data.securityDeposit),
      maxCapacity: Number(data.maxCapacity),
      location: String(data.location).trim(),
      image: String(data.image ?? "").trim(),
      amenities: Array.isArray(data.amenities) ? data.amenities.map(String) : [],
      overview: String(data.overview).trim(),
      hostName: String(data.hostName ?? "").trim(),
      hostEmail: String(data.hostEmail ?? "").trim().toLowerCase(),
    });
    insertedId = result.id;
  } catch (error) {
    console.error("createStudioAction failed", error);
    return {
      ok: false,
      error: "Could not save to the database. Is MONGODB_URI configured?",
    };
  }

  // Keep the home page's featured section fresh.
  revalidatePath("/");
  return { ok: true, id: insertedId };
}

// Image upload — forwards a base64-encoded image to imgbb and returns a
// hosted URL. Keeps IMGBB_API_KEY server-side.
export async function uploadImageAction(imageBase64) {
  const key = process.env.IMGBB_API_KEY;
  if (!key) {
    return { ok: false, error: "IMGBB_API_KEY is not configured on the server." };
  }
  if (typeof imageBase64 !== "string" || imageBase64.length < 64) {
    return { ok: false, error: "Invalid image data." };
  }

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ image: imageBase64 }),
    });
    const result = await response.json();

    if (!result?.success || !result?.data?.url) {
      return { ok: false, error: result?.error?.message ?? "imgbb upload failed." };
    }

    // imgbb expires the default `url` form; `display_url` is the persistent one.
    return { ok: true, url: result.data.display_url ?? result.data.url };
  } catch (error) {
    console.error("uploadImageAction failed", error);
    return { ok: false, error: "Image upload failed. Try again or paste a URL." };
  }
}
