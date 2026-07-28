# Configuration sécurité — Stratusse

Le code de cette archive inclut :

- Cloudflare Turnstile sur l’inscription, le contact et les demandes d’email ;
- une vérification adaptative sur la connexion après trois échecs ;
- un champ piège et un contrôle de durée sur le formulaire de contact ;
- des limites de fréquence persistées dans MongoDB ;
- des limites dédiées aux commentaires, réactions, publications et demandes de Voix ;
- une session dans un cookie `HttpOnly`, `Secure` en production ;
- un contrôle de l’origine des requêtes mutables utilisant ce cookie ;
- des en-têtes de sécurité sur le front Vercel.

## 1. Variables locales

Copier les fichiers d’exemple sans les renommer dans Git :

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

Remplacer ensuite les valeurs sensibles. Les clés Turnstile présentes dans les
fichiers d’exemple sont les clés de test officielles de Cloudflare.

## 2. Créer le widget Turnstile

Dans Cloudflare :

1. ouvrir **Turnstile** ;
2. créer un widget nommé `Stratusse` ;
3. autoriser `stratusse.fr`, `www.stratusse.fr` et `localhost` pour les tests ;
4. copier la clé publique dans `VITE_TURNSTILE_SITE_KEY` sur le projet web ;
5. copier la clé secrète dans `TURNSTILE_SECRET_KEY` sur le projet API.

La clé secrète ne doit jamais être placée dans le front ni committée.

## 3. Domaine de l’API et cookie

La configuration recommandée est :

```text
Front : https://www.stratusse.fr
API   : https://api.stratusse.fr
```

Créer le sous-domaine `api.stratusse.fr` vers le déploiement API Vercel, puis
définir :

```env
COOKIE_DOMAIN=.stratusse.fr
VITE_API_URL=https://api.stratusse.fr
FRONTEND_URL=https://www.stratusse.fr
```

Avec le domaine Vercel `stratusse-api.vercel.app`, laisser `COOKIE_DOMAIN` vide.
Le cookie utilise alors `SameSite=None` en production. Le sous-domaine
`api.stratusse.fr` reste préférable pour la compatibilité avec les navigateurs.

## 4. Variables Vercel

### Projet API

- `NODE_ENV=production`
- `MONGO_URI`
- `JWT_SECRET`
- `FRONTEND_URL`
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `CONTACT_RECEIVER_EMAIL`
- `TURNSTILE_SECRET_KEY`
- `COOKIE_DOMAIN`

### Projet web

- `VITE_API_URL`
- `VITE_TURNSTILE_SITE_KEY`

Redéployer les deux projets après toute modification de variable.

## 5. Vérifications

```bash
cd apps/api
npm install
npm test
npm run lint

cd ../web
npm install
npm run lint
npm run build
```

Tester ensuite :

- création d’un compte ;
- connexion avec trois mots de passe erronés, puis apparition de Turnstile ;
- renvoi de l’email de vérification ;
- mot de passe oublié ;
- formulaire de contact ;
- déconnexion et rechargement de la page ;
- commentaire et réaction avec un compte membre.
