// pages/api/updateMovies.ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { fetchAndStoreMovies } from "../../libs/tmdbApi";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    // Fetch and store movies in MongoDB using Prisma
    await fetchAndStoreMovies(prisma);

    return res.status(200).json({ message: "Movies updated successfully." });
  } catch (error) {
    console.error("Error updating movies:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
