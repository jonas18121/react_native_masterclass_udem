# Le Passager Reçoit La Confirmation Du Taxi

### Dans PassengerScreen.js

- Dans `connectSocket`

    - On ajoute `io.on('requestPassenger', taxiInfo => {`

     - `'requestPassenger'` comme évènnement

     - on cree la propriété `taxiCoords` dans ` initialState`

     - Dans `setState()` qu'on a mis dans `io.on()` on met `taxiCoords`
     qui va nous permttre de mettre le coordonnées du du taxi qui est en route 

Dans `PassengerScreen.js`

    ...

    let io;

    const initialState = { 
        latitude: null, 
        longitude: null,
        coordinates: [],
        destinationCoords: null,
        taxiCoords: null
    };

    ....

        const connectSocket = () => {
            io = SocketIO.connect(SERVER_URL);

            io.on('connect', () => {
                console.log('connexion passager réussie');
            });

            io.on('requestPassenger', taxiInfo => {
                setState(prevState => ({
                    ...prevState,
                    taxiCoords: {
                        latitude: taxiInfo.lat,
                        longitude: taxiInfo.long
                    }
                }));
            })
        }