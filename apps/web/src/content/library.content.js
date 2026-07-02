import { CONTENT_CATEGORIES } from "../constants/contentCategories";
export const libraryContent = {
  hero: {
    eyebrow: "Bibliothèque",
    title: "Découvrir des Expériences de Lecture.",
    introduction: [
      "La Bibliothèque rassemble les Expériences de Lecture partagées par les Voix de Stratusse.",
      "Chaque livre est raconté à travers le regard de la personne qui l'a lu, plutôt qu'à travers une simple recommandation.",
    ],
  },

  search: {
    label: "Rechercher",
    placeholder: "Titre, auteur ou sujet...",
  },

  filters: {
    title: "Explorer la Bibliothèque",
    statusTitle: "Statut",
    allLabel: "Tous",

    statuses: [
      { value: "reading", label: "En cours" },
      { value: "finished", label: "Terminée" },
      { value: "abandoned", label: "Abandonnée" },
    ],

    universes: CONTENT_CATEGORIES,
    
    viewTitle: "Afficher",

    views: {
      feelings: "Par regards",
      books: "Par livres",
      people: "Par Voix",
    },
  },

  states: {
    loading: "Les regards prennent doucement place...",
    loadError: "Impossible de charger la Bibliothèque.",

    detailLoading: "Ouverture de cette lecture...",
    detailLoadError: "Impossible de charger cette lecture.",

    notFoundTitle: "Lecture introuvable",
    notFoundText:
      "Cette expérience de lecture n'existe pas ou n'est plus disponible.",
  },

  emptyState: {
    icon: "📖",
    title: "Aucune lecture ne correspond à ta recherche.",
    text: "Essaie un autre mot ou explore un autre univers.",
  },

  count: {
    singular: "lecture à découvrir",
    plural: "lectures à découvrir",
  },

  listIntro: {
    text: [
      "Chaque lecture laisse une trace différente.",
      "Découvre les livres qui ont accompagné, déplacé ou questionné les Voix de Stratusse.",
    ],
  },

  card: {
    statusLabels: {
      reading: "Lecture en cours de ",
      finished: "Lecture terminée de ",
      abandoned: "Lecture abandonnée de ",
    },

    actionLabel: "Découvrir ce regard",

    authorPrefix: "de ",
  },

  detail: {
    statusLabels: {
      reading: "Lecture en cours de ",
      finished: "Lecture terminée de ",
      abandoned: "Lecture abandonnée de ",
    },

    sectionLabels: {
      subject: "Sujet",
      universe: "Univers",
      startedBecause: "Pourquoi cette lecture",
      readingExpectation: "Ce que j'espère y trouver",
      opinion: "Mon regard",
      whyRecommend: "Pourquoi partager cette lecture",
      abandonedReason: "Pourquoi je me suis arrêté",
      disappointment: "Ce qui n'a pas résonné",
    },

    introPrefix: "Le regard de",
    introSuffix: "sur cette lecture.",

    sharedByPrefix: "Partagé par",

    authorPrefix: "de",

    creatorLinkPrefix: "Découvrir les autres regards de",

    likeLoginMessage:
      "Connecte-toi pour dire que cette lecture résonne avec toi.",

    ownReadingMessage:
      "Cette lecture est la tienne. Les résonances appartiennent aux autres regards.",

    likeLabel: "Cette lecture résonne avec moi",
  },

  closing: {
    reflection:
      "Certaines lectures continuent de nous accompagner bien après la dernière page.",
    signature: "— Stratusse",
  },
};
