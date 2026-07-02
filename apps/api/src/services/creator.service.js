const User = require("../models/User");
const Note = require("../models/Note");
const LibraryRecommendation = require("../models/LibraryRecommendation");

const getPublicCreatorProfile = async (pseudo) => {
  const creator = await User.findOne({
    pseudo,
    isDeleted: false,
    role: { $in: ["creator", "admin"] },
  }).select("_id pseudo role createdAt");

  if (!creator) {
    throw new Error("CREATOR_NOT_FOUND");
  }

  const [notes, books] = await Promise.all([
    Note.find({
      author: creator._id,
      status: "published",
      isDeleted: false,
    })
      .select("_id title excerpt slug category cloudColor createdAt")
      .sort({ createdAt: -1 }),

    LibraryRecommendation.find({
      recommendedBy: creator._id,
      status: "published",
      isDeleted: false,
    })
      .select(
        "_id title author coverImageUrl subject universe readingStatus status createdAt",
      )
      .sort({ createdAt: -1 }),
  ]);

  return {
    _id: creator._id,
    pseudo: creator.pseudo,
    role: creator.role,
    createdAt: creator.createdAt,
    notes,
    books,
  };
};

module.exports = {
  getPublicCreatorProfile,
};
