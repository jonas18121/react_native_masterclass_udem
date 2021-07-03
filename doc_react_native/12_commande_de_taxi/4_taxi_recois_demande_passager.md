#  Le Taxi Reçoit La Demange D'un Passager

### Dans DriverScreen.js 

- Dans la fonction `searchPassenger`

     - On ajoute `io.on('requestTaxi', passInfo => {`

     - `'requestTaxi'` comme évènnement

     - Dans `setState()` qu'on a mis dans `io.on()` on met `destinationCoords`
     qui va nous permttre de mettre le coordonnées du passager 

Dans `DriverScreen.js `

    ....


    const searchPassenger = ({latitude, longitude}) => {
        io = SocketIO.connect(SERVER_URL);
        io.on('connect', () => {
            console.log('connexion taxi réussie');

            //requête pour chercher un passager
            io.emit('requestPassenger', {latitude, longitude});

            io.on('requestTaxi', passInfo => {

                setState(prevState => ({
                    ...prevState,
                    destinationCoords: {
                        latitude: passInfo.latitude,
                        longitude: passInfo.longitude
                    }
                }));
            })
        })
    }


    .....