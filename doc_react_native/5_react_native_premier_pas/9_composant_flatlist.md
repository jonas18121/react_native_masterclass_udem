# Le composant FlatList

- Ce n'est pas sûr mais le composant React Native `FlatList` corresponds environ à la balise HTML `ul/ol`. et les enfants corresponds environ à la balise HTML `li`


- Coté code Natif `View` sera transformé en `???` pour Android avec Java et en `???` pour iOS avec Objectif-c

- Le composant `FlatList`, permet de faire défiler facilement et efficacement, une liste de balise `<li>` , dont le nombre de balise `<li>` est élevé et inconnu

- La liste d'élément viennnent d'une requête HTTP

- Avec le composant `FlatList`, on a un gain en performance


## test du composant FlatList

Dans `App.js`

- On importe `FlatList` depuis react native

- Pour le test on met des données en dur dans une constante `posts`

- `ScrollView` et `FlatList` ne doivent pas être importer ensemble si c'est 2 composant, on la même orientation de défilement

- ` data={posts}`, On passe dans la propriété `data`, la liste de données que l'on va vouloir scroller, ici c'est la constant posts qui représente un tableau d'articles

- `renderItem={(item) => <Text style={styles.item} >{item.item.title}</Text> }`, renderItem va retourner le titre de chaque article ,pour les afficher à l'écran

- Dans React Native chaque liste de composant enfant doit avoir une `key` unique comme dans React.js, 

- `keyExtractor={item => item.id.toString()}`, pour extraire la `key` unique, on va utiliser `keyExtractor` qui doit nous retourner la `key` en chaine de caractère, c'est pour cela qu'on utilise `.toString()`

Dans `App.js`


    import React, { useState } from 'react';
    import { View, Text, StyleSheet, TextInput, Image, ScrollView, FlatList } from 'react-native';
    import LOGO from "./assets/edgco.png"
    //ou
    // const LOGO = require('./assets/edgco.jpg');
    const urlWeb = "https://via.placeholder.com/150";

    const posts = [
        {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
        "userId": 1,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
        },
        {
        "userId": 1,
        "id": 3,
        "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
        },
        {
        "userId": 1,
        "id": 4,
        "title": "eum et est occaecati",
        "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
        },
        {
        "userId": 1,
        "id": 5,
        "title": "nesciunt quas odio",
        "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
        },
        {
        "userId": 1,
        "id": 6,
        "title": "dolorem eum magni eos aperiam quia",
        "body": "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
        },
        {
        "userId": 1,
        "id": 7,
        "title": "magnam facilis autem",
        "body": "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas"
        },
        {
        "userId": 1,
        "id": 8,
        "title": "dolorem dolore est ipsam",
        "body": "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae"
        },
        {
        "userId": 1,
        "id": 9,
        "title": "nesciunt iure omnis dolorem tempora et accusantium",
        "body": "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas"
        },
        {
        "userId": 1,
        "id": 10,
        "title": "optio molestias id quia eum",
        "body": "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error"
        },
        {
        "userId": 2,
        "id": 11,
        "title": "et ea vero quia laudantium autem",
        "body": "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi"
        },
        {
        "userId": 2,
        "id": 12,
        "title": "in quibusdam tempore odit est dolorem",
        "body": "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio"
        },
        {
        "userId": 2,
        "id": 13,
        "title": "dolorum ut in voluptas mollitia et saepe quo animi",
        "body": "aut dicta possimus sint mollitia voluptas commodi quo doloremque\niste corrupti reiciendis voluptatem eius rerum\nsit cumque quod eligendi laborum minima\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam"
        },
        {
        "userId": 2,
        "id": 14,
        "title": "voluptatem eligendi optio",
        "body": "fuga et accusamus dolorum perferendis illo voluptas\nnon doloremque neque facere\nad qui dolorum molestiae beatae\nsed aut voluptas totam sit illum"
        },
        {
        "userId": 2,
        "id": 15,
        "title": "eveniet quod temporibus",
        "body": "reprehenderit quos placeat\nvelit minima officia dolores impedit repudiandae molestiae nam\nvoluptas recusandae quis delectus\nofficiis harum fugiat vitae"
        },
        {
        "userId": 2,
        "id": 16,
        "title": "sint suscipit perspiciatis velit dolorum rerum ipsa laboriosam odio",
        "body": "suscipit nam nisi quo aperiam aut\nasperiores eos fugit maiores voluptatibus quia\nvoluptatem quis ullam qui in alias quia est\nconsequatur magni mollitia accusamus ea nisi voluptate dicta"
        },
        {
        "userId": 2,
        "id": 17,
        "title": "fugit voluptas sed molestias voluptatem provident",
        "body": "eos voluptas et aut odit natus earum\naspernatur fuga molestiae ullam\ndeserunt ratione qui eos\nqui nihil ratione nemo velit ut aut id quo"
        },
        {
        "userId": 2,
        "id": 18,
        "title": "voluptate et itaque vero tempora molestiae",
        "body": "eveniet quo quis\nlaborum totam consequatur non dolor\nut et est repudiandae\nest voluptatem vel debitis et magnam"
        },
        {
        "userId": 2,
        "id": 19,
        "title": "adipisci placeat illum aut reiciendis qui",
        "body": "illum quis cupiditate provident sit magnam\nea sed aut omnis\nveniam maiores ullam consequatur atque\nadipisci quo iste expedita sit quos voluptas"
        },
        {
        "userId": 2,
        "id": 20,
        "title": "doloribus ad provident suscipit at",
        "body": "qui consequuntur ducimus possimus quisquam amet similique\nsuscipit porro ipsam amet\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\nomnis rerum consequatur expedita quidem cumque explicabo"
        },
        {
        "userId": 3,
        "id": 21,
        "title": "asperiores ea ipsam voluptatibus modi minima quia sint",
        "body": "repellat aliquid praesentium dolorem quo\nsed totam minus non itaque\nnihil labore molestiae sunt dolor eveniet hic recusandae veniam\ntempora et tenetur expedita sunt"
        },
        {
        "userId": 3,
        "id": 22,
        "title": "dolor sint quo a velit explicabo quia nam",
        "body": "eos qui et ipsum ipsam suscipit aut\nsed omnis non odio\nexpedita earum mollitia molestiae aut atque rem suscipit\nnam impedit esse"
        }
    ];

    const App = () => {

        const [state, setSate] = useState("");

        return (

            
            <View style={styles.container} >

                <Text style={styles.hello} >Hello word</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder=" Entrer du texte" 
                    value={state}
                    onChangeText={value => setSate(value)} 
                />
            
                {/* afficher une image en locale */}
                <Image source={LOGO} style={styles.logo} />

                {/* afficher une image depuis internet */}
                <Image source={{uri : urlWeb }} style={styles.logo} />

                <FlatList 
                    data={posts} 
                    renderItem={(item) => <Text style={styles.item} >{item.item.title}</Text> }
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        )
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "green",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 35
        },
        hello: {
        color: '#fff',
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10
        },
        input: {
        borderWidth: 1,
        backgroundColor: '#fff',
        width: 200,
        height: 30,
        marginTop: 10
        },
        logo: {
        height: 150,
        width: 150,
        marginTop: 10,
        backgroundColor: "#f58"
        },
        item : {
            borderWidth: 2,
            borderColor: "#fff"
        }
    });

    export default App;