var board = [[3, 0, 6, 5, 0, 8, 4, 0, 0],
            [5, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 8, 7, 0, 0, 0, 0, 3, 1],
            [0, 0, 3, 0, 1, 0, 0, 8, 0],
            [9, 0, 0, 8, 6, 3, 0, 0, 5],
            [0, 5, 0, 0, 9, 0, 6, 0, 0],
            [1, 3, 0, 0, 0, 0, 2, 5, 0],
            [0, 0, 0, 0, 0, 0, 0, 7, 4],
            [0, 0, 5, 2, 0, 6, 3, 0, 0]]

var solvedBoard = [[3, 0, 6, 5, 0, 8, 4, 0, 0],
                    [5, 2, 0, 0, 0, 0, 0, 0, 0],
                    [0, 8, 7, 0, 0, 0, 0, 3, 1],
                    [0, 0, 3, 0, 1, 0, 0, 8, 0],
                    [9, 0, 0, 8, 6, 3, 0, 0, 5],
                    [0, 5, 0, 0, 9, 0, 6, 0, 0],
                    [1, 3, 0, 0, 0, 0, 2, 5, 0],
                    [0, 0, 0, 0, 0, 0, 0, 7, 4],
                    [0, 0, 5, 2, 0, 6, 3, 0, 0]]


const showBoard = (solvedBoard) => {
    solvedBoard.forEach((column, i) => {
        if (i % 3 == 0) {
            process.stdout.write("\n-------------------------\n")
        }
        else {
            process.stdout.write("")
        }
        column.forEach((row, j) => {
            if (j % 3 == 2) {
                process.stdout.write(`${row} | `)
            } else if (j == 0) {
                process.stdout.write(`\n| ${row} `)
            } else {
                process.stdout.write(`${row} `)
            }
        });
    });
    process.stdout.write("\n-------------------------\n")
}


const columnValid = (column, num) => {

    for (let i = 0; i < 9; i++) {
        if (solvedBoard[i][column] === num) {
            return false;
        }
    }
    return true;
}

const rowValid = (row, num) => {
    for (let i = 0; i < 9; i++) {
        if (solvedBoard[row][i] === num) {
            return false;
        }
    }
    return true
}

const findEmpty = (l) => {
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

const squareValid = (position, num) => {
    var squareRow = Math.floor(position[0] / 3);
    var squareColumn = Math.floor(position[1] / 3);
    
    for (var i = squareRow * 3; i < squareRow * 3 + 3; i++) {
        console.log(i)
        for (var j = squareColumn * 3; j < squareColumn * 3 + 3; j++) {
            if (solvedBoard[i][j] === num) {
                return false;
            }
        }
    }
    return true;
}

const valid = (position, num) => {
    if (rowValid(position[0], num) && columnValid(position[1], num) && squareValid(position, num)) {
        return true;
    }
}

const solve = () => {
    var l = [0, 0];
    if (!findEmpty(l)) {
        return true;
    }
    var row = l[0];
    var column = l[1];
    console.log(l)
    var position = [row, column];
    for (let i = 1; i < 10; i++) {
        if (valid(position, i)) {
            solvedBoard[row][column] = i;

            if (solve()) {
                console.log(solvedBoard);
                return true;
            }
            solvedBoard[row][column] = 0;
        }
    }
    return false
}
console.log(squareValid([8,1],3))

solve();
// console.log()
