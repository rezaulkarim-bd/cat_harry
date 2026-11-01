import { MongoClient } from "mongodb";

// Shared MongoClient singleton (kept on globalThis so dev-server hot reloads
// don't open a new connection pool per request).
const cache = globalThis;

export function isMongoConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

export async function getMongoDb() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
  }

  cache.__mongoDbPromise ??= (async () => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    cache.__mongoClient = client;
    return client.db(process.env.MONGODB_DB ?? "studiospace");
  })();

  // If the cached connection attempt failed, retry next time instead of
  // caching the rejection forever.
  try {
    return await cache.__mongoDbPromise;
  } catch (error) {
    cache.__mongoDbPromise = undefined;
    throw error;
  }
}

export const STUDIOS_COLLECTION = "studios";
