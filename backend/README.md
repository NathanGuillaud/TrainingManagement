# Backend

### Sources

https://github.com/aichbauer/express-rest-api-boilerplate.git
Echange de token plutôt que cookie
Utilisation de nodejs
Utilisation du framework expressjs qui simplifie la gestion des routes

### Ajouts

* Gestion des rôles (rôle admin et user), chaque utilisateur peut avoir plusieurs rôles.
* Création d'une auth.policy qui permet de sécuriser les routes par rapport au rôle de l'utilisateur (et pas seulement par rapport au token).
* Ajout d'une route privateAdmin, en plus des routes private et public. Elle permet de définir les routes disponibles pour les utilisateurs avec le rôle admin uniquement.
* Mise à jour des tests par rapport aux modifications effectuées.
* Suppression des codes inutiles.
* Ajout de la gestion des stages :
    * Modèle
    * Controleur (avec toutes les opérations CRUD)
    * Test
    * Mise à jour des routes

### Besoins

* Authentification avec JWT and REST API with JWT
* Mapping des routes avec express-routes-mapper
* Utilisation de Sequelize comme ORM avec mysql
* Environnement de développement avec mysql et tests avec sqlite
* Utilisation de eslint pour l'analyse statique du code (meilleure qualité du code)
* Tests d'intégration avec Jest
* Built avec npm/yarn scripts
* Pour démarrer l'application, taper yarn start