# Le hook useState

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