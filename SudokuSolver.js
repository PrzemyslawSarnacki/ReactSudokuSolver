var board = [[3, 0, 6, 5, 0, 8, 4, 0, 0],
            [5, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 8, 7, 0, 0, 0, 0, 3, 1],
            [0, 0, 3, 0, 1, 0, 0, 8, 0],
            [9, 0, 0, 8, 6, 3, 0, 0, 5],
            [0, 5, 0, 0, 9, 0, 6, 0, 0],
            [1, 3, 0, 0, 0, 0, 2, 5, 0],
            [0, 0, 0, 0, 0, 0, 0, 7, 4],
            [0, 0, 5, 2, 0, 6, 3, 0, 0]]


function showBoard(solvedBoard) {
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

console.log(board)
showBoard(board);