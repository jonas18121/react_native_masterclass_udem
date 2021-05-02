# Le hook useState

## Formule hook useState

la formule générale pour utiliser le hook useState

- const [X, Y] = useState(a)

    - useState est une fonction qui prends un élément en paramètre `(a)` et retoune un tableau

    - Ce tableau a été déstructuré de façon à ce que `X` soit le 1er élément et `Y` le 2ème élément

    - `X` est notre `state` et aura comme valeur par défaut `a`

    - `Y` est la fonction qui nous permettra de mettre à jour notre `state`

## Le code

Dans `App.js`

- On importe `useState qui représente le state` si on était on une classe

- const [state, setState] = useState();. 

    - `state` est un objet, 
    - `setState` est la fonction qui va nous permettre de modifier le contenu de l'objet `state`
    - Dans `useState()` , il faut mettre en argument l'état initial de l'objet `state`


Dans `App.js`

    import React, {useState, Fragment} from 'react';
    import './App.css';

    function App() {

        // const [count, setCount] = useState(0);
        // const [visible, setVisible] = useState(true);
        const [state, setState] = useState({
            count: 0,
            visible: true
        });

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