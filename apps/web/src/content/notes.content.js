import { CONTENT_CATEGORIES } from "../constants/contentCategories";
export const notesContent = {
  hero: {
    eyebrow: "Notes",
    title: "Découvrir les Notes déposées.",
    introduction: [
      "Les Notes rassemblent des réflexions, des expériences et des questionnements déposés par les Voix de Stratusse.",
      "Chacune raconte une manière de voir, de ressentir ou de comprendre ce qui nous entoure.",
    ],
  },

  search: {
    placeholder: "Rechercher par titre, Voix ou sujet",
  },

  filters: {
    title: "Explorer par thème",
    allLabel: "Tous",
    categories: CONTENT_CATEGORIES,
  },

  states: {
    loading: "Stratusse rassemble les pensées...",
    detailLoading: "Stratusse ouvre cette Note...",
    loadError: "Impossible de charger les Notes.",
    detailLoadError: "Impossible de charger cette Note.",
    notFoundTitle: "Note introuvable",
    notFoundText: "Cette Note n’existe pas ou n’est plus disponible.",
  },

  emptyState: {
    icon: "☁️",
    title: "Aucune Note ne correspond à ta recherche.",
    text: "Essaie un autre mot ou explore un autre thème.",
  },

  listIntro: {
    text: [
      "Chaque Note est une invitation à découvrir le regard d’une autre personne.",
      "Prends le temps de parcourir celles qui résonnent avec toi.",
    ],
  },

  count: {
    singular: "Note à découvrir",
    plural: "Notes à découvrir",
  },

  card: {
    authorPrefix: "Déposée par",
    actionLabel: "Lire cette Note",
  },

  detail: {
    authorPrefix: "Déposée par",
    signaturePrefix: "Signé :",
    creatorLinkPrefix: "Découvrir ces autres pensées",
    likeLoginMessage: "Connecte-toi pour dire que cette Note résonne avec toi.",
    ownNoteMessage:
      "Cette Note est la tienne. Les résonances appartiennent aux autres regards.",
    likeLabel: "Cette Note résonne avec moi",
  },

  comments: {
    loading: "Les regards autour de cette Note arrivent...",
    loadError: "Impossible de charger les échanges.",
    title: "Regards autour de cette Note",
    invitationTitle: "Partager ton regard",
    invitationText:
      "Si cette Note fait écho à quelque chose en toi, tu peux le déposer ici.",
  },

  closing: {
    reflection: "Une pensée déposée peut parfois faire écho à la nôtre.",
    signature: "— Stratusse",
  },
};
