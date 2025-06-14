import fs from "fs";

/**
 * @param {string} filePath - .jsonl file path
 * @returns {{ username: string, password: string }} - Login data
 */
export function getRandomUserCredentials(filePath = "user_data.jsonl") {
  const lines = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .filter((line) => line.trim().length > 0);

  if (lines.length === 0) {
    throw new Error("Plik JSONL jest pusty lub nie zawiera poprawnych danych.");
  }

  const randomLine = lines[Math.floor(Math.random() * lines.length)];

  try {
    const user = JSON.parse(randomLine);
    return {
      username: user.username,
      password: user.password,
    };
  } catch (err) {
    throw new Error(`Błąd parsowania JSONL: ${err.message}`);
  }
}
