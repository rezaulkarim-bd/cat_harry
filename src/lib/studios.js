import { getMongoDb, isMongoConfigured, STUDIOS_COLLECTION } from "@/lib/mongo";
import { SAMPLE_STUDIOS } from "@/lib/studios-data";

function mapStudioDoc(doc) {
  return {
    _id: String(doc._id),
    title: doc.title,
    category: doc.category,
    hourlyRate: doc.hourlyRate,
    securityDeposit: doc.securityDeposit,
    maxCapacity: doc.maxCapacity,
    rating: doc.rating,
    reviews: doc.reviews,
    location: doc.location,
    image: doc.image,
    accent: doc.accent,
    isNew: doc.isNew,
    hostName: doc.hostName,
    hostEmail: doc.hostEmail,
    amenities: doc.amenities,
    overview: doc.overview,
  };
}

// Feature 6 top-rated (or newest) studio spaces for the home page.
// Falls back to sample data when MongoDB is not configured, the collection
// is empty, or the connection fails, so the home page always renders.
export async function getFeaturedStudios() {
  if (!isMongoConfigured()) return SAMPLE_STUDIOS;

  try {
    const db = await getMongoDb();
    const documents = await db
      .collection(STUDIOS_COLLECTION)
      .find({})
      .sort({ rating: -1, createdAt: -1 })
      .limit(6)
      .toArray();

    if (documents.length === 0) return SAMPLE_STUDIOS;
    return documents.map(mapStudioDoc);
  } catch (error) {
    console.error("getFeaturedStudios: falling back to sample data", error);
    return SAMPLE_STUDIOS;
  }
}

// CREATE — inserts a studio submitted from /add-studio. Server actions run
// at request time, so `new Date()` is allowed here.
export async function createStudio(input) {
  const db = await getMongoDb();
  const doc = {
    ...input,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await db.collection(STUDIOS_COLLECTION).insertOne(doc);
  return { ok: true, id: String(result.insertedId) };
}

// READ (list) — used by the private /my-listings route.
export async function getStudiosByHostEmail(hostEmail) {
  if (!isMongoConfigured()) return [];
  try {
    const db = await getMongoDb();
    const documents = await db
      .collection(STUDIOS_COLLECTION)
      .find({ hostEmail })
      .sort({ createdAt: -1 })
      .limit(20)
      .toArray();
    return documents.map(mapStudioDoc);
  } catch (error) {
    console.error("getStudiosByHostEmail failed", error);
    return [];
  }
}
