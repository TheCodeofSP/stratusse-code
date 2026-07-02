import { getContentCategoryLabel } from "../constants/contentCategories.js";

export const bookReadingStatusLabels = {
  to_read: "À lire",
  reading: "En cours",
  finished: "Terminé",
  abandoned: "Abandonné",
};

const lowercaseWords = ["de", "du", "des", "le", "la", "les", "l", "d"];
export const getBookUniverseLabel = getContentCategoryLabel;

export function getReadingStatusLabel(status) {
  return bookReadingStatusLabels[status] || status;
}

export function formatBookText(value) {
  if (!value) return "";

  return value
    .trim()
    .toLowerCase()
    .split(/(\s+|-|')/)
    .map((part, index) => {
      if (/^\s+$/.test(part) || part === "-" || part === "'") {
        return part;
      }

      if (index !== 0 && lowercaseWords.includes(part)) {
        return part;
      }

      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join("");
}
