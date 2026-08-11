require("dotenv").config();

const mongoose = require("mongoose");

const LibraryRecommendation = require("../src/models/LibraryRecommendation");

const LEGACY_INDEX = "normalizedTitle_1_normalizedAuthor_1";
const VOICE_INDEX = "normalizedTitle_1_normalizedAuthor_1_recommendedBy_1";

const migrate = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI est obligatoire pour lancer la migration.");
  }

  await mongoose.connect(process.env.MONGO_URI);

  const indexes = await LibraryRecommendation.collection.indexes();
  const indexNames = new Set(indexes.map((index) => index.name));

  if (!indexNames.has(VOICE_INDEX)) {
    await LibraryRecommendation.collection.createIndex(
      { normalizedTitle: 1, normalizedAuthor: 1, recommendedBy: 1 },
      { name: VOICE_INDEX, unique: true },
    );
  }

  if (indexNames.has(LEGACY_INDEX)) {
    await LibraryRecommendation.collection.dropIndex(LEGACY_INDEX);
  }

  console.log("Index de la Bibliothèque mis à jour.");
};

migrate()
  .catch((error) => {
    console.error("Échec de la migration :", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
