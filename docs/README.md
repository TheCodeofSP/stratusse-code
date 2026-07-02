# Stratusse

> Une Safe Place où les pensées peuvent respirer.

## Présentation

Stratusse est une plateforme d'écriture, de lecture et de partage pensée comme une Safe Place.

Elle permet de déposer des Notes, de découvrir les regards des autres, d'échanger dans un cadre respectueux et de construire progressivement une communauté fondée sur l'écoute, la réflexion et la bienveillance.

L'objectif de Stratusse n'est pas de rechercher la viralité ou la performance des algorithmes, mais de redonner une place aux mots, aux expériences et aux échanges sincères.

---

# Fonctionnalités de la V1

## Authentification

- Création de compte
- Validation de l'adresse email
- Connexion sécurisée
- Mot de passe oublié
- Réinitialisation du mot de passe

## Notes

- Publication
- Modification
- Suppression
- Brouillons
- Likes
- Commentaires

## Bibliothèque

- Recommandations de lecture
- Classement par livres
- Commentaires
- Likes

## Profil

- Gestion du profil
- Bibliothèque personnelle
- Notes personnelles
- Paramètres du compte

## Voix

- Demande de statut Voix
- Validation par un administrateur

## Administration

- Gestion des demandes Voix
- Gestion des contenus
- Modération

## Confiance

- Charte
- Mentions légales
- Politique de confidentialité
- Conditions d'utilisation
- Politique de cookies

---

# Technologies

## Frontend

- React
- React Router
- Sass
- Axios
- Vite

## Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Zod

---

# Structure

```
Stratusse_V1
│
├── apps
│   ├── api
│   └── web
│
├── docs
│
├── package.json
└── .gitignore
```

---

# Variables d'environnement

## API

```
PORT
MONGO_URI
JWT_SECRET
CLIENT_URL
```

## Web

```
VITE_API_URL
```

---

# Lancement

## Backend

```
cd apps/api
npm install
npm run dev
```

## Frontend

```
cd apps/web
npm install
npm run dev
```

---

# Philosophie

Stratusse est construit avec une approche centrée sur l'humain.

Chaque décision technique est prise pour servir l'expérience des utilisateurs avant la recherche de performance ou de croissance.

Le projet évolue progressivement, dans le respect de son identité, de la confidentialité des données et de la qualité des échanges.

---

Développé avec soin par **The Code of SP**.