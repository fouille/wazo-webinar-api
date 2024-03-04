# 🚀 ATELIO : Mairie de Chesnay

# Objectif
Répondre à une demande d'un client final Mairie de Chesnay, ce dévelopement est nécessaire à ses habitudes de focntionnement en interne.

# Prérequis 
Avoir cette branche dans `/var/www/` et la redirection du domaine dans le dosier `public`
Stack >= 22.17
Chaque utilisateurs doivent avoir l'authentification active

# Limitation
Cette interface ne liste le statut des utilisateur sur l'objet `line_state` (SIP) et non sur l'état de l'utilisateur (Auth)

# Diffusion
Ce script a été développé pour favoriser les migrations de Xivo vers Wazo, mais peut-être utilisation dans des contextes bien différents.

# Installation
Télécharger la branche : 

```
git clone --branch Atelio-MairieDuChesnay <remote-repo-url>
```

Configurer le fichier host du serveur Web pour lire directement dans le dossier "public"

# Liste des utilisateurs connus
* 2023 : ATELIO - Mairie du Chesnay

# Changelog
Suivre les releases `MairieChesnay` sur ce Github

