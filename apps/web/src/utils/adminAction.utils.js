const roleLabels = {
  observer: "Membre",
  creator: "Voix",
  admin: "Administrateur",
};

export function getActionDescription(action) {
  const admin = action.admin?.pseudo || "Un administrateur";

  const target = action.targetUser?.pseudo || "un utilisateur";

  switch (action.actionType) {
    case "ROLE_CHANGED":
      return `${admin} a attribué le rôle ${
        roleLabels[action.metadata?.newRole] || action.metadata?.newRole
      } à ${target}.`;

    case "CREATOR_APPROVED":
      return `${admin} a validé la demande créateur de ${target}.`;

    case "CREATOR_REJECTED":
      return `${admin} a refusé la demande créateur de ${target}.`;

    case "USER_BANNED":
      return `${admin} a suspendu le compte de ${target}.`;

    case "USER_UNBANNED":
      return `${admin} a réactivé le compte de ${target}.`;

    case "ARTICLE_DELETED":
      return `${admin} a modéré un note de ${target}.`;

    case "BOOK_DELETED":
      return `${admin} a modéré une recommandation de ${target}.`;

    case "COMMENT_DELETED":
      return `${admin} a modéré un commentaire de ${target}.`;

    case "BOOK_COMMENT_DELETED":
      return `${admin} a modéré une réaction Bibliothèque de ${target}.`;

    default:
      return action.actionType;
  }
}
