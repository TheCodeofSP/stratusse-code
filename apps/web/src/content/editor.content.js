import { CONTENT_CATEGORIES } from "../constants/contentCategories";
export const editorContent = {
  writings: {
    hero: {
      eyebrow: "Espace des Voix",
      title: "Déposer son regard",
      introduction:
        "Sur Stratusse, écrire ne signifie pas aller vite. C’est prendre le temps de déposer une pensée, une expérience ou une lecture qui mérite une place.",
    },

    visitor: {
      title: "Commencer par découvrir la Safe Place",
      text: [
        "Pour participer aux échanges sur Stratusse, il faut d’abord devenir membre.",
        "Cela permet de préserver un espace calme, humain et respectueux.",
        "Une fois connecté, tu pourras lire, répondre, aimer les regards qui te parlent, puis demander à devenir une Voix si tu souhaites déposer tes propres Notes ou partager tes lectures.",
      ],
      primaryLabel: "Devenir membre",
      primaryTo: "/register",
      secondaryLabel: "Se connecter",
      secondaryTo: "/login",
    },

    observer: {
      eyebrow: "Avant de déposer",
      title: "L’écriture commence souvent par l’écoute.",
      text: [
        "Sur Stratusse, chacun commence par découvrir la Safe Place, lire les regards des autres et comprendre l’esprit dans lequel ils sont partagés.",
        "Déposer une Note ou une Lecture n’est pas une course. C’est une étape que l’on choisit lorsqu’une pensée, une expérience ou une lecture cherche vraiment sa place.",
        "Si tu souhaites partager tes propres mots, tu peux faire une demande. Quelqu’un prendra réellement le temps de lire ton intention.",
      ],
      steps: [
        {
          title: "Découvrir",
          text: "Lire, explorer, répondre et réagir avec attention.",
        },
        {
          title: "Comprendre",
          text: "Découvrir l’esprit de la Safe Place et la manière dont les échanges sont protégés.",
        },
        {
          title: "Demander",
          text: "Formuler ton intention lorsque tu sens que tes mots ont trouvé leur place.",
        },
      ],
      buttonLabel: "Demander à devenir une Voix",
      buttonTo: "/profile/creator-request",
    },

    creator: {
      title: "Quel regard souhaites-tu déposer aujourd’hui ?",
      text: "Tu peux déposer une Note ou partager une lecture qui t’a laissé une trace.",
    },

    sections: {
      createEyebrow: "Déposer",
      createTitle: "Un nouveau regard",
      manageEyebrow: "Retrouver",
      manageTitle: "Un regard déjà commencé",
    },

    createNote: {
      title: "Déposer une Note",
      introduction:
        "Partager une réflexion, une expérience, une observation ou un questionnement.",
      buttonLabel: "Déposer une Note",
      buttonTo: "/editor/note",
    },

    createReading: {
      title: "Partager une Lecture",
      introduction:
        "Partager ce qu’un livre t’a laissé, déplacé ou permis de comprendre.",
      buttonLabel: "Partager une Lecture",
      buttonTo: "/editor/library",
    },

    notes: {
      title: "Mes Notes",
      introduction:
        "Retrouver les pensées en cours d’écriture ou déjà partagées.",
    },

    readings: {
      title: "Mes Lectures",
      introduction:
        "Retrouver les Expériences de Lecture en préparation ou déjà partagées.",
    },

    closing: {
      reflection:
        "Chaque regard commence par une pensée à laquelle on décide de donner une place.",
      signature: "— Stratusse",
    },
  },

  noteEditor: {
    page: {
      title: "Déposer une Note",
      subtitle: "Prends le temps. Écris ce qui mérite de trouver sa place.",
    },

    form: {
      titleLabel: "Titre",
      titlePlaceholder: "Ce qui mérite d’être nommé...",

      categoryLabel: "Catégorie",
      categoryPlaceholder: "Choisir une catégorie",

      excerptLabel: "Extrait",
      excerptPlaceholder: "Quelques mots pour ouvrir la porte à ta pensée.",

      contentLabel: "Ta Note",
      contentPlaceholder: "Dépose ici ce qui te traverse...",

      submitLabel: "Partager la Note",
      updateLabel: "Mettre à jour",
      draftLabel: "Garder en brouillon",

      loadError: "Impossible de charger cette Note.",
      submitError: "Impossible d’enregistrer cette Note.",

      draftSuccess: "Brouillon enregistré.",
      draftButtonLabel: "Garder le brouillon",

      submittingLabel: "Enregistrement...",
      publishedUpdateLabel: "Enregistrer les modifications",
      publishButtonLabel: "Partager",

      publishError: "Impossible de partager la Note.",
      draftError: "Impossible d’enregistrer le brouillon.",

      backLabel: "Retour à l’espace des Voix",
      backTo: "/editor",

      cloudColor: "#2f4a3a",
    },

    categories: CONTENT_CATEGORIES,
  },

  libraryEditor: {
    page: {
      title: "Partager une Lecture",
      subtitle: "Transmets ce qu’un livre a laissé en toi.",
    },

    form: {
      titleLabel: "Titre du livre",
      titlePlaceholder: "Le livre qui t’a marqué(e)...",

      authorLabel: "Auteur",
      authorPlaceholder: "Nom de l’auteur",

      subjectLabel: "Sujet principal",
      subjectPlaceholder: "De quoi parle ce livre ?",

      universeLabel: "Univers",
      universePlaceholder: "Roman, poésie, psychologie, fantasy...",

      universePlaceholderSelect: "Choisir un univers",

      opinionLabel: "Ton regard",
      opinionPlaceholder: "Ce que cette lecture a fait naître chez toi...",

      whyRecommendLabel: "Pourquoi partager cette lecture ?",

      whyRecommendPlaceholder:
        "Ce que cette lecture t’a laissé, déplacé ou permis de comprendre.",

      readingStatusLabel: "Avancée de lecture",

      readingStatusPlaceholder: "Choisir une avancée",

      submitLabel: "Partager la Lecture",
      updateLabel: "Mettre à jour",
      draftLabel: "Garder en brouillon",

      startedBecauseLabel: "Pourquoi as-tu commencé ce livre ?",

      startedBecausePlaceholder:
        "Qu’est-ce qui t’a donné envie de l’ouvrir, maintenant ?",

      readingExpectationLabel: "Qu’attends-tu de cette lecture ?",

      readingExpectationPlaceholder:
        "Une réponse, une émotion, une compréhension, une évasion...",

      abandonedReasonLabel: "Pourquoi as-tu arrêté cette lecture ?",

      abandonedReasonPlaceholder:
        "À quel moment as-tu senti que tu ne voulais plus continuer ?",

      disappointmentLabel: "Qu’est-ce qui t’a déçu ?",

      disappointmentPlaceholder:
        "Le rythme, le sujet, l’écriture, le fond, l’écart avec tes attentes...",

      loadError: "Impossible de charger cette Lecture.",

      submitError: "Impossible d’enregistrer cette Lecture.",

      draftSuccess: "Brouillon enregistré.",

      draftButtonLabel: "Garder le brouillon",

      submittingLabel: "Enregistrement...",

      publishedUpdateLabel: "Enregistrer les modifications",

      publishButtonLabel: "Partager",

      draftError: "Impossible d’enregistrer le brouillon.",

      publishError: "Impossible de partager la Lecture.",

      backTo: "/editor",
      backLabel: "Retour à l’espace des Voix",
    },

    readingStatuses: [
      {
        label: "En cours",
        value: "reading",
      },
      {
        label: "Terminé",
        value: "finished",
      },
      {
        label: "Abandonné",
        value: "abandoned",
      },
    ],

    universes: CONTENT_CATEGORIES,
  },

  publicationSuccess: {
    note: {
      eyebrow: "Note partagée",
      icon: "🌿",
      title: "Merci d’avoir déposé ton regard.",
      text: [
        "Tes mots ont désormais trouvé leur place.",
        "Peut-être qu’ils feront écho chez quelqu’un d’autre.",
      ],
      primaryAction: "Découvrir ma Note",
      secondaryAction: "Retour à mes Notes",
      homeAction: "Retour à l’accueil",
    },

    library: {
      eyebrow: "Lecture partagée",
      icon: "📚",
      title: "Merci d’avoir partagé cette lecture.",
      text: [
        "Ton expérience rejoint désormais la Bibliothèque.",
        "Peut-être qu’elle accompagnera le cheminement de quelqu’un d’autre.",
      ],
      primaryAction: "Découvrir ma Lecture",
      secondaryAction: "Retour à mes Lectures",
      homeAction: "Retour à l’accueil",
    },
  },
};
