# Activer Google Direction API


- Pour activer Google Place API, on va sur ce site avec notre adresse email https://console.cloud.google.com/apis/credentials

- On selectionne, notre projet, ou on crée un nouveau projet.

- On clique sur l'onglet `API et Sercices`

- Puis on clique sur l'onglet `Bibliothèque`  

- Dedans on clique sur `Tout afficher` pour la partie des cartes

- Puis on sélectionne `Direction API` et on l'active

- RDV sur le site de `google map plateform` dans `Direction API` : https://developers.google.com/maps/documentation/directions/overview 

- Pour l'url de base `"https://maps.googleapis.com/maps/api"` on la déjà mise dans `utilis/helpers.js` .
On aura plus qu'a rajouter  `/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=YOUR_API_KEY`
