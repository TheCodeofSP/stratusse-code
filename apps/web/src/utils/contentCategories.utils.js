export const contentCategories = {
  self_understanding: "Se comprendre",
  others: "Les autres",
  world: "Le monde",
  powers_influences: "Pouvoirs & influences",
  crossings: "Traversées",
  imaginary: "Imaginaire",
  transmission: "Transmettre",
  other: "Autres",
};

export function getContentCategoryLabel(category) {
  return contentCategories[category] || category;
}