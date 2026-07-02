export const navigationContent = {
  brand: "Stratusse",

  slogan: "Une Safe Place où les pensées peuvent respirer",

  aria: {
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
  },

  publicLinks: [
    {
      label: "Accueil",
      path: "/",
    },
    {
      label: "Notes",
      path: "/notes",
    },
    {
      label: "Bibliothèque",
      path: "/library",
    },
  ],

  authLinks: [
    {
      label: "Connexion",
      path: "/login",
    },
    {
      label: "Devenir membre",
      path: "/register",
    },
  ],

  writeMenu: {
    label: "Écrire",

    links: [
      {
        label: "Mon espace d'écriture",
        path: "/editor",
      },
      {
        label: "Nouvelle Note",
        path: "/editor/note",
      },
      {
        label: "Nouvelle Lecture",
        path: "/editor/library",
      },
    ],
  },

  profileMenu: {
    label: "Mon espace",

    links: [
      {
        label: "Mon profil",
        path: "/profile",
      },
      {
        label: "Paramètres",
        path: "/profile/settings",
      },
    ],

    adminLink: {
      label: "Administration",
      path: "/admin",
    },
  },

  logout: {
    label: "Se déconnecter",

    successMessage:
      "Merci d'avoir pris le temps de passer sur Stratusse. À bientôt !",

    redirectTo: "/",
  },
};
