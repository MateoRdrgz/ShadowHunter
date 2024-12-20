## Dépendences

`pnpm install`

## Génération du swagger

`pnpm generate`

## Compilation TypeScript

`pnpm build`

## Lancement dev

Permet d'être lancé sans compilation et de relancer dynamiquement l'application à chaque update
`pnpm dev`

## Architecture

- Config : Contient l'initialisation de la connexion à la base de données
- Controllers : Contient les classes contenant la gestion des routes de l'API
- DTO : Contient les interfaces de communication de l'API
- Model: Contient les entités représentant les différentes tables SQL
- Routes : Fichier généré par tsoa pour la déclaration des routes
- Services : Contient le code métier
- app.ts : Fichier principal de l'application
- library.sqlite : Fichier de base de données
- package.json : Contient les dépendances nécessaires pour l'application
- tsconfig.json : Configuration de la compilation typescript
- tsoa.json: Configuration de la génération du Swagger

## Exercice

1) Identifier et corriger l'erreur de la route POST authors
2) Renvoyer une erreur personnalisée avec un code 404 si l'auteur n'est pas trouvée lors des routes PATCH et GET/{id}
3) 
    1) Développer la route GET /books
    2) Développer la route GET /books/{id}
    3) Développer la route POST /books
    4) Développer la route PATCH /books/{id}
4) 
    1) Développer le modèle BookCollection
    2) Développer le DTO BookCollection
    3) Développer la route GET /books-collection
    4) Développer la route GET /books-collection/{id}
    5) Développer la route POST /books-collection
    6) Développer la route PATCH /books-collection/{id}
5) 
    1) Mettre à jour la route DELETE /authors/{id} afin d'empêcher la suppression si un exemplaire d'un de ses livres est présent dans la bibliothèques
    2) Développer la route DELETE /books/{id} en empêchant la suppression du livre si un exemplaire est présent dans la bibliothèque
    3) Développer la route DELETE /books-collections/{id}
    
6) Renvoyer la liste des livres de l'auteur sur la route GET /authors/{id}/books
7) Renvoyer la liste des exemplaires du livre sur la route GET /books/{id}/books-collections

Exercice

    Créer une table utilisateur qui comprendra les logins et mot de passe (en base 64) des utilisateurs
    Créer une route /auth qui prendra en entrée un login + mot de passe et générera un token JWT simple
    Mettre à jour tsoa.json pour mettre une possibilité d'ajout du token :
        Objet "securityDefinition" avec une clef ("jwt" par exemple) et en valeur un objet contenant:
            type : apiKey
            in : Savoir si on le met en header, query ou autre...
            name: Nom du champ du token
        Ajout dans "routes" du champ "authenticationModule" avec notre middleware sécurité
    Mise en place d'un middleware qui vérifie la présence d'un token signé correctement sur toutes les routes

Exercice noté

    Créer trois utilisateurs :
        admin
        gerant
        utilisateur
    Générer des tokens contenant des droits de lecture/ecriture/suppression pour les tables author/book/bookCollection
    Gérer les droits d'accès suivants :
        l'administrateur a tout les droits
        le gérant peut :
            tout lire
            créer et modifier sur toutes les tables
            supprimer uniquement sur la table d'exemplaire des livres "Book Collection"
        l'utilisateur peut :
            tout lire
            créer un nouveau livre si l'auteur existe déjà mais pas de nouveau exemplaire
