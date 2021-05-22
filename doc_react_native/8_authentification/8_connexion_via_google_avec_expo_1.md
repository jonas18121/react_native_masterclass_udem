# Connexion Via Google Avec Expo partie 1

Doc Google sur Expo : https://docs.expo.io/versions/v41.0.0/sdk/google/

On va mettre place une connexion via Google avec Expo

1) On install le Google Auth

    > expo install expo-google-app-auth

2) on ce rend a ce lien de console google cloud

    https://console.cloud.google.com/apis/credentials

3) on cree un nouveau projet

    - on donne au projet un nom

4) on selection notre nouveau projet

5) On clique sur `creer des identifiants`

    - puis on choisit `ID client OAuth`

6) on clique sur `CONFIGURER L'ECRAN D'AUTORISATION`

    - Puis on choisi `Externes`

    - puis `creer`

7) On donne un nom a l'application

    - On rentre nom adresse email

    - Puis `Enregistrer`

8) puis On clique sur `creer des identifiants`

    - puis on choisit `ID client OAuth`

9) On choisit un type d'application

Pour IOS avec Expo

    - On donne un nom

    - Comme `ID de groupe` on met ceci : host.exp.exponent

    - Puis `Creer`


Pour Android avec Expo

    - On donne un nom

    - Comme `Nom du package` on met ceci : host.exp.exponent

    - On met cette commande dans notre terminale

        > openssl rand -base64 32 | openssl sha1 -c

    - On récupère la clé que ça a généré 
    
    - On colle cette clé  dans le champ `Empreinte du certificat SHA-1`

    - Puis `Creer`
