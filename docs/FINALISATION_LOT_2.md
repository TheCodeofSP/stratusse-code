# Finalisation V1 — Lot 2

Date : 11 août 2026

## Objectif

Fiabiliser le parcours d’une Voix lors de la création, de la mise en brouillon
et de la publication des Notes et des Lectures.

## Modifications réalisées

### Notes

- une Note créée directement comme publiée reçoit désormais
  `hasBeenPublished`, `firstPublishedAt` et `lastPublishedAt` ;
- le verrouillage du titre après la première publication repose donc sur un
  historique correctement initialisé.

### Bibliothèque

- la publication d’un brouillon repasse par les règles correspondant à son
  avancée de lecture ;
- une Lecture terminée exige un regard et une raison de la partager ;
- une Lecture en cours exige une intention et une attente ;
- une Lecture abandonnée exige une raison et ce qui a déçu ;
- une erreur précise est renvoyée lorsqu’un brouillon est incomplet ;
- plusieurs Voix peuvent désormais partager leur propre Lecture d’un même
  livre ;
- une même Voix ne peut toujours pas créer deux Lectures actives pour le même
  couple livre/auteur.

### Interface

- confirmations visibles après publication, remise en brouillon et
  suppression ;
- messages d’erreur visibles lorsque l’API refuse une action.

## Migration MongoDB obligatoire

L’ancien index unique global doit être remplacé par un index unique incluant la
Voix. Faire une sauvegarde Atlas, puis exécuter dans `apps/api` avec le fichier
`.env` de l’environnement ciblé :

```bash
npm run migrate:library-index
```

Résultat attendu :

```text
Index de la Bibliothèque mis à jour.
```

Cette commande crée d’abord le nouvel index, puis retire l’ancien. Elle peut
être relancée sans recréer un index déjà présent.

## Validation

- lint API réussi ;
- 27 tests API réussis sur 27 ;
- lint web réussi ;
- build web de production réussi.

## Recette manuelle à effectuer après intégration

1. créer puis publier une Note directement ;
2. vérifier que son titre est verrouillé lors de la modification ;
3. enregistrer une Lecture terminée incomplète en brouillon ;
4. vérifier que sa publication est refusée avec un message clair ;
5. compléter le regard et la raison du partage, puis publier ;
6. remettre la Note et la Lecture en brouillon ;
7. les republier et vérifier leur retour dans les listes publiques ;
8. publier le même livre avec deux comptes Voix distincts après la migration ;
9. vérifier que les deux regards sont regroupés dans la Bibliothèque ;
10. supprimer les contenus de recette.
