export const authContent = {
  login: {
    title: "Retrouver sa place",
    subtitle:
      "Connecte-toi pour retrouver ton espace, participer aux échanges et poursuivre ton chemin sur Stratusse.",

    eyebrow: "Retour au calme",

    emailLabel: "Adresse email",
    passwordLabel: "Mot de passe",

    forgotPasswordLabel: "Mot de passe oublié ?",
    forgotPasswordTo: "/forgot-password",

    submitLabel: "Se connecter",
    submittingLabel: "Connexion...",

    successMessage: "Heureux de te revoir !",
    errorMessage: "Email ou mot de passe invalide.",

    noAccountText: "Tu découvres Stratusse ?",
    registerLink: "Créer un compte",
    registerTo: "/register",

    redirectTo: "/",
  },

  register: {
    eyebrow: "Rejoindre Stratusse",
    title: "Devenir membre",
    subtitle:
      "Crée ton espace pour aimer les regards qui te parlent, répondre avec respect et, peut-être un jour, demander à devenir une Voix.",

    pseudoLabel: "Pseudo",
    emailLabel: "Adresse email",
    passwordLabel: "Mot de passe",
    charterLabel: "J’ai lu et j’accepte la charte de Stratusse",
    termsLabel:
      "J’ai lu et j’accepte les Conditions d’utilisation de Stratusse",
    privacyLabel:
      "J’ai pris connaissance de la Politique de confidentialité de Stratusse",

    submitLabel: "Créer mon compte",
    submittingLabel: "Création...",

    errorMessage: "Impossible de créer ce compte pour le moment.",

    successTo: "/register-success",

    alreadyAccountText: "Déjà membre ?",
    loginLink: "Se connecter",
    loginTo: "/login",
  },

  registerSuccess: {
    eyebrow: "Bienvenue",
    title: "Encore une étape 🌿",
    text: [
      "Ton compte a bien été créé. Un email de confirmation vient d’être envoyé.",
      "Vérifie ta boîte mail puis clique sur le lien de confirmation pour ouvrir ton espace sur Stratusse.",
    ],

    resendLabel: "Renvoyer l’email de confirmation",
    resendingLabel: "Envoi...",

    resendSuccess: "Email de confirmation envoyé.",
    resendError: "Impossible d’envoyer l’email pour le moment.",
    actionLabel: "Commencer la découverte",
  },

  forgotPassword: {
    eyebrow: "Accès au compte",
    title: "Retrouver l’accès à ton espace",
    subtitle:
      "Indique ton adresse email. Si un compte existe, nous t’enverrons un lien pour définir un nouveau mot de passe.",

    emailLabel: "Adresse email",

    submitLabel: "Recevoir un lien",
    submittingLabel: "Envoi...",

    errorMessage: "Impossible d’envoyer la demande de réinitialisation.",
  },

  resetPassword: {
    eyebrow: "Nouveau départ",
    title: "Créer un nouveau mot de passe",
    subtitle:
      "Choisis un nouveau mot de passe pour retrouver l’accès à ton espace.",

    passwordLabel: "Nouveau mot de passe",

    invalidTokenError: "Lien de réinitialisation invalide.",
    submitError: "Impossible de réinitialiser le mot de passe.",

    submitLabel: "Modifier le mot de passe",
    submittingLabel: "Modification...",

    loginLabel: "Retour à la connexion",
    loginTo: "/login",
  },

  verifyEmail: {
    eyebrow: "Confirmation email",

    invalidTokenError: "Lien de confirmation invalide.",
    expiredTokenError: "Lien de confirmation invalide ou expiré.",

    successMessage: "Email confirmé. Bienvenue sur Stratusse !",
    successRedirectTo: "/welcome",

    errorTitle: "Le lien n’a pas pu être confirmé",
    loginLabel: "Retour à la connexion",
    loginTo: "/login",

    loadingTitle: "Vérification en cours...",
    loadingText:
      "Nous confirmons ton adresse email avant d’ouvrir ton espace sur Stratusse.",
  },

  welcome: {
    eyebrow: "Bienvenue sur Stratusse",

    title: "Heureux de t’accueillir 🌿",

    text: [
      "Stratusse est une Safe Place pensé pour lire, réfléchir et découvrir le regard des autres dans un cadre respectueux.",
      "Ici, les Notes comptent davantage que les algorithmes. Les échanges comptent davantage que les réactions instantanées.",
      "Tu peux commencer doucement : lire une Note, explorer la Bibliothèque, puis revenir quand tu en ressens l’envie.",
    ],

    primaryAction: "Découvrir les Notes",
    primaryTo: "/notes",

    secondaryAction: "Explorer la Bibliothèque",
    secondaryTo: "/library",
  },
};
