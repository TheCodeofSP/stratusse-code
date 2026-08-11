const assert = require("node:assert/strict");
const { afterEach, describe, it, mock } = require("node:test");

const LibraryRecommendation = require("../src/models/LibraryRecommendation");
const Note = require("../src/models/Note");
const { createBook, updateBook } = require("../src/services/library.service");
const { createNote } = require("../src/services/note.service");

const owner = {
  _id: "owner-id",
  role: "creator",
};

const createBookDocument = (overrides = {}) => ({
  _id: "book-id",
  title: "Nos étoiles contraires",
  author: "John Green",
  normalizedTitle: "nos etoiles contraires",
  normalizedAuthor: "john green",
  subject: "Une Lecture sur la maladie et l’attachement.",
  universe: "world",
  opinion: "",
  whyRecommend: "",
  startedBecause: "",
  readingExpectation: "",
  abandonedReason: "",
  disappointment: "",
  readingStatus: "finished",
  status: "draft",
  hasBeenPublished: false,
  recommendedBy: owner._id,
  isDeleted: false,
  save: mock.fn(async () => undefined),
  ...overrides,
});

afterEach(() => {
  mock.restoreAll();
});

describe("publication initiale d’une Note", () => {
  it("enregistre et verrouille l’historique de publication", async () => {
    let createdPayload;

    mock.method(Note, "findOne", async () => null);
    mock.method(Note, "create", async (payload) => {
      createdPayload = payload;
      return payload;
    });

    await createNote({
      title: "Une pensée déposée",
      excerpt: "Une introduction suffisamment longue.",
      content: "Un regard suffisamment long pour être partagé.",
      category: "world",
      cloudColor: "#285047",
      status: "published",
      author: owner._id,
    });

    assert.equal(createdPayload.hasBeenPublished, true);
    assert.ok(createdPayload.firstPublishedAt instanceof Date);
    assert.ok(createdPayload.lastPublishedAt instanceof Date);
  });
});

describe("publication d’une Lecture", () => {
  it("refuse de publier un brouillon incomplet", async () => {
    mock.method(LibraryRecommendation, "findById", async () =>
      createBookDocument(),
    );

    await assert.rejects(
      updateBook("book-id", { status: "published" }, owner),
      /INVALID_PUBLICATION/,
    );
  });

  it("publie un brouillon complet et date sa première publication", async () => {
    const book = createBookDocument({
      opinion: "Cette Lecture a déplacé mon regard.",
      whyRecommend: "Elle aborde son sujet avec beaucoup de justesse.",
    });

    mock.method(LibraryRecommendation, "findById", async () => book);

    const result = await updateBook("book-id", { status: "published" }, owner);

    assert.equal(result.status, "published");
    assert.equal(result.hasBeenPublished, true);
    assert.ok(result.firstPublishedAt instanceof Date);
    assert.ok(result.lastPublishedAt instanceof Date);
    assert.equal(book.save.mock.callCount(), 1);
  });

  it("recherche les doublons uniquement parmi les Lectures de la même Voix", async () => {
    let duplicateQuery;
    const createdBook = {
      populate: mock.fn(async () => createdBook),
    };

    mock.method(LibraryRecommendation, "findOne", async (query) => {
      duplicateQuery = query;
      return null;
    });
    mock.method(LibraryRecommendation, "create", async () => createdBook);

    await createBook({
      title: "Nos étoiles contraires",
      author: "John Green",
      subject: "Une Lecture sur la maladie et l’attachement.",
      universe: "world",
      readingStatus: "finished",
      status: "draft",
      recommendedBy: owner._id,
    });

    assert.equal(duplicateQuery.recommendedBy, owner._id);
  });
});
