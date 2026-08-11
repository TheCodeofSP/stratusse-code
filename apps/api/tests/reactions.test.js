const assert = require("node:assert/strict");
const { afterEach, describe, it, mock } = require("node:test");

const Comment = require("../src/models/Comment");
const LibraryComment = require("../src/models/LibraryComment");
const LibraryRecommendation = require("../src/models/LibraryRecommendation");
const Note = require("../src/models/Note");

const { likeComment } = require("../src/services/comment.service");
const {
  likeLibraryComment,
} = require("../src/services/libraryComment.service");
const { likeBook } = require("../src/services/library.service");
const { likeNote } = require("../src/services/note.service");

const ownerId = "owner-id";

const ownReactionTarget = (authorField) => ({
  [authorField]: ownerId,
  isDeleted: false,
  likedBy: [],
  save: mock.fn(async () => undefined),
});

afterEach(() => {
  mock.restoreAll();
});

describe("protection contre l’auto-résonance", () => {
  it("refuse qu’une Voix aime sa propre Note", async () => {
    mock.method(Note, "findOne", async () => ownReactionTarget("author"));

    await assert.rejects(
      likeNote("note-id", ownerId),
      /SELF_REACTION_NOT_ALLOWED/,
    );
  });

  it("refuse qu’une Voix aime sa propre Lecture", async () => {
    mock.method(
      LibraryRecommendation,
      "findOne",
      async () => ownReactionTarget("recommendedBy"),
    );

    await assert.rejects(
      likeBook("book-id", ownerId),
      /SELF_REACTION_NOT_ALLOWED/,
    );
  });

  it("refuse qu’un membre aime sa propre réponse à une Note", async () => {
    mock.method(
      Comment,
      "findById",
      async () => ownReactionTarget("author"),
    );

    await assert.rejects(
      likeComment("comment-id", ownerId),
      /SELF_REACTION_NOT_ALLOWED/,
    );
  });

  it("refuse qu’un membre aime sa propre réponse à une Lecture", async () => {
    mock.method(
      LibraryComment,
      "findById",
      async () => ownReactionTarget("author"),
    );

    await assert.rejects(
      likeLibraryComment("comment-id", ownerId),
      /SELF_REACTION_NOT_ALLOWED/,
    );
  });
});
