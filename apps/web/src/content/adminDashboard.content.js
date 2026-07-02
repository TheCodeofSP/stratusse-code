import { CONTENT_CATEGORY_LABELS } from "../constants/contentCategories";

export const adminDashboardContent = {
  header: {
    title: "Administration",
    subtitle:
      "Un espace pour accompagner, comprendre et préserver l’esprit de Stratusse.",
  },

  overview: {
    members: "Membres",
    creators: "Voix",
    notes: "Notes partagées",
    library: "Lectures partagées",
  },

  alert: {
    title: "Actions en attente",
    text: "demande(s) créateur à examiner.",
    actionLabel: "Ouvrir les demandes",
    to: "/admin/creator-requests",
  },

  sections: [
    {
      key: "notes",
      title: "Notes",
      icon: "🌿",
      description: "Modérer les Notes et les échanges autour des écrits.",
      stats: [
        { label: "Notes", valueKey: "notesCount" },
        { label: "Réponses", valueKey: "commentsCount" },
      ],
      links: [
        { label: "Voir les Notes", to: "/admin/content/notes" },
        { label: "Voir les commentaires", to: "/admin/content/comments" },
      ],
    },
    {
      key: "library",
      title: "Bibliothèque",
      icon: "📚",
      description:
        "Suivre les lectures partagées et les échanges qu’elles suscitent.",
      stats: [
        { label: "Lectures", valueKey: "booksCount" },
        { label: "Réponses", valueKey: "libraryCommentsCount" },
      ],
      links: [
        { label: "Voir les Lectures", to: "/admin/content/library" },
        {
          label: "Voir les commentaires",
          to: "/admin/content/library-comments",
        },
      ],
    },
    {
      key: "users",
      title: "Membres",
      icon: "👥",
      description: "Gérer les profils, les rôles et les demandes créateur.",
      stats: [
        { label: "Membres", valueKey: "usersCount" },
        { label: "Demandes en attente", valueKey: "creatorRequests.pending" },
        { label: "Comptes supprimés", valueKey: "deletedUsersCount" },
      ],
      links: [
        { label: "Voir les membres", to: "/admin/users" },
        {
          label: "Voir les demandes créateur",
          to: "/admin/creator-requests",
        },
      ],
    },
    {
      key: "history",
      title: "Historique",
      icon: "🕯️",
      description:
        "Consulter les actions administratives et garder une trace des décisions.",
      stats: [{ label: "Actions tracées", valueKey: "actionsCount" }],
      links: [{ label: "Voir l’historique admin", to: "/admin/actions" }],
    },
  ],

  footer: {
    backTo: "/",
    backLabel: "Retour à l’accueil",
  },

  creatorRequests: {
    loading: "Chargement des demandes...",

    header: {
      title: "Demandes créateur",
      subtitle:
        "Lire les intentions d’écriture avant validation, afin de préserver l’esprit de Stratusse.",
    },

    filters: [
      { value: "all", label: "Toutes" },
      { value: "pending", label: "En attente" },
      { value: "approved", label: "Acceptées" },
      { value: "rejected", label: "Refusées" },
    ],

    status: {
      pending: {
        label: "En attente",
        variant: "warning",
      },
      approved: {
        label: "Acceptée",
        variant: "success",
      },
      rejected: {
        label: "Refusée",
        variant: "danger",
      },
    },

    card: {
      read: "Lire la demande",
    },

    detail: {
      motivation: "Motivation",
      writingIntent: "Intentions d’écriture",
      notes: "Notes",
      library: "Lectures",
      firstContribution: "Proposition d’écriture",
      suggestions: "Suggestions Stratusse",
      noSuggestion: "Aucune suggestion",
    },

    decision: {
      title: "Réponse admin",
      placeholder:
        "Explique brièvement la décision. Ce commentaire permet de garder une trace claire.",
      approve: "Approuver",
      reject: "Refuser",
      approveSuccess: "Demande approuvée.",
      rejectSuccess: "Demande refusée.",
      approveError: "Impossible d’approuver la demande.",
      rejectError: "Impossible de refuser la demande.",
      required: "Ajoute un commentaire admin avant de valider une décision.",
    },

    footer: {
      backTo: "/admin",
      backLabel: "Retour au tableau de bord",
    },
  },
  users: {
    loading: "Chargement des membres...",

    header: {
      title: "Membres",
      subtitle:
        "Gérer les rôles, suivre les statuts et garder une trace des comptes supprimés.",
    },

    search: {
      placeholder: "Rechercher un pseudo ou un email...",
    },

    filters: [
      { value: "all", label: "Tous" },
      { value: "observer", label: "Membres" },
      { value: "creator", label: "Voix" },
      { value: "admin", label: "Administrateurs" },
      { value: "deleted", label: "Comptes supprimés" },
    ],

    status: {
      deleted: {
        label: "Compte supprimé",
        variant: "danger",
      },
      admin: {
        label: "Administrateur",
        variant: "info",
      },
      creator: {
        label: "Voix",
        variant: "success",
      },
      observer: {
        label: "Membre",
        variant: "default",
      },
    },

    card: {
      deletedAtPrefix: "Supprimé le",
      registeredAtPrefix: "Inscrit le",
      approvedCreator: "Voix approuvé",
      approvedByPrefix: "Par",
      fallbackAdmin: "Admin",
    },

    footer: {
      backTo: "/admin",
      backLabel: "Retour au tableau de bord",
    },
  },
  vocabulary: {
    member: "Membre",
    members: "Membres",

    observer: "Membre",
    creator: "Voix",
    administrator: "Administrateur",

    note: "Note",
    notes: "Notes",

    reading: "Lecture",
    readings: "Lectures",

    comment: "Réponse",
    comments: "Réponses",

    deletedAccount: "Compte supprimé",

    approve: "Approuver",
    reject: "Refuser",

    view: "Voir",
    edit: "Modifier",
    delete: "Supprimer",

    roles: {
      observer: "Membre",
      creator: "Voix",
      admin: "Administrateur",
    },
  },
  userDetail: {
    loading: "Chargement de la fiche membre...",
    notFound: "Membre introuvable.",

    header: {
      eyebrow: "Fiche membre",
    },

    sections: {
      information: "Informations",
      activity: "Activité du profil",
      roleChange: "Changer le rôle",
      history: "Historique admin",
    },

    fields: {
      role: "Rôle",
      registeredAt: "Inscription",
      emailVerified: "Email vérifié",
      emailVerifiedAt: "Email vérifié le",
      deletedAccount: "Compte supprimé",
      deletedAt: "Supprimé le",
      deletionComment: "Réponse suppression",
    },

    values: {
      yes: "Oui",
      no: "Non",
    },

    activity: {
      notes: "Notes",
      library: "Lectures",
      comments: "Réponses",
      libraryComments: "Réponses Bibliothèque",
    },

    role: {
      current: "Rôle actuel",
      changeAction: "Changer le rôle",
    },

    history: {
      empty: "Aucune action administrative enregistrée.",
      viewAll: "Voir tout l’historique",
    },

    messages: {
      loadError: "Impossible de charger la fiche membre.",
      roleSuccess: "Rôle mis à jour.",
      roleError: "Impossible de modifier le rôle.",
    },

    footer: {
      backTo: "/admin/users",
      backLabel: "Retour aux membres",
    },
  },
  userActivity: {
    notes: {
      loading: "Chargement des Notes...",
      eyebrow: "Activité du profil",
      title: "Notes",
      subtitle: "Toutes les Notes associées à ce profil.",
      empty: "Aucune Note à afficher.",
      createdAtPrefix: "Créée le",
      viewAction: "Voir la Note",
      moderationAction: "Voir dans la modération",
    },

    filters: [
      { value: "all", label: "Tous" },
      { value: "published", label: "Partagées" },
      { value: "draft", label: "Brouillons" },
      { value: "deleted", label: "Supprimées" },
    ],

    status: {
      published: {
        label: "Partagée",
        variant: "success",
      },
      draft: {
        label: "Brouillon",
        variant: "warning",
      },
      deleted: {
        label: "Supprimée / modérée",
        variant: "danger",
      },
      active: "Active",
    },

    footer: {
      backLabel: "Retour à la fiche membre",
    },
    library: {
      loading: "Chargement des Lectures...",
      eyebrow: "Activité du profil",
      title: "Lectures",
      subtitle: "Toutes les Lectures associées à ce profil.",
      empty: "Aucune Lecture à afficher.",
      createdAtPrefix: "Créée le",
      moderationAction: "Voir dans la modération",
    },

    libraryFilters: [
      { value: "all", label: "Toutes" },
      { value: "published", label: "Partagées" },
      { value: "draft", label: "Brouillons" },
      { value: "reading", label: "En cours" },
      { value: "finished", label: "Terminées" },
      { value: "abandoned", label: "Abandonnées" },
      { value: "deleted", label: "Supprimées" },
    ],

    readingStatus: {
      reading: { label: "En cours", variant: "info" },
      finished: { label: "Terminée", variant: "success" },
      abandoned: { label: "Abandonnée", variant: "danger" },
    },

    publicationStatus: {
      published: { label: "Partagée", variant: "success" },
      draft: { label: "Brouillon", variant: "warning" },
    },

    moderationState: {
      deleted: "Supprimée / modérée",
    },
    comments: {
      loading: "Chargement des commentaires...",
      eyebrow: "Activité du profil",
      title: "Réponses sur les Notes",
      subtitle: "Tous les commentaires laissés sous des Notes.",
      empty: "Aucun commentaire à afficher.",
      notePrefix: "Note :",
      unavailableNote: "Note indisponible",
      deletedNote: "Note supprimée / modérée",
      createdAtPrefix: "Créé le",
    },

    commentFilters: [
      { value: "all", label: "Tous" },
      { value: "active", label: "Notes actives" },
      { value: "deleted", label: "Notes supprimées" },
    ],

    libraryComments: {
      loading: "Chargement des commentaires Bibliothèque...",
      eyebrow: "Activité du profil",
      title: "Réponses Bibliothèque",
      subtitle: "Tous les commentaires laissés sous des Lectures.",
      empty: "Aucun commentaire à afficher.",
      bookPrefix: "Lecture :",
      authorPrefix: "Livre de :",
      unavailableBook: "Lecture indisponible",
      deletedBook: "Lecture supprimée / modérée",
      createdAtPrefix: "Créé le",
    },

    libraryCommentFilters: [
      { value: "all", label: "Tous" },
      { value: "active", label: "Lectures actives" },
      { value: "deleted", label: "Lectures supprimées" },
    ],
  },
  contentDetail: {
    note: {
      loading: "Chargement de la Note...",
      notFound: "Note introuvable.",

      header: {
        eyebrow: "Modération Note",
        unknownUser: "Membre inconnu",
      },

      sections: {
        information: "Informations",
        author: "Auteur",
        excerpt: "Extrait",
        content: "Texte",
        moderation: "Modération",
        actions: "Actions",
      },

      fields: {
        category: "Catégorie",
        moderationState: "État modération",
        likes: "Résonances",
        reason: "Raison",
        publicMessage: "Message public",
        adminComment: "Réponse admin",
        date: "Date",
        moderatedBy: "Modéré par",
      },

      status: {
        published: {
          label: "Partagée",
          variant: "success",
        },
        draft: {
          label: "Brouillon",
          variant: "warning",
        },
        deleted: "Supprimée / modérée",
        active: "Active",
      },

      moderation: {
        fallback: "Non renseigné",
        deleteAction: "Supprimer / modérer",
        deleteTitle: "Supprimer cette Note ?",
        deleteText:
          "Cette action masquera la Note sans la supprimer définitivement.",
        confirmLabel: "Supprimer",
      },

      messages: {
        loadError: "Impossible de charger la Note.",
        deleteSuccess: "Note supprimée.",
        deleteError: "Impossible de supprimer la Note.",
      },

      footer: {
        backTo: "/admin/content/notes",
        backLabel: "Retour aux Notes",
      },
    },

    categories: CONTENT_CATEGORY_LABELS,

    library: {
      loading: "Chargement de la Lecture...",
      notFound: "Lecture introuvable.",

      header: {
        eyebrow: "Modération Bibliothèque",
        unknownUser: "Membre inconnu",
        recommendedByPrefix: "partagée par",
      },

      sections: {
        information: "Informations",
        creator: "Voix",
        content: "Expérience de lecture",
        moderation: "Modération",
        actions: "Actions",
      },

      fields: {
        subject: "Sujet",
        universe: "Univers",
        readingState: "État de lecture",
        publicationState: "État de publication",
        moderationState: "État modération",
        likes: "Résonances",
        createdAt: "Créée le",
        reason: "Raison",
        adminComment: "Réponse admin",
        date: "Date",
        moderatedBy: "Modéré par",
      },

      readingStatus: {
        reading: { label: "En cours", variant: "info" },
        finished: { label: "Terminée", variant: "success" },
        abandoned: { label: "Abandonnée", variant: "danger" },
      },

      publicationStatus: {
        published: { label: "Partagée", variant: "success" },
        draft: { label: "Brouillon", variant: "warning" },
      },

      moderationState: {
        deleted: "Supprimée / modérée",
        active: "Active",
      },

      textSections: {
        startedBecause: "Pourquoi j’ai commencé ce livre",
        readingExpectation: "Ce que j’attends de cette lecture",
        opinion: "Mon regard",
        whyRecommend: "Pourquoi partager cette lecture",
        abandonedReason: "Pourquoi j’ai arrêté cette lecture",
        disappointment: "Ce qui m’a déçu",
      },

      moderation: {
        fallback: "Non renseigné",
        deleteAction: "Supprimer / modérer",
        deleteTitle: "Supprimer cette Lecture ?",
        deleteText:
          "Cette action masquera la Lecture sans la supprimer définitivement.",
        confirmLabel: "Supprimer",
      },

      messages: {
        loadError: "Impossible de charger la Lecture.",
        deleteSuccess: "Lecture supprimée.",
        deleteError: "Impossible de supprimer la Lecture.",
      },

      footer: {
        backTo: "/admin/content/library",
        backLabel: "Retour à la Bibliothèque admin",
      },
    },
  },
  actions: {
    loading: "Chargement de l’historique...",

    header: {
      eyebrow: "Historique admin",
      title: "Actions",
      subtitle: "Suivre les décisions prises dans l’espace d’administration.",
    },

    empty: "Aucune action à afficher.",

    labels: {
      ROLE_CHANGED: "Rôle modifié",
      USER_BANNED: "Membre banni",
      USER_UNBANNED: "Membre réactivé",
      CREATOR_APPROVED: "Voix approuvé",
      CREATOR_REJECTED: "Demande créateur refusée",
      ARTICLE_DELETED: "Note modérée",
      BOOK_DELETED: "Lecture modérée",
      COMMENT_DELETED: "Réponse modéré",
      BOOK_COMMENT_DELETED: "Réponse Bibliothèque modéré",
    },

    groups: {
      all: "Tous",
      roles: "Rôles",
      creators: "Demandes créateur",
      moderation: "Modération",
      bans: "Bannissements",
    },

    groupByAction: {
      ROLE_CHANGED: "roles",
      CREATOR_APPROVED: "creators",
      CREATOR_REJECTED: "creators",
      ARTICLE_DELETED: "moderation",
      BOOK_DELETED: "moderation",
      COMMENT_DELETED: "moderation",
      BOOK_COMMENT_DELETED: "moderation",
      USER_BANNED: "bans",
      USER_UNBANNED: "bans",
    },
    userHistory: {
      loading: "Chargement de l’historique...",
      eyebrow: "Historique du membre",
      fallbackUser: "Membre",
      subtitle: "Historique des décisions administratives.",
      empty: "Aucun historique.",
      backToUsers: "Retour aux membres",
      backToUsersPath: "/admin/users",
    },
  },
  adminContent: {
    notes: {
      header: {
        title: "Notes",
        subtitle:
          "Lire, comprendre et modérer les Notes partagées sur Stratusse.",
      },

      search: {
        placeholder: "Rechercher une Note...",
      },

      filters: {
        creators: {
          all: "Tous les créateurs",
        },
        dates: {
          all: "Toutes les dates",
          today: "Aujourd’hui",
          week: "7 derniers jours",
          month: "30 derniers jours",
        },
        categories: {
          all: "Toutes les catégories",
        },
      },

      card: {
        authorPrefix: "Par",
        unknownUser: "Membre inconnu",
        viewAction: "Voir le contenu",
        moderateAction: "Supprimer / modérer",
      },

      status: {
        published: {
          label: "Partagée",
          variant: "success",
        },
        draft: {
          label: "Brouillon",
          variant: "warning",
        },
      },

      messages: {
        deleteSuccess: "Note supprimée.",
        deleteError: "Impossible de supprimer la Note.",
      },

      modal: {
        title: "Supprimer cette Note ?",
        text: "Cette action masquera la Note sans la supprimer définitivement.",
        confirmLabel: "Supprimer",
      },

      footer: {
        backTo: "/admin",
        backLabel: "Retour au tableau de bord",
      },
    },
    library: {
      header: {
        title: "Bibliothèque",
        subtitle: "Lire, comprendre et modérer les Lectures partagées.",
      },

      loading: "Chargement de la Bibliothèque...",

      search: {
        placeholder: "Rechercher une Lecture...",
        titlePlaceholder: "Rechercher par titre",
      },

      filters: {
        creators: {
          all: "Tous les créateurs",
        },
        dates: {
          all: "Toutes les dates",
          today: "Aujourd’hui",
          week: "7 derniers jours",
          month: "30 derniers jours",
        },
        subjects: {
          all: "Tous les sujets",
        },
        reasons: {
          all: "Toutes les raisons",
        },
      },

      card: {
        authorPrefix: "Livre de",
        sharedByPrefix: "ajouté à la Bibliothèque par",
        unknownUser: "Membre inconnu",
        viewAction: "Voir le contenu",
      },

      readingStatus: {
        reading: { label: "En cours", variant: "info" },
        finished: { label: "Terminée", variant: "success" },
        abandoned: { label: "Abandonnée", variant: "danger" },
      },

      publicationStatus: {
        published: { label: "Partagée", variant: "success" },
        draft: { label: "Brouillon", variant: "warning" },
      },

      messages: {
        loadError: "Impossible de charger la Bibliothèque.",
      },

      footer: {
        backTo: "/admin",
        backLabel: "Retour au tableau de bord",
      },
    },
    comments: {
      loading: "Chargement des commentaires...",

      header: {
        title: "Réponses sur les Notes",
        subtitle:
          "Lire, comprendre et modérer les commentaires laissés sous les Notes.",
      },

      filters: {
        dates: {
          all: "Toutes les dates",
          today: "Aujourd’hui",
          week: "7 derniers jours",
          month: "30 derniers jours",
        },
        notes: {
          all: "Toutes les Notes",
        },
        users: {
          all: "Tous les membres",
        },
      },

      card: {
        unknownUser: "Membre inconnu",
        notePrefix: "Note :",
        deletedNote: "Note supprimée",
        likesSuffix: "résonance(s)",
        viewAction: "Voir",
      },

      detail: {
        titlePrefix: "Réponse de",
        linkedNotePrefix: "Note liée :",
        deletedNote: "Note supprimée",
        likesSuffix: "résonance(s)",
        datePrefix: "Date :",
        deleteAction: "Supprimer",
      },

      messages: {
        deleteSuccess: "Réponse supprimé.",
        deleteError: "Impossible de supprimer le commentaire.",
      },

      modal: {
        title: "Supprimer ce commentaire ?",
        text: "Cette action masquera le commentaire sans le supprimer définitivement.",
        confirmLabel: "Supprimer",
      },

      footer: {
        backTo: "/admin",
        backLabel: "Retour au tableau de bord",
      },
    },
    home: {
      header: {
        title: "Contenus",
        subtitle:
          "Comprendre, accompagner et modérer les espaces de Stratusse.",
      },

      sections: [
        {
          title: "Notes",
          icon: "🌿",
          description:
            "Voir, comprendre et modérer les Notes partagées sur Stratusse.",
          details: "Filtres : créateur, thème, date, statut.",
          link: "/admin/content/notes",
        },
        {
          title: "Bibliothèque",
          icon: "📚",
          description: "Explorer les Lectures partagées et leur contexte.",
          details: "Filtres : créateur, lecture, date.",
          link: "/admin/content/library",
        },
        {
          title: "Réponses Notes",
          icon: "💬",
          description: "Comprendre les échanges autour des Notes.",
          details: "Filtres : Note, membre, date.",
          link: "/admin/content/comments",
        },
        {
          title: "Réponses Bibliothèque",
          icon: "🗨️",
          description: "Suivre les échanges autour des Lectures.",
          details: "Filtres : Lecture, membre, date.",
          link: "/admin/content/library-comments",
        },
      ],

      actionLabel: "→ Accéder",

      footer: {
        backTo: "/admin",
        backLabel: "Retour au tableau de bord",
      },
    },
    libraryComments: {
      loading: "Chargement des commentaires Bibliothèque...",

      header: {
        title: "Réponses Bibliothèque",
        subtitle:
          "Lire, comprendre et modérer les échanges autour des Lectures.",
      },

      filters: {
        dates: {
          all: "Toutes les dates",
          today: "Aujourd’hui",
          week: "7 derniers jours",
          month: "30 derniers jours",
        },
        books: {
          all: "Toutes les Lectures",
        },
        users: {
          all: "Tous les membres",
        },
        text: {
          placeholder: "Rechercher dans le commentaire",
        },
      },

      card: {
        unknownUser: "Membre inconnu",
        bookPrefix: "Lecture :",
        deletedBook: "Lecture supprimée",
        likesSuffix: "résonance(s)",
        viewAction: "Voir",
      },

      detail: {
        titlePrefix: "Réponse de",
        linkedBookPrefix: "Lecture liée :",
        deletedBook: "Lecture supprimée",
        likesSuffix: "résonance(s)",
        datePrefix: "Date :",
        bookAuthorPrefix: "Livre de :",
        unknownAuthor: "Non renseigné",
        deleteAction: "Supprimer",
      },

      messages: {
        deleteSuccess: "Réponse supprimé.",
        deleteError: "Impossible de supprimer le commentaire.",
      },

      modal: {
        title: "Supprimer ce commentaire ?",
        text: "Cette action masquera le commentaire sans le supprimer définitivement.",
        confirmLabel: "Supprimer",
      },

      footer: {
        backTo: "/admin",
        backLabel: "Retour au tableau de bord",
      },
    },
  },
  roleChangeModal: {
    title: "Changer le rôle",
    textPrefix: "Modifier le rôle de",
    textSuffix: "?",
    confirmLabel: "Confirmer",
    newRoleLabel: "Nouveau rôle",
    currentRoleLabel: "Rôle actuel",
    adminCommentLabel: "Réponse admin",
    adminCommentPlaceholder: "Pourquoi cette modification ?",
  },
  userNotes: {
    loading: "Chargement des notes...",

    header: {
      eyebrow: "Activité utilisateur",
      title: "Notes",
      subtitle: "Toutes les notes associées à ce profil.",
    },

    filters: {
      all: "Tous",
      published: "Publiés",
      draft: "Brouillons",
      deleted: "Supprimés",
    },

    empty: "Aucune note à afficher.",

    footer: {
      backLabel: "Retour à la fiche utilisateur",
    },
  },
};
