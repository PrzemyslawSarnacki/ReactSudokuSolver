import React, { useState } from 'react';
import './App.css';
import { ok } from 'assert';

var solvedBoard: number[][] = [[3, 0, 6, 5, 0, 8, 4, 0, 0],
[5, 2, 0, 0, 0, 0, 0, 0, 0],
[0, 8, 7, 0, 0, 0, 0, 3, 1],
[0, 0, 3, 0, 1, 0, 0, 8, 0],
[9, 0, 0, 8, 6, 3, 0, 0, 5],
[0, 5, 0, 0, 9, 0, 6, 0, 0],
[1, 3, 0, 0, 0, 0, 2, 5, 0],
[0, 0, 0, 0, 0, 0, 0, 7, 4],
[0, 0, 5, 2, 0, 6, 3, 0, 0]]

const App = () => {

    const [show, setShow] = useState(false);

    var board: number[][] = [[3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0]]

    const handleChange = (i: number, j: number, e: any) => {
        if (e.target.value) {
            board[i][j] = parseInt(e.target.value)
            solvedBoard = board
            console.log(solvedBoard)
            setShow(true);
            solve();
        }
        else {
            console.log("wrong")
        }
    }

    const handleClick = () => {
        setShow(true);
        solve();
    }

    const columnValid = (column: number, num: number) => {

        for (let i = 0; i < 9; i++) {
            if (solvedBoard[i][column] === num && solvedBoard[i][column] !== 0) {
                return false;
            }
        }
        return true;
    }

    const rowValid = (row: number, num: number) => {
        for (let i = 0; i < 9; i++) {
            if (solvedBoard[row][i] === num && solvedBoard[row][i] !== 0) {
                return false;
            }
        }
        return true
    }

    const findEmpty = (l: number[]) => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (solvedBoard[i][j] === 0) {
                    l[0] = i;
                    l[1] = j;
                    return true;
                }
            }
        }
        return false;
    }

    const squareValid = (position: number[], num: number) => {
        let squareRow: number = Math.floor(position[0] / 3);
        let squareColumn: number = Math.floor(position[1] / 3);

        for (let i = squareRow * 3; i < squareRow * 3 + 3; i++) {
            for (let j = squareColumn * 3; j < squareColumn * 3 + 3; j++) {
                if (solvedBoard[i][j] === num && solvedBoard[i][j] !== 0) {
                    return false;
                }
            }
        }
        return true;
    }

    const valid = (position: number[], num: number) => {
        if (rowValid(position[0], num) && columnValid(position[1], num) && squareValid(position, num)) {
            return true;
        }
    }

    const solve = () => {
        var l: number[] = [0, 0];
        if (!findEmpty(l)) {
            return true;
        }
        var row: number = l[0];
        var column: number = l[1];
        var position: number[] = [row, column];
        for (let i = 1; i < 10; i++) {
            if (valid(position, i)) {
                solvedBoard[row][column] = i;
                if (solve()) {
                    return true;
                }
                solvedBoard[row][column] = 0;
            }
        }
        return false
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
                    <button onClick={handleClick}>Look</button>
                    <div>
                        {show ? (
                            <div>
                                {solvedBoard.map((row, i: number) => {
                                    return (<div key={i}>
                                        {row.map((element, j: number) => {
                                            return (
                                                <input defaultValue={element} key={j} onChange={(e: any) => handleChange(i, j, e)} style={{ width: "15px" }} />
                                            )
                                        })}
                                    </div>)
                                })}
                            </div>

                        ) : (null)}
                    </div>

                </div>
            </header>
        </div>
    );
}

export default App;
