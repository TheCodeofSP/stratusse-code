const assert = require("node:assert/strict");
const { afterEach, describe, it, mock } = require("node:test");

const Note = require("../src/models/Note");
const LibraryRecommendation = require("../src/models/LibraryRecommendation");
const { updateNote, deleteNote } = require("../src/services/note.service");
const {
  updateBook,
  deleteLibrary,
} = require("../src/services/library.service");

const owner = {
  _id: "owner-id",
  role: "creator",
};

const otherCreator = {
  _id: "other-id",
  role: "creator",
};

const admin = {
  _id: "admin-id",
  role: "admin",
};

const createNoteDocument = () => ({
  _id: "note-id",
  author: "owner-id",
  status: "draft",
  hasBeenPublished: false,
  isDeleted: false,
  save: mock.fn(async () => undefined),
});

const createBookDocument = () => ({
  _id: "book-id",
  recommendedBy: "owner-id",
  title: "Titre",
  author: "Autrice",
  status: "draft",
  hasBeenPublished: false,
  isDeleted: false,
  save: mock.fn(async () => undefined),
});

afterEach(() => {
  mock.restoreAll();
});

describe("autorisations des notes", () => {
  it("refuse la modification par une autre créatrice", async () => {
    mock.method(Note, "findById", async () => createNoteDocument());

    await assert.rejects(
      updateNote("note-id", { excerpt: "Nouveau contenu" }, otherCreator),
      /FORBIDDEN/,
    );
  });

  it("autorise la modification par la propriétaire", async () => {
    const note = createNoteDocument();
    mock.method(Note, "findById", async () => note);

    const result = await updateNote(
      "note-id",
      { excerpt: "Nouveau contenu" },
      owner,
    );

    assert.equal(result.excerpt, "Nouveau contenu");
    assert.equal(note.save.mock.callCount(), 1);
  });

  it("autorise la suppression par une administratrice", async () => {
    const note = createNoteDocument();
    mock.method(Note, "findById", async () => note);

    await deleteNote("note-id", admin);

    assert.equal(note.isDeleted, true);
    assert.equal(note.save.mock.callCount(), 1);
  });
});

describe("autorisations de la bibliothèque", () => {
  it("refuse la modification par une autre créatrice", async () => {
    mock.method(
      LibraryRecommendation,
      "findById",
      async () => createBookDocument(),
    );

    await assert.rejects(
      updateBook("book-id", { subject: "Nouveau sujet" }, otherCreator),
      /FORBIDDEN/,
    );
  });

  it("autorise la modification par la propriétaire", async () => {
    const book = createBookDocument();
    mock.method(LibraryRecommendation, "findById", async () => book);

    const result = await updateBook(
      "book-id",
      { subject: "Nouveau sujet" },
      owner,
    );

    assert.equal(result.subject, "Nouveau sujet");
    assert.equal(book.save.mock.callCount(), 1);
  });

  it("refuse la suppression par une autre créatrice", async () => {
    mock.method(
      LibraryRecommendation,
      "findById",
      async () => createBookDocument(),
    );

    await assert.rejects(
      deleteLibrary("book-id", otherCreator),
      /FORBIDDEN/,
    );
  });
});
