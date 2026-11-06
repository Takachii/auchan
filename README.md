# Projet Auchan – Plateforme E-Commerce Web
Application Web e-commerce moderne et dynamique développée pour le centre commercial Auchan. Ce projet met en œuvre une architecture front-end modulaire en JavaScript vanilla (ES6+), une interface entièrement responsive conçue avec Tailwind CSS, ainsi qu'une persistance des données via le LocalStorage et des interactions avancées (Glisser-Déposer / Drag & Drop).

## Structure du Projet
```
auchan/
├── index.html                  # Structure principale de la page
├── data/
│   └── data.json               # Catalogue initial des produits (JSON)
├── css/
│   └── style.css               # Fichier de style (configuration Tailwind)
└── js/
    ├── main.js                 # Point d'entrée principal (initialisation & imports)
    ├── api.js                  # Logique de récupération des données (Fetch)
    ├── products.js             # Logique métier : affichage, pagination, filtres et recherche
    ├── cart.js                 # Logique du panier : ajout, calcul des totaux, doublons
    ├── dragDrop.js             # Gestion exclusive des événements de Glisser-Déposer
    ├── storage.js              # Interactions avec le LocalStorage (JSON.stringify / parse)
    ├── ui.js                   # Manipulation du DOM (Vue Grille/Liste, mise à jour visuelle)
    └── validation.js           # Fonctions de vérification Regex pour les formulaires
```
## Système de Panier Interactif :

Ajout d'articles par Drag & Drop (Glisser-Déposer) directement dans la zone du panier.

Ouverture/fermeture fluide du popup panier.

Calcul automatique du prix total et gestion de la suppression des articles.

Persistance des Données : Sauvegarde et restauration de l'état de l'application (catalogue et panier) via le LocalStorage et JSON.stringify() / JSON.parse().

## Fonctionnalités en Cours / Prochaines Étapes
Architecture Modulaire ES6+ : Séparation stricte du code en modules (import / export) et utilisation de fonctions fléchées (arrow functions) et de méthodes avancées (map, filter, reduce, etc.).

Chargement des Données : Implémentation de l'API Fetch pour consommer le fichier data.json.

Catalogue & Recherche : Barre de recherche instantanée, filtrage par catégorie et système de pagination.

Back-Office Administrateur (CRUD) : Interface d'administration pour ajouter, modifier, afficher et supprimer des produits avec répercussion directe sur le stockage local.

Sécurité & API Externes : Validation rigoureuse des formulaires via Expressions Régulières (Regex) et intégration de l'API publique RandomUser pour la génération de données de test.

## Stack Technique
Langages : HTML5, CSS3, JavaScript (ES6+)

Stylisation : Tailwind CSS

Outils & Versioning : Git, GitHub, Conventional Commits

Stockage : LocalStorage API

## Stratégie Git & Workflow
Le projet suit rigoureusement les bonnes pratiques de versioning :

main : Branche de production / version stable.

develop : Branche d'intégration des fonctionnalités.

feature/* : Branches de travail isolées pour chaque tâche (ex: feature/drag-drop, feature/pagination).

Conventional Commits : Utilisation de préfixes explicites (feat:, fix:, style:, docs:, etc.) pour les messages de commit.