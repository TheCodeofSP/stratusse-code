# Audit des dépendances

Date de contrôle : 29 juillet 2026.

## Résultat

Les dépendances directement remplaçables qui présentaient des alertes ont été
retirées ou déplacées :

- Axios a été remplacé par un client HTTP fondé sur `fetch` ;
- Sass est désormais une dépendance de développement uniquement ;
- `express-rate-limit` a été remplacé par une limitation persistée dans
  MongoDB, compatible avec les instances serverless.

Les commandes suivantes restent à exécuter régulièrement :

```bash
cd apps/api && npm audit --omit=dev
cd ../web && npm audit --omit=dev
```

## Alertes sans correctif disponible

Au moment de l’audit, npm signale encore des alertes modérées transitives dans :

- Express (`body-parser` et `qs`) ;
- Mongoose ;
- React Router.

Les versions disponibles ne proposent pas encore de correctif compatible.
Elles ne doivent pas être ignorées : vérifier les nouvelles versions à chaque
maintenance.

## Mesures compensatoires présentes

- la taille JSON est fixée à une valeur littérale de `100kb` ;
- les objets entrants sont validés avec des schémas Zod stricts sur les zones
  sensibles ;
- les mises à jour MongoDB sont construites par les services et ne reprennent
  pas directement des chemins arbitraires transmis par le client ;
- les routes et destinations de navigation proviennent de constantes internes,
  pas d’URL saisies par les utilisateurs ;
- une politique CSP et des en-têtes de sécurité sont définis côté front.

Ces mesures réduisent l’exposition, sans remplacer une future mise à jour des
dépendances lorsqu’un correctif sera publié.
