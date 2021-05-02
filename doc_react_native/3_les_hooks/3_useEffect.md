# Le hook useEffect

## Formule hook useEffect

la formule générale pour utiliser le hook useEffect

- useEffect(A, B)

    - Le Hook d’effet permet l’exécution d’effets de bord dans les fonctions composants, il est Similaire à componentDidMount() et componentDidUpdate()

    - useEffect est une fonction asynchrone qui prends 2 éléments en paramètre (A et B)

    - A est la fonction a exécuter
    
    - B tableau d'éléments dont doit dépendre useEffect

## Le code

Dans `App.js`

- On importe useEffect depuis react

- `useEffect(() => {console.log('Je suis useEffect', state);}, [])` , useEffect avec un tableau vide en 2ème argument, ce comportera comme la méthode `componentDidMount()` et donc reagira seulement au 1er affichage du rendu

- `useEffect(() => {console.log('Je suis useEffect', state);}, [state])`, useEffect avec l'objet qui représente notre `state` dans le tableau en 2ème argument, ce comportera à la fois comme la méthode `componentDidMount()` et comme la méthode `componentDidUpdate()`. Donc il réagira à la fois au 1er affichage du rendu et aussi à chaque fois qu'on va modifier l'objet qui représente notre `state`

Dans `App.js`

    import React, {useState, useEffect, Fragment} from 'react';
    import './App.css';

    function App() {

        // const [count, setCount] = useState(0);
        // const [visible, setVisible] = useState(true);
        const [state, setState] = useState({
            count: 0,
            visible: true
        });

        useEffect(
            () => {
                console.log('Je suis useEffect', state);
            }, 
            [state]
        );

        const add = () => {
            const newCount = state.count + 1;
            
            setState(prevState => {
            return {
                ...prevState,
                count: newCount
            }
        });
        }

        const remove = () => {
            const newCount = state.count - 1;

            setState(prevState => {
                return {
                    ...prevState,
                    count: newCount
                }
            });
        }

        const toggle = () => {
            const newVisible = !state.visible;
            
            setState(prevState => {
            return {
                ...prevState,
                visible: newVisible
            }
        });
        }

        return (
            <div className="App">

                {state.visible ? (
                    <Fragment>
                        <h3>{state.count}</h3>

                        <button onClick={add}>Ajouter</button>
                        <button onClick={remove}>Retirer</button>
                    </Fragment>
                ) : (
                    <p>Le contenu n'est pas visible !</p>
                )}

                <button onClick={toggle}>Toggle Visibilité</button>
            </div>
        );
    }

    export default App;




