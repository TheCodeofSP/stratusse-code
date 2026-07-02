const Note = require("../models/Note");
const LibraryRecommendation = require("../models/LibraryRecommendation");
const Comment = require("../models/Comment");
const LibraryComment = require("../models/LibraryComment");

const { createAdminActionLog } = require("./adminActionLog.service");

const DEFAULT_PUBLIC_MESSAGE = "Contenu supprimé par la modération.";

const modelMap = {
  note: Note,
  book: LibraryRecommendation,
  comment: Comment,
  libraryComment: LibraryComment,
};

const actionTypeMap = {
  note: "ARTICLE_DELETED",
  book: "BOOK_DELETED",
  comment: "COMMENT_DELETED",
  libraryComment: "BOOK_COMMENT_DELETED",
};

const getTargetUser = (contentType, document) => {
  if (contentType === "note") return document.author;
  if (contentType === "book") return document.recommendedBy;
  if (contentType === "comment") return document.author;
  if (contentType === "libraryComment") return document.author;

  return null;
};

const moderateContent = async ({
  contentType,
  contentId,
  adminId,
  reason,
  adminComment,
}) => {
  const Model = modelMap[contentType];

  if (!Model) {
    throw new Error("INVALID_CONTENT_TYPE");
  }

  const document = await Model.findById(contentId);

  if (!document || document.isDeleted) {
    throw new Error("CONTENT_NOT_FOUND");
  }

  document.isDeleted = true;

  document.moderation = {
    reason,
    publicMessage: DEFAULT_PUBLIC_MESSAGE,
    adminComment,
    moderatedBy: adminId,
    moderatedAt: new Date(),
  };

  await document.save();

  await createAdminActionLog({
    admin: adminId,
    targetUser: getTargetUser(contentType, document),
    actionType: actionTypeMap[contentType],
    comment: adminComment,
    metadata: {
      contentType,
      contentId: document._id,
      reason,
      publicMessage: DEFAULT_PUBLIC_MESSAGE,
    },
  });

  return document;
};

module.exports = {
  moderateContent,
};
