import React from 'react';
import './App.css';


const App = () => {
    var board : number[][] = [[3, 0, 6, 5, 0, 8, 4, 0, 0],
            [5, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 8, 7, 0, 0, 0, 0, 3, 1],
            [0, 0, 3, 0, 1, 0, 0, 8, 0],
            [9, 0, 0, 8, 6, 3, 0, 0, 5],
            [0, 5, 0, 0, 9, 0, 6, 0, 0],
            [1, 3, 0, 0, 0, 0, 2, 5, 0],
            [0, 0, 0, 0, 0, 0, 0, 7, 4],
            [0, 0, 5, 2, 0, 6, 3, 0, 0]]

    var newb : number[] = [3,3,3,3,3]
    const handleChange = (e: any) => {
        console.log(e.value)

    }
    return (
        <div className="App">
            <header className="App-header">
                <p>
             {board.map((row, i) => {
                 return (<div>
                     {row.map((element, j) => {
                         return (
                             <input defaultValue={element} key={j} onChange={handleChange} style={{ width: "15px" }} />
                             )
                    })}
                 </div>)
            })}
                </p>
            </header>
        </div>
    );
}

export default App;
