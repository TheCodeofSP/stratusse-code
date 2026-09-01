export const homeContent = {
  hero: {
    badge: "Un espace pour ce qui reste en tête",
    userWelcomeSuffix: "bienvenue sur Stratusse !",
    title:
      "Il y a des pensées qui ont simplement besoin d’un endroit où exister.",
    subtitle: "Stratusse leur fait une place.",
    introduction: [
      "Ici, tu peux lire ce que d’autres ont traversé, laisser résonner leurs mots ou, lorsque tu te sens prêt·e, déposer les tiens.",
      "Tu n’as pas besoin d’avoir une réponse. Seulement quelque chose de sincère à partager.",
    ],
    primaryAction: {
      label: "Lire une pensée",
      to: "/notes",
    },
    secondaryAction: {
      label: "J’aimerais écrire ici",
      to: "/observer-to-creator",
    },
    libraryAction: {
      label: "Découvrir une recommandation livre",
      to: "/library",
    },
  },

  spotlight: {
    eyebrow: "Une pensée déposée récemment",
    emptyTitle: "Les premiers mots prendront bientôt leur place ici.",
    emptyText:
      "Stratusse s’ouvre doucement. Peut-être que l’une de ses premières pensées sera la tienne.",
    buttonLabel: "Découvrir toutes les Notes",
    buttonTo: "/notes",
  },

  invitation: {
    eyebrow: "Et toi ?",
    title: "Qu’est-ce qui reste dans ta tête aujourd’hui ?",
    prompts: [
      "Une chose que tu n’arrives pas à dire…",
      "Une question qui revient souvent…",
      "Une expérience qui a changé ton regard…",
      "Un livre qui a laissé une trace…",
    ],
    text: "Tu n’as pas besoin d’écrire parfaitement. Tes mots ont seulement besoin d’être vrais.",
    buttonLabel: "Découvrir comment écrire sur Stratusse",
    buttonTo: "/observer-to-creator",
  },

  writing: {
    title: "Les Notes",
    quote: "Certaines pensées trouvent leur place lorsqu’on les écrit.",
    text: [
      "Une Note peut naître d’une question, d’une expérience, d’un doute ou d’un regard personnel sur le monde.",
      "Elle n’a pas besoin d’apporter une réponse.",
      "Elle existe parce qu’une pensée avait besoin d’être déposée quelque part.",
    ],
    buttonLabel: "→ Découvrir les Notes",
    buttonTo: "/notes",
  },

  reading: {
    title: "La Bibliothèque",
    quote:
      "Un même livre ne laisse jamais la même trace selon la personne qui le lit.",
    text: [
      "La Bibliothèque rassemble des Expériences de Lecture.",
      "Ici, on ne classe pas les livres. On partage le regard qu’ils ont fait naître.",
      "Chaque Lecture partage le regard personnel qu’un livre a fait naître.",
    ],
    buttonLabel: "→ Explorer la Bibliothèque",
    buttonTo: "/library",
  },

  participation: {
    eyebrow: "Comment participer ?",
    title: "Chacun trouve sa place à son rythme.",
    subtitle: "Découvrir, échanger, puis peut-être partager.",
    introduction: [
      "Stratusse n’impose aucun parcours.",
      "Tu peux simplement lire, devenir membre pour participer aux échanges, ou demander à devenir une Voix si tu souhaites déposer tes propres mots.",
    ],

    observer: {
      icon: "♡",
      title: "Membre",
      subtitle: "Entrer dans l’échange.",
      text: "Un membre peut aimer les pensées qui lui parlent et répondre avec respect. C’est une manière simple de prendre part à la Safe Place sans avoir à déposer de Note.",
      actions: [
        "Lire les Notes.",
        "Explorer la Bibliothèque.",
        "Aimer les pensées partagées.",
        "Répondre avec douceur.",
      ],
    },

    creator: {
      icon: "✦",
      title: "Voix",
      subtitle: "Déposer son regard.",
      text: "Une Voix peut déposer des Notes et partager des Expériences de Lecture. Elle contribue autrement, sans être plus importante qu’un membre.",
      actions: [
        "Déposer une Note.",
        "Partager une Lecture.",
        "Transmettre une pensée personnelle.",
        "Prendre soin de la Safe Place.",
      ],
    },

    journey: [
      {
        title: "Découvrir",
        text: "Les Notes et la Bibliothèque sont accessibles librement.",
      },
      {
        title: "Devenir membre",
        text: "Un compte permet d’aimer et de répondre dans un cadre plus responsable.",
      },
      {
        title: "Devenir une Voix",
        text: "Une demande permet de déposer ses propres mots tout en préservant l’esprit de la Safe Place.",
      },
    ],

    philosophy: {
      title: "Pourquoi faire une demande pour devenir une Voix ?",
      text: [
        "Les Notes et les Lectures sont visibles par tous. Elles participent à l’atmosphère de Stratusse.",
        "La demande pour devenir une Voix n’est pas un jugement sur ton écriture.",
        "Elle permet simplement de comprendre ton intention et de préserver une Safe Place sincère, calme et humaine.",
      ],
      buttonLabel: "Comprendre le parcours",
      buttonTo: "/observer-to-creator",
    },
  },

  latestNotes: {
    title: "La dernière Note publiée",
    placeholder: "Les premiers regards apparaîtront bientôt ici.",
  },

  latestReadings: {
    title: "La Lecture la plus récente",
    placeholder: "Les premières Lectures apparaîtront bientôt ici.",
  },

  closing: {
    quote:
      "Et si les mots que tu gardes en toi permettaient à quelqu’un de se sentir moins seul ?",
    signature: "— Stratusse",
    reflection:
      "Il n’est pas nécessaire d’avoir toutes les réponses pour commencer à écrire.",
    buttonLabel: "Trouver ma place sur Stratusse",
    buttonTo: "/observer-to-creator",
  },
};
