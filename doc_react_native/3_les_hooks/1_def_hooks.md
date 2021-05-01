# Les hooks

site : https://fr.reactjs.org/docs/hooks-state.html

Les Hooks sont une nouveauté de React 16.8. Ils permettent de bénéficier d’un état local et d’autres fonctionnalités de React sans avoir à écrire de classes.

exepmle : 

`Composant de type fonction`

    import React, { useState } from 'react';

    function Example() {
        // Déclare une nouvelle variable d'état, que l'on va appeler « count »
        const [count, setCount] = useState(0);

        return (
            <div>
            <p>Vous avez cliqué {count} fois</p>
            <button onClick={() => setCount(count + 1)}>
                Cliquez ici
            </button>
            </div>
        );
    }

`C'est pareil qu'un composant de type classe`

    class Example extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
            count: 0
            };
        }

        render() {
            return (
            <div>
                <p>Vous avez cliqué {this.state.count} fois</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                Cliquez ici
                </button>
            </div>
            );
        }
    }

Les Hooks ne fonctionnent pas dans les classes. Mais vous pouvez les utiliser pour éviter d’écrire des classes.

### Qu’est-ce qu’un Hook ? 

Un Hook est une fonction qui permet de « se brancher » sur des fonctionnalités React. 
Par exemple, useState est un Hook qui permet d’ajouter l’état local React à des fonctions composants. 
Nous en apprendrons plus sur les Hooks par la suite.

### Quand utiliser un Hook ? 

Auparavant, si vous écriviez une fonction composant et que vous réalisiez que vous aviez besoin d’un état local à l’intérieur, vous deviez la convertir en classe. 
Désormais vous pouvez utiliser un Hook à l’intérieur de votre fonction composant. 
Et c’est justement ce que nous allons faire !