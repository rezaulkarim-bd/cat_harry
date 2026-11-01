import { MongoClient } from "mongodb";
import { SAMPLE_STUDIOS } from "@/lib/studios-data";

// Feature 6 top-rated (or newest) studio spaces for the home page.
// - Set MONGODB_URI to read live data from the `studios` collection.
// - Falls back to sample data when the URI is missing, the DB is empty, or
//   the connection fails, so the home page always renders.
// - TODO: for production, keep a singleton MongoClient on globalThis instead
//   of connecting per call under load.
export async function getFeaturedStudios() {
  const uri = process.env.MONGODB_URI;
  if (!uri) return SAMPLE_STUDIOS;

  let client;
  try {
    client = new MongoClient(uri);
    await client.connect();
    const documents = await client
      .db()
      .collection("studios")
      .find({})
      .sort({ rating: -1, createdAt: -1 })
      .limit(6)
      .toArray();

    if (documents.length === 0) return SAMPLE_STUDIOS;

    return documents.map((doc) => ({
      _id: String(doc._id),
      title: doc.title,
      category: doc.category,
      hourlyRate: doc.hourlyRate,
      rating: doc.rating,
      reviews: doc.reviews,
      location: doc.location,
      image: doc.image,
      accent: doc.accent,
      isNew: doc.isNew,
    }));
  } catch (error) {
    console.error("getFeaturedStudios: falling back to sample data", error);
    return SAMPLE_STUDIOS;
  } finally {
    await client?.close();
  }
}
