import type { WordResponse } from "../types/word_response";

const BASE_URL = "https://jlpt-vocab-api.vercel.app/api";

export async function getWordsByLevel(
  level: number = 5,
): Promise<WordResponse[]> {
  // random offset between 0 and 100
  const offset = Math.floor(Math.random() * 100);

  const response = await fetch(
    `${BASE_URL}/words?level=${level}&limit=10&offset=${offset}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch words");
  }

  const data = await response.json();
  return data.words;
}
