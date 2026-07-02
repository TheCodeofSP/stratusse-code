const Note = require("../models/Note");

const createSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

const createNote = async ({
  title,
  excerpt,
  content,
  category,
  cloudColor,
  status,
  author,
}) => {
  const slug = createSlug(title);

  const existingNote = await Note.findOne({ slug });

  if (existingNote) {
    throw new Error("ARTICLE_ALREADY_EXISTS");
  }

  const note = await Note.create({
    title,
    slug,
    excerpt,
    content,
    category,
    cloudColor,
    status,
    author,
  });

  return note;
};

const getPublishedNotes = async () => {
  const notes = await Note.find({
    status: "published",
    isDeleted: false,
  })
    .populate("author", "pseudo")
    .sort({ createdAt: -1 });

  return notes;
};

const getPublishedNoteBySlug = async (slug) => {
  const note = await Note.findOne({
    slug,
    status: "published",
    isDeleted: false,
  }).populate("author", "pseudo");

  return note;
};

const updateNote = async (noteId, updates) => {
  const note = await Note.findById(noteId);

  if (!note) {
    throw new Error("ARTICLE_NOT_FOUND");
  }

  const wasPublished = note.status === "published";
  const willBePublished = updates.status === "published";
  const wasDraft = note.status === "draft";

  if (note.hasBeenPublished && updates.title && updates.title !== note.title) {
    throw new Error("TITLE_LOCKED_AFTER_PUBLICATION");
  }

  if (!note.hasBeenPublished && updates.title && updates.title !== note.title) {
    const newSlug = createSlug(updates.title);

    const existingNote = await Note.findOne({
      slug: newSlug,
      _id: { $ne: noteId },
    });

    if (existingNote) {
      throw new Error("ARTICLE_ALREADY_EXISTS");
    }

    updates.slug = newSlug;
  }

  const contentFields = ["excerpt", "content", "category", "cloudColor"];
  const hasContentChanges = contentFields.some(
    (field) => updates[field] !== undefined && updates[field] !== note[field],
  );

  if (note.hasBeenPublished && hasContentChanges) {
    note.hasBeenModifiedAfterPublication = true;
  }

  if (!note.hasBeenPublished && wasDraft && willBePublished) {
    note.hasBeenPublished = true;
    note.firstPublishedAt = new Date();
    note.lastPublishedAt = new Date();
  }

  if (note.hasBeenPublished && !wasPublished && willBePublished) {
    note.lastPublishedAt = new Date();
  }

  Object.assign(note, updates);

  await note.save();

  return note;
};

const deleteNote = async (noteId) => {
  const note = await Note.findById(noteId);

  if (!note || note.isDeleted) {
    throw new Error("ARTICLE_NOT_FOUND");
  }

  note.isDeleted = true;

  await note.save();

  return note;
};

const getAllNotesForAdmin = async () => {
  const notes = await Note.find({
    isDeleted: false,
  });
  return notes;
};

const likeNote = async (noteId, userId) => {
  const note = await Note.findById(noteId);

  if (!note) {
    throw new Error("ARTICLE_NOT_FOUND");
  }

  const alreadyLiked = note.likedBy.some(
    (id) => id.toString() === userId.toString(),
  );

  if (!alreadyLiked) {
    note.likedBy.push(userId);
    await note.save();
  }

  return note;
};

const unlikeNote = async (noteId, userId) => {
  const note = await Note.findById(noteId);

  if (!note) {
    throw new Error("ARTICLE_NOT_FOUND");
  }

  note.likedBy = note.likedBy.filter(
    (id) => id.toString() !== userId.toString(),
  );

  await note.save();

  return note;
};

const getMyNotes = async (userId) => {
  const notes = await Note.find({
    author: userId,
    isDeleted: false,
  }).sort({ createdAt: -1 });

  return notes;
};

const getNoteById = async (noteId, currentUser) => {
  const note = await Note.findById(noteId);

  if (!note || note.isDeleted) {
    throw new Error("ARTICLE_NOT_FOUND");
  }

  const isAdmin = currentUser.role === "admin";
  const isOwner = note.author.toString() === currentUser._id.toString();

  if (!isAdmin && !isOwner) {
    throw new Error("FORBIDDEN");
  }

  return note;
};

module.exports = {
  createNote,
  getPublishedNotes,
  getPublishedNoteBySlug,
  updateNote,
  deleteNote,
  getAllNotesForAdmin,
  likeNote,
  unlikeNote,
  getMyNotes,
  getNoteById,
};
