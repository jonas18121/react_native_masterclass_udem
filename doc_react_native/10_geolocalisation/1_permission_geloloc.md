# Permissions de Géolocalisation

site : https://docs.expo.io/versions/v41.0.0/sdk/permissions/

au départ, on voulais faire la permission de Géolocalisation avec `expo-permissions` mais, actuellement il est dépressié. donc on va géré ça avec `Location.requestForegroundPermissionsAsync();` de `expo-location` ( https://docs.expo.io/versions/v41.0.0/sdk/location/ ) dans la partie 3 `# Obtenir La Géolocalisation`

## Donc ici on va juste demandé à l'utilisateur la permission de pouvoir accéder a ses multimédia (photos, vidéo, etc...) 

Dans `App.js`

- On installe MediaLibrary

    > expo install expo-media-library

- On importe MediaLibrary

    import * as MediaLibrary from 'expo-media-library';

- `MediaLibrary.requestPermissionsAsync()`, c'est pour demader à l'utilisateur la permission de pouvoir accéder a ses multimédia, on va le mettre dans la fonction `loadRessources()`

- Comme dans la fonction `loadRessources()`, on aura 3 fonctions asyncrone (` Font.loadAsync()`, `renderIntialScreen()` et `MediaLibrary.requestPermissionsAsync()`), chacun d'eux 3 vont mettre un cerain temps pour executer et rendre quelques choses. et avant que la troisièmes fonction s'execute, il faut que la première rende une response avant, puis que la deuxième rende une réponse a sont tour. donc ça peut prendre du temps.

- on va réunir ces trois fonctions dans une seule promise `new Promise.all([])` (un tableau de promesse), qu'on va rendre dans une constante nommé `result` , comme ça ils s'executerons au même moment , ça prendra moins de temps

- premier élément du tableau : `result[0]`, deuxièmes élément du tableau : `result[1]`, troisièmes élément du tableau : `result[2]`

- On va chercher le status dans le troisièmes élément du tableau `const status = result[2].status` pour le mettre dans une condition if()

Dans `App.js`

    // import { StatusBar } from 'expo-status-bar';
    import React, { useState, useEffect }from 'react';
    import { StyleSheet, Text, View, StatusBar, ActivityIndicator } from 'react-native';
    import { NavigationContainer } from '@react-navigation/native';
    import { createStackNavigator } from '@react-navigation/stack';
    import * as Font from 'expo-font';
    import * as MediaLibrary from 'expo-media-library';

    // screens
    import LoginScreen from './src/screens/LoginScreen';
    import HomeScreen from './src/screens/HomeScreen';

    // utils
    import { renderIntialScreen } from './src/utils/helpers';

    const { Navigator, Screen } = createStackNavigator();

    export default function App() {

        const [loading, setLoading] = useState(true);

        const [initialScreen, setInitilaScreen] = useState("Login");

        const loadRessources = async () => {
            try {

                const result = await new Promise.all([

                    Font.loadAsync({
                        Poppins:      require('./assets/fonts/Poppins-Regular.ttf'),
                        LeckerliOne:  require('./assets/fonts/LeckerliOne-Regular.ttf')
                    }),
                    renderIntialScreen(),
                    MediaLibrary.requestPermissionsAsync()
                ]);

                const route = result[1];
                const status = result[2].status ;

                if(route && status === "granted" ) {
                    setInitilaScreen(route);
                    setLoading(false);
                }

            } catch (error) {
                console.error("error loading ressources", error);
            }        
        }

        useEffect(() => {
            loadRessources();
            StatusBar.setBackgroundColor("#2dbb54");
        }, []);

        if (loading) {
            
            return (
                <View style={styles.container}>

                    {/* // spinner */}
                    <ActivityIndicator />
                </View>
            );
        }

        return (
        
            <NavigationContainer>
                <Navigator 
                    screenOptions={{ headerShown: false }}
                    initialRouteName={initialScreen}
                >
                    <Screen name='Login' component={LoginScreen} />
                    <Screen name='Home' component={HomeScreen} />
                </Navigator>
            </NavigationContainer>
        );
    }



    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    });
