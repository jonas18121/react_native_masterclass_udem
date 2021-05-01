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
