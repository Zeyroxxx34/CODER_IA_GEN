```
Coder IA Gen


-- Description --

Application full-stack containerisée utilisant :

Frontend : Vite + React

Backend : FastAPI + SQLAlchemy

Base de données : PostgreSQL

Containerisation : Docker & Docker Compose

Cette application implémente un compteur stocké dans PostgreSQL, exposé via FastAPI et manipulable depuis l’interface React.


-- Architecture du projet --


coder_ia_gen/
├─ back-fastapi/                 # Backend FastAPI
│  ├─ app/
│  │  ├─ __init__.py           
│  │  ├─ main.py               
│  │  └─ models/
│  │     ├─ __init__.py
│  │     └─ count_table.py     
│  └─ requirements.txt          
├─ coder_ia_gen/                 # Frontend Vite + React
│  ├─ src/
│  │  ├─ App.tsx
│  │  └─ main.tsx
│  ├─ package.json
│  └─ vite.config.ts
├─ docker-compose.yml            # Définition des services Docker
└─ README.md                    


-- Prérequis --

Docker (version récente)


-- Installation et exécution --


1. Build des images Docker

Cette étape construit toutes les images nécessaires pour le projet :

docker compose build


2. Lancer les conteneurs

Une fois les images construites, démarrer les services avec :

docker compose up

Cette commande lance PostgreSQL, FastAPI et le frontend Vite-React.
Le frontend sera accessible sur http://localhost:5173
Le backend sera accessible sur http://localhost:8000


3. Arrêter les conteneurs

Pour stopper et supprimer les conteneurs tout en conservant les volumes :

docker compose down


4. Développement

Lors de modifications du code (Frontend ou Backend), il est nécessaire de reconstruire l’image Docker des services avant de relancer les conteneurs afin que les changements soient pris en compte.

docker compose build
docker compose up

```
