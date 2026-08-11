# Recommandations intégrées

## Accueil et adhésion

- nouvelle promesse émotionnelle dès le hero ;
- deux appels à l’action immédiats : lire et découvrir le parcours d’écriture ;
- mise en lumière de la dernière Note publiée ;
- section d’amorces d’écriture pour aider les visiteurs à se projeter ;
- appel final orienté vers la contribution ;
- suppression des aperçus dupliqués dans les blocs Notes et Bibliothèque ;
- corrections de formulations récurrentes.

## Antirobots et anti-abus

- Cloudflare Turnstile sur l’inscription, le contact, le mot de passe oublié et
  le renvoi de l’email de vérification ;
- Turnstile adaptatif à la connexion après trois échecs ;
- champ piège et contrôle du délai de saisie sur le contact ;
- limites persistantes dans MongoDB pour fonctionner sur Vercel ;
- limites dédiées aux commentaires, réactions, contenus et demandes de Voix.

## Authentification

- nouveaux jetons stockés dans un cookie HttpOnly ;
- cookie Secure en production ;
- prise en charge temporaire des anciens Bearer tokens côté API ;
- route de déconnexion serveur ;
- contrôle de l’origine sur les actions utilisant le cookie ;
- suppression du stockage du JWT dans `localStorage`.

## Dépendances et déploiement

- remplacement d’Axios par `fetch` ;
- utilisation de `package-lock.json` comme verrouillage npm de référence ;
- Sass déplacé dans les dépendances de développement ;
- en-têtes de sécurité Vercel et CSP ;
- fichiers `.env.example` sans secret réel ;
- documentation Turnstile et audit des dépendances.

## Validation effectuée

- 19 tests API réussis ;
- lint API réussi ;
- lint web réussi ;
- build web Vite réussi.

Consulter également :

- `docs/SECURITY_SETUP.md` ;
- `docs/DEPENDENCY_AUDIT.md`.
