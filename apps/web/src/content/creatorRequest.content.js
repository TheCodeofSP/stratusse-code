export const creatorRequestContent = {
  hero: {
    title: "Demander à devenir une Voix.",
    introduction: [
      "Sur Stratusse, chacun peut lire, aimer et répondre en tant que membre.",
      "Devenir une Voix permet de participer autrement : déposer ses propres Notes et partager ses Expériences de Lecture.",
      "Cette demande existe pour préserver une Safe Place sincère, calme et humaine.",
    ],
  },

  observer: {
    title: "Être membre",
    introduction:
      "Un membre participe déjà à la vie de Stratusse. Lire, aimer, répondre ou simplement prendre le temps de découvrir les regards des autres fait vivre la Safe Place.",
    actions: [
      "Lire les Notes.",
      "Explorer la Bibliothèque.",
      "Aimer les regards partagés.",
      "Répondre avec respect.",
    ],
  },

  creator: {
    title: "Devenir une Voix",
    introduction:
      "Une Voix peut déposer des Notes et partager des Expériences de Lecture. Elle ne vaut pas plus qu’un membre : elle choisit simplement une autre manière de contribuer.",
    actions: [
      "Déposer une Note.",
      "Partager une lecture.",
      "Transmettre un ressenti personnel.",
      "Prendre soin de l’esprit de la Safe Place.",
    ],
  },

  philosophy: {
    title: "Pourquoi cette demande existe ?",
    introduction:
      "La demande n’est pas un examen ni un jugement sur ton écriture. Elle permet de comprendre ton intention et de vérifier que l’esprit de Stratusse est compris avant de déposer un regard dans une Safe Place partagée.",
  },

  request: {
    title: "Ta demande",
    introduction:
      "Prends le temps de formuler ton intention. Elle sera lue par une vraie personne, avec attention.",
    buttonLabel: "Envoyer ma demande",
    buttonTo: "/profile/creator-request",
  },

  statuses: {
    pending: {
      title: "⏳ Demande en cours de lecture",
      text: "Merci pour ta confiance. Nous prenons le temps de lire chaque intention afin de préserver l’esprit de Stratusse.",
    },
    approved: {
      title: "✅ Tu es maintenant une Voix",
      text: "Tu peux désormais déposer des Notes et partager tes lectures sur Stratusse.",
    },
    rejected: {
      title: "Demande non acceptée pour le moment",
      text: "Ta demande n’a pas été acceptée pour le moment. Tu restes membre de Stratusse et tu pourras refaire une demande plus tard.",
    },
  },

  form: {
    motivationLabel: "Pourquoi souhaites-tu devenir une Voix sur Stratusse ?",
    contributionLabel: "Quel premier regard aimerais-tu partager ?",
    titlePlaceholder: "Titre ou idée principale (optionnel)",
    contentPlaceholder:
      "Partage une intention, un début de Note, une réflexion ou ce qu’une lecture a laissé en toi...",
    improvementIdeasLabel:
      "Y a-t-il quelque chose que tu aimerais voir évoluer sur Stratusse ?",
    submitLabel: "Envoyer ma demande",
    successMessage: "Ta demande a été envoyée. Merci pour ta confiance.",
    errorMessage: "Impossible d’envoyer la demande.",
  },

  closing: {
    reflection:
      "Devenir une Voix, c’est choisir de déposer son regard en prenant soin de la Safe Place qui l’accueille.",
    signature: "— Stratusse",
  },
};
