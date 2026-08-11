# Compte Gardien de Stratusse

## Identité retenue

- Email : `gardien@stratusse.fr`
- Pseudo : `La Gardienne de Stratusse`
- Rôle : `admin`

Ce compte est créé directement en base avec une commande terminal. Il n’existe
aucune route publique permettant de devenir administrateur.

## Création en production

Avant la commande, vérifier que `MONGO_URI` désigne bien le cluster de
production de Stratusse. Depuis `apps/api` :

```bash
npm ci
npm run admin:create
npm run admin:check
```

La commande demande deux fois le mot de passe sans l’afficher. Elle refuse de
transformer automatiquement un compte existant en administrateur. Le mot de
passe doit contenir au moins huit caractères, une majuscule, un chiffre et un
caractère spécial.

## Connexion

Une fois le contrôle réussi, utiliser la connexion normale du site avec
`gardien@stratusse.fr` et le mot de passe choisi. L’adresse est marquée comme
vérifiée lors de la création sécurisée.

## Protections ajoutées

- un Gardien ne peut pas modifier son propre rôle ;
- un Gardien ne peut pas bannir son propre compte ;
- le dernier Gardien actif ne peut pas être rétrogradé ou banni ;
- un compte Gardien ne peut pas être supprimé depuis son profil ;
- la création du compte est inscrite dans l’historique des actions admin.

Pour supprimer définitivement un ancien compte Gardien, il faut d’abord créer
ou nommer un autre Gardien, puis retirer le rôle admin à l’ancien compte.
