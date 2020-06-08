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

    // const handleChange = (e: any) => {
    const handleChange = (i: number, j: number, e: any) => {
        console.log(e.target.value)
        console.log(board[i][j])
        console.log(board)
        board[i][j] = parseInt(e.target.value)
    }
    return (
        <div className="App">
            <header className="App-header">
                <div>
             {board.map((row, i: number) => {
                 return (<div key={i}>
                     {row.map((element, j: number) => {
                         return (
                             <input type="number" defaultValue={element} key={j} onChange={(e: any) => handleChange(i, j, e)} style={{ width: "15px" }} />
                             )
                    })}
                 </div>)
            })}
                </div>
            </header>
        </div>
    );
}

export default App;
