export const CONTENT_CATEGORIES = [
  {
    value: "self_understanding",
    label: "🌱 Se comprendre",
  },
  {
    value: "others",
    label: "🤝 Les autres",
  },
  {
    value: "world",
    label: "🌍 Le monde",
  },
  {
    value: "powers_influences",
    label: "⚖️ Pouvoirs & influences",
  },
  {
    value: "crossings",
    label: "🌅 Traversées",
  },
  {
    value: "imaginary",
    label: "✨ Imaginaire",
  },
  {
    value: "transmission",
    label: "📚 Transmettre",
  },
  {
    value: "other",
    label: "🍂 Autres",
  },
];

export const CONTENT_CATEGORY_LABELS = CONTENT_CATEGORIES.reduce(
  (acc, category) => {
    acc[category.value] = category.label;
    return acc;
  },
  {},
);

export function getContentCategoryLabel(value) {
  return CONTENT_CATEGORY_LABELS[value] || value;
}