# Finalisation V1 — Lot 1

Date : 11 août 2026

## Objectif

Préparer Stratusse à la création de contenus réels, avant la recette visuelle et
l’ouverture officielle.

## Modifications réalisées

### Juridique

- direction de la publication remplacée par `The Code of SP` ;
- nom de domaine renseigné avec `stratusse.fr` ;
- date de mise en ligne et dates de mise à jour fixées au `01/10/2026` ;
- mentions `À compléter` volontairement conservées pour l’adresse
  professionnelle, le cluster MongoDB Atlas, sa région et le registrar.

### Résonances

- interdiction côté API de faire résonner sa propre Note ;
- interdiction côté API de faire résonner sa propre Lecture ;
- interdiction côté API de faire résonner sa propre réponse à une Note ou une
  Lecture ;
- réponse HTTP `403` accompagnée d’un message compréhensible ;
- quatre tests métier ajoutés.

### Bibliothèque

- statut `À lire` retiré des entrées et libellés de la V1 ;
- valeur historique `to_read` conservée uniquement dans le modèle pour ne pas
  casser d’éventuelles anciennes données ;
- aucune nouvelle Lecture ne peut être créée avec cette valeur.

### Contenus et maintenance

- corrections de formulations visibles ;
- ajout de `apps/api/.env.example` et `apps/web/.env.example` ;
- suppression du verrouillage pnpm devenu inutile ;
- checklist qualité et changelog mis à jour.

## Validation

- lint API réussi ;
- 23 tests API réussis sur 23 ;
- lint web réussi ;
- build web de production réussi.

## Éléments encore à fournir

Rechercher `À compléter` dans le projet après obtention des informations :

- adresse de la boîte postale professionnelle ;
- nom du cluster MongoDB Atlas ;
- fournisseur et région MongoDB Atlas ;
- registrar de `stratusse.fr`.

## Prochain lot recommandé

1. recette fonctionnelle du parcours complet d’une Voix ;
2. recette responsive aux largeurs 375, 768, 1024 et 1440 px ;
3. audit accessibilité clavier, focus, contrastes, titres et textes alternatifs ;
4. vérification des emails et de Turnstile dans l’environnement de production ;
5. préparation de la démonstration portfolio.
