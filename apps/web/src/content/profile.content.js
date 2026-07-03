export const profileContent = {
  page: {
    title: "Ma place sur Stratusse !",
    subtitle:
      "Retrouve la manière dont tu participes aujourd’hui à la vie de la Safe Place.",
  },

  sections: {
    notes: "Mes Notes",
    comments: "Mes réponses",
    likes: "Mes résonances",
    library: "Mes Lectures",
    libraryComments: "Mes échanges dans la Bibliothèque",
    stats: "Ma place sur Stratusse",
  },

  roles: {
    observer: {
      title: "Tu participes aujourd’hui en tant que membre",
      text: "Tu peux découvrir les Notes, explorer la Bibliothèque, aimer les regards qui te parlent et répondre lorsque tu en ressens l’envie.",

      creatorTitle: "Et si une pensée cherchait maintenant sa place ?",
      creatorText:
        "Les Voix peuvent déposer leurs Notes et partager leurs Expériences de Lecture afin d’enrichir les regards présents sur Stratusse.",

      validationTitle: "Pourquoi une demande ?",
      validationText:
        "Cette étape permet de comprendre ton intention et de préserver une Safe Place calme, sincère et humaine.",

      buttonLabel: "Pourquoi devenir une Voix ?",
      buttonTo: "/observer-to-creator",
    },

    creator: {
      title: "Tu participes aujourd’hui en tant que Voix",
      text: "Tu peux déposer tes Notes, partager tes Lectures et contribuer à faire vivre les regards présents sur Stratusse.",

      creatorTitle: "Écrire à ton rythme",
      creatorText:
        "Tu n’as pas besoin d’écrire souvent, ni d’écrire parfaitement. Une Note peut simplement naître lorsqu’une pensée demande à respirer.",

      validationTitle: "Prendre soin de ce que tu déposes",
      validationText:
        "Chaque publication participe à l’atmosphère de Stratusse. Écris avec sincérité, respect et attention pour les personnes qui te liront.",
    },

    admin: {
      title: "Tu accompagnes Stratusse en tant que Gardien de Stratusse",
      text: "Tu veilles au bon fonctionnement de la Safe Place, tu accompagnes les membres et tu prends soin de l’esprit de Stratusse.",

      creatorTitle: "Protéger sans dominer",
      creatorText:
        "Être Gardien, ce n’est pas prendre le pouvoir sur les échanges. C’est intervenir avec discernement lorsque la sécurité émotionnelle du lieu en a besoin.",

      validationTitle: "Garder l’humain au centre",
      validationText:
        "Chaque action de modération doit protéger les personnes, respecter la Charte et préserver la confiance nécessaire pour écrire et répondre ici.",
    },
  },

  creatorRequest: {
    hero: {
      title: "Demander à devenir une Voix.",
      introduction: [
        "Sur Stratusse, chacun peut lire, aimer et répondre en tant que membre.",
        "Devenir une Voix permet d’aller plus loin : déposer ses propres Notes et partager ses Expériences de Lecture.",
        "Cette demande existe pour préserver une Safe Place sincère, calme et humain.",
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
        "Transmettre une pensée personnelle.",
        "Prendre soin de l’esprit de la Safe Place.",
      ],
    },

    philosophy: {
      title: "Pourquoi cette demande existe ?",
      introduction:
        "La demande n’est pas un examen ni un jugement sur ton écriture. Elle permet de comprendre ton intention et de vérifier que l’esprit de Stratusse est compris avant de publier dans une Safe Place partagé.",
    },

    request: {
      title: "Ta demande",
      introduction:
        "Prends le temps de formuler ton intention. Elle sera lue par une vraie personne, avec attention.",
      buttonLabel: "Envoyer ma demande",
      buttonTo: "/profile/creator-request",
    },

    states: {
      loading: "Stratusse prépare la demande...",
      submitSuccess: "Ta demande a été envoyée 🌿",
      submitError: "Impossible d’envoyer la demande.",

      pending: {
        title: "⏳ Demande en cours de lecture",
        text: "Merci pour ta confiance. Nous prenons le temps de lire chaque intention afin de préserver l’esprit de Stratusse.",
      },

      approved: {
        title: "✅ Tu es maintenant une Voix",
        text: "Tu peux désormais déposer des Notes et partager tes lectures sur Stratusse.",
      },

      rejected: {
        title: "Demande non retenue pour le moment",
        fallbackText:
          "Ta demande n’a pas été retenue pour le moment. Tu restes membre de Stratusse et tu peux refaire une demande plus tard.",
      },
    },

    form: {
      motivationLabel: "Pourquoi souhaites-tu devenir une Voix sur Stratusse ?",
      contributionLabel: "Quel premier regard aimerais-tu partager ?",

      contributionTypes: [
        {
          label: "Note",
          value: "note",
        },
        {
          label: "Lecture",
          value: "book",
        },
      ],

      titlePlaceholder: "Titre ou idée principale (optionnel)",
      contentPlaceholder:
        "Partage une intention, un début de Note, une réflexion ou ce qu’une lecture a laissé en toi...",
      improvementIdeasLabel:
        "Y a-t-il quelque chose que tu aimerais voir évoluer sur Stratusse ?",
      submitLabel: "Envoyer ma demande",
    },

    closing: {
      reflection:
        "Devenir une Voix, c’est choisir de déposer son regard en prenant soin de la Safe Place qui l’accueille.",
      signature: "— Stratusse",
    },

    footer: {
      backTo: "/profile",
      backLabel: "Retour à mon profil",
    },
  },

  emptyStates: {
    notes: {
      title: "Aucune Note déposée pour le moment",
      text: "Ton carnet est encore vide. Une pensée trouvera peut-être sa place plus tard.",
    },

    comments: {
      title: "Aucune réponse pour le moment",
      text: "Tu n’as pas encore pris part à un échange autour d’une Note.",
    },

    likes: {
      title: "Aucune résonance pour le moment",
      text: "Aucun regard partagé ne t’a encore appelé à réagir.",
    },

    library: {
      title: "Aucune lecture partagée pour le moment",
      text: "Un livre trouvera peut-être bientôt sa place dans ta Bibliothèque.",
    },

    libraryComments: {
      title: "Aucun échange pour le moment",
      text: "Tu n’as pas encore répondu dans la Bibliothèque.",
    },
  },

  creatorProfile: {
    eyebrow: "Une Voix de Stratusse",

    hero: {
      titlePrefix: "Le regard de",
      introduction:
        "À travers ses Notes et ses Lectures, chaque Voix partage une manière unique de voir, de ressentir et de comprendre ce qui l’entoure.",
    },

    meta: {
      joinedPrefix: "Présente sur Stratusse depuis",
      notesShared: "Notes déposées",
      readingsShared: "Lectures partagées",
    },

    notes: {
      title: "Ses Notes",
      introduction:
        "Réflexions, expériences et questionnements déposés au fil du temps.",
      actionLabel: "Découvrir cette Note",
      emptyTitle: "Aucune Note déposée",
      emptyText: "Cette Voix n’a pas encore déposé de Note.",
    },

    readings: {
      title: "Ses Lectures",
      introduction:
        "Des livres qui ont laissé une trace et les regards qu’ils ont fait naître.",
      actionLabel: "Découvrir cette lecture",
      emptyTitle: "Aucune lecture partagée",
      emptyText: "Cette Voix n’a pas encore partagé de lecture.",
    },

    states: {
      loading: "Stratusse rassemble ce profil...",
      notFoundTitle: "Profil introuvable",
      notFoundText: "Cette Voix n’existe pas ou n’est plus disponible.",
    },

    closing: {
      reflection:
        "Chaque regard raconte une manière différente d’habiter le monde.",
      signature: "— Stratusse",
    },
  },

  profile: {
    eyebrow: "Espace personnel",

    labels: {
      pseudo: "Pseudo",
      email: "Email",
      role: "Place",
      status: "Statut",
    },

    fallbacks: {
      notProvided: "Non renseigné",
    },

    roleLabels: {
      admin: "Gardien de Stratusse",
      creator: "Voix",
      observer: "Membre",
    },

    creatorRequestStatus: {
      pending: {
        datePrefix: "Demande envoyée le",
        text: "Ta demande est en cours de lecture. Tu n’as pas besoin de la renvoyer.",
      },

      rejected: {
        datePrefix: "Demande non retenue le",
        reasonPrefix: "Motif :",
        fallbackReason: "Ta demande n’a pas été retenue pour le moment.",
        retryButton: "Faire une nouvelle demande",
        retryTo: "/profile/creator-request",
      },

      observer: {
        datePrefix: "Membre depuis le",
        requestButton: "Demander à devenir une Voix",
        requestTo: "/profile/creator-request",
      },

      creator: {
        title: "Voix approuvée",
        approvedByPrefix: "Approuvée par",
        approvedAtPrefix: "Le",
      },

      admin: {
        title: "Gardien de Stratusse",
      },
    },

    activity: {
      title: "Ta présence sur Stratusse",

      notesPrefix: "Notes :",
      libraryPrefix: "Bibliothèque :",

      commentsLabel: "réponse",
      leftLabel: "laissée",
      reactionLabel: "résonance",
      andLabel: "et",
    },

    writingStats: {
      notesTitle: "Dans mes Notes, j'ai :",

      libraryTitle: "Dans ma Bibliothèque, j'ai :",

      draftLabel: "pensée(s)",
      pendingLabel: "en attente",

      noteLabel: "Note",
      readingLabel: "Lecture",

      sharedLabel: "publiées",

      whichLabel: "qui",
      reachedLabel: "résonné avec",

      personLabel: "personne",

      commentsPrefix: "Résonné ",
      reactionsPrefix: "Partagé",

      occurrencesSuffix: "réponses",
    },

    actions: {
      write: "Déposer",
      writeTo: "/editor",

      writings: "Mon espace d'écriture",
      writingsTo: "/profile/writings",

      settings: "Paramètres du compte",
      settingsTo: "/profile/settings",
    },
  },

  settings: {
    hero: {
      eyebrow: "Paramètres",
      title: "Mon espace personnel",
      subtitle: "Gère les informations sensibles liées à ton compte Stratusse.",
    },

    password: {
      title: "Modifier mon mot de passe",
    },

    deleteAccount: {
      title: "Supprimer mon compte",
      text: "Cette action désactivera ton compte et anonymisera ton profil. Tes contenus resteront conservés.",
    },

    footer: {
      backTo: "/profile",
      backLabel: "Retour à mon profil",
    },
  },

  notesList: {
    loading: "Tes Notes reprennent doucement leur place...",

    errors: {
      load: "Impossible de charger tes Notes.",
    },

    emptyState: {
      icon: "🌿",
      title: "Aucune Note déposée pour le moment",
      text: "Parfois, écrire commence simplement par une pensée qu’on n’arrive plus à garder pour soi.",
      buttonLabel: "Déposer une Note",
      buttonTo: "/editor/note",
    },

    header: {
      eyebrow: "Carnet personnel",
      title: "Mes Notes",
      subtitle:
        "Retrouve tes Notes en brouillon et celles déjà partagées sur Stratusse.",
    },

    sections: {
      drafts: "Brouillons",
      published: "Partagées",
    },

    actions: {
      view: "Voir",
      edit: "Modifier",
      publish: "Partager",
      unpublish: "Remettre en brouillon",
      delete: "Supprimer",
    },

    messages: {
      deleteTitle: "Supprimer cette Note ?",
      deleteTextPrefix: "Cette action retirera",
      deleteTextSuffix: "de tes Notes.",
      confirmDelete: "Supprimer",
      cancelDelete: "Garder cette Note",
    },
  },

  libraryList: {
    loading: "Tes lectures reprennent doucement leur place...",

    errors: {
      load: "Impossible de charger tes Lectures.",
    },

    emptyState: {
      icon: "📚",
      title: "Aucune lecture partagée pour le moment",
      text: "Un livre peut parfois mettre des mots sur ce qu’on ressent déjà.",
      buttonLabel: "Partager une Lecture",
      buttonTo: "/editor/library",
    },

    header: {
      eyebrow: "Bibliothèque personnelle",
      title: "Mes Lectures",
      subtitle:
        "Retrouve tes lectures en brouillon et celles déjà partagées dans la Bibliothèque.",
    },

    sections: {
      drafts: "Brouillons",
      published: "Partagées",
    },

    actions: {
      view: "Voir",
      edit: "Modifier",
      publish: "Partager",
      unpublish: "Remettre en brouillon",
      delete: "Supprimer",
    },

    messages: {
      deleteTitle: "Supprimer cette lecture ?",
      deleteTextPrefix: "Cette action retirera",
      deleteTextSuffix: "de ta Bibliothèque.",
      confirmDelete: "Supprimer",
      cancelDelete: "Garder cette lecture",
      toReadCannotPublish:
        "Une lecture à venir ne peut pas encore être partagée.",
    },
  },

  writings: {
    accessDenied: {
      icon: "✍️",
      title: "Tu participes aujourd’hui en tant que membre",
      text: "Si tu souhaites déposer tes propres Notes ou partager tes lectures, tu peux demander à devenir une Voix.",
      buttonLabel: "Demander à devenir une Voix",
      buttonTo: "/profile/creator-request",
    },

    header: {
      eyebrow: "Espace des Voix",
      title: "Mon espace d'écriture",
      subtitle:
        "Retrouve tes Notes, tes brouillons et tes Lectures partagées dans la Bibliothèque.",
    },

    notes: {
      icon: "🌿",
      eyebrow: "Carnet de Notes",
      title: "Mes Notes",
      text: "Brouillons, Notes partagées et pensées en attente.",
      linkLabel: "Voir mes Notes",
      to: "/profile/notes",
    },

    library: {
      icon: "📚",
      eyebrow: "Bibliothèque",
      title: "Mes Lectures",
      text: "Lectures en brouillon ou déjà partagées dans la Bibliothèque.",
      linkLabel: "Voir mes Lectures",
      to: "/profile/library",
    },
  },
};
