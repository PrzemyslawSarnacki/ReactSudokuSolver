import React, { useState, useEffect } from 'react';
import './App.css';
import { ok } from 'assert';


const App = () => {

    const [show, setShow] = useState(false);
    const [duplicate, setDuplicate] = useState([-1,-1]);
    const [solvedBoard, setSolvedBoard] = useState([[3, 0, 6, 5, 0, 8, 4, 0, 0],
        [5, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 8, 7, 0, 0, 0, 0, 3, 1],
        [0, 0, 3, 0, 1, 0, 0, 8, 0],
        [9, 0, 0, 8, 6, 3, 0, 0, 5],
        [0, 5, 0, 0, 9, 0, 6, 0, 0],
        [1, 3, 0, 0, 0, 0, 2, 5, 0],
        [0, 0, 0, 0, 0, 0, 0, 7, 4],
        [0, 0, 5, 2, 0, 6, 3, 0, 0]]);
    
        const [board, setBoard] = useState([[3, 0, 6, 5, 0, 8, 4, 0, 0],
        [5, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 8, 7, 0, 0, 0, 0, 3, 1],
        [0, 0, 3, 0, 1, 0, 0, 8, 0],
        [9, 0, 0, 8, 6, 3, 0, 0, 5],
        [0, 5, 0, 0, 9, 0, 6, 0, 0],
        [1, 3, 0, 0, 0, 0, 2, 5, 0],
        [0, 0, 0, 0, 0, 0, 0, 7, 4],
        [0, 0, 5, 2, 0, 6, 3, 0, 0]]);
        
    useEffect(() => {
        console.log("updated")
    }, [duplicate])
    
    useEffect(() => {
        console.log("updated")
    }, [board])

    const handleChange = (i: number, j: number, e: any) => {
        if (e.target.value) {
            board[i][j] = parseInt(e.target.value)
            checkBoard();
            setSolvedBoard(board);
        }
        else if (e.target.value < 0 || e.target.value > 9){
            board[i][j] = 0
            setSolvedBoard(board);
        }
        else {
            console.log("wrong")
        }
    }

    const handleClick = () => {
        setShow(true);
        solve();
    }
    
    const handleHide = () => {
        setShow(false);
    }
    const handleClear = () => {
        
        var emptyBoard: number[][] = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]]
        setShow(false);
        setBoard(emptyBoard);
        console.log(board);
    }

    const columnValid = (column: number, num: number) => {

        for (let i = 0; i < 9; i++) {
            if (solvedBoard[i][column] === num && solvedBoard[i][column] !== 0) {
                return false;
            }
        }
        return true;
    }

    const columnDuplicates = (column: number, num: number) => {
        let duplicateCounter: number = 0;
        let duplicatePosition: number[] = [-1, -1];
        for (let i = 0; i < 9; i++) {
            if (solvedBoard[i][column] === num && solvedBoard[i][column] !== 0) {
                duplicateCounter ++;
                duplicatePosition = [i, column]
            }
        }
        if (duplicateCounter > 1) {
            setDuplicate(duplicatePosition);
            return true;
        }
        else{
            return false;
        }
    }
    
    const rowDuplicates = (row: number, num: number) => {
        let duplicateCounter: number = 0;
        let duplicatePosition: number[] = [-1, -1];
        for (let i = 0; i < 9; i++) {
            if (solvedBoard[row][i] === num && solvedBoard[row][i] !== 0) {
                duplicateCounter ++;
                duplicatePosition = [row, i]
            }
        }
        if (duplicateCounter > 1) {
            setDuplicate(duplicatePosition);
            return true;
        }
        else{
            return false;
        }
    }
    
    const squareDuplicates = (position: number[], num: number) => {
        let duplicateCounter: number = 0;
        let duplicatePosition: number[] = [-1, -1];
        
        let squareRow: number = Math.floor(position[0] / 3);
        let squareColumn: number = Math.floor(position[1] / 3);
        
        for (let i = squareRow * 3; i < squareRow * 3 + 3; i++) {
            for (let j = squareColumn * 3; j < squareColumn * 3 + 3; j++) {
                if (solvedBoard[i][j] === num && solvedBoard[i][j] !== 0) {
                    duplicateCounter++;
                    duplicatePosition = [i, j];
                }
            }
        }
        if (duplicateCounter > 1) {
            setDuplicate(duplicatePosition);
            return true;
        }
        else{
            return false;
        }
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
    
    const checkBoard = () => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (duplicates([i, j], solvedBoard[i][j])){
                    return false;
                }
            }
        }
        return true;
    }

    const duplicates = (position: number[], num: number) => {
        if (rowDuplicates(position[0], num) || columnDuplicates(position[1], num) || squareDuplicates(position, num)) {
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
                <div className="not-solved-box">
                    {board.map((row, i: number) => {
                        return (<div>
                            {row.map((element, j: number) => {
                                if (i === duplicate[0] && j === duplicate[1]) {
                                    return (
                                        <input className="wrong-square" type="number" key={`${Math.floor((Math.random() * 1000))}-min`} defaultValue={element} onChange={(e: any) => handleChange(i, j, e)} />
                                        )
                            }
                            else {
                                return (
                                    <input className="square" type="number" key={`${Math.floor((Math.random() * 1000))}-min`} defaultValue={element} onChange={(e: any) => handleChange(i, j, e)} />
                                    )
                                }
                            })}
                        </div>)
                    })}
                    <div className="not-solved">
                        <button className="button" onClick={handleClick}>Solve!</button>
                        <button className="button" onClick={handleHide}>Hide</button>
                        <button className="button" onClick={handleClear}>Clear</button>
                    </div>
                    <div className="solved-box">
                        {show ? (
                            <div>
                                {solvedBoard.map((row, i: number) => {
                                    return (<div key={i}>
                                        {row.map((element, j: number) => {
                                            return (
                                                <div key={i} className="square row">
                                                    <p>
                                                        <text className="solved" key={j} >{element}</text>
                                                    </p>
                                                </div>
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
