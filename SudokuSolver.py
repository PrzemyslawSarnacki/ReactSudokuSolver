board = [
[7,8,0,4,0,0,1,2,0],
[6,0,0,0,7,5,0,0,9],
[0,0,0,6,0,1,0,7,4],
[0,0,7,0,4,0,0,0,0],
[6,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,1,0,0,0,0,2,0,0],
]


def show_board(solved_board):
    for i, column_element in enumerate(solved_board):
        if i % 3 == 0:
            print("\n-------------------------------")
        else:
            print("")
        for j, row_element in enumerate(column_element):
            if j % 3 == 2 :
                print(f"{row_element} |", end=" ")
            elif j == 0:
                print(f"| {row_element} ", end=" ")
            else:
                print(f"{row_element} ", end=" ")
    print("\n-------------------------------")

def row_valid(solved_board, position, num):
    # Check row
    for i, row_element in enumerate(solved_board):
        if solved_board[position[0]][i] == num and position[1] != i and solved_board[position[0]][i] != 0:
            return False
    return True

def column_valid(solved_board, position, num):
    # Check row
    for i, row_element in enumerate(solved_board):
        if solved_board[i][position[1]] == num and position[0] != i and solved_board[i][position[1]] != 0:
            return False
    return True

def square_valid(solved_board, position, num):
    # Check box
    square_row = position[0] - (position[0] % 3)
    square_column = position[1] - (position[1] % 3)

    for i in range(square_row, square_row + 3):
        for j in range(square_column, square_column + 3):
            if solved_board[i][j] == num and position[0] != i and position[1] != j and solved_board[i][j] != 0:
                return False
    return True

    

def find_empty(solved_board):
    for i, row_element in enumerate(solved_board):
        for j, column_element in enumerate(row_element):
            if column_element == 0:
                return (i, j)

def valid(solved_board, position, num):
    # validated = []
    # row_valid(solved_board, position, num)
    # column_valid(solved_board, position, num)
    # square_valid(solved_board, position, num)
    # if row_valid(solved_board, position, num) and column_valid(solved_board, position, num) and square_valid(solved_board, position, num):
    #     return True
    # else:
    #     False
            # print(column_element)
            # print(i, j)
    
    for i, row_element in enumerate(solved_board):
        if solved_board[position[0]][i] == num and position[1] != i and solved_board[position[0]][i] != 0:
            return False
    
    for i, row_element in enumerate(solved_board):
        if solved_board[i][position[1]] == num and position[0] != i and solved_board[i][position[1]] != 0:
            return False

    
    square_row = position[0]//3
    square_column = position[1]//3

    for i in range(square_row*3, square_row*3 + 3):
        for j in range(square_column, square_column + 3):
            if solved_board[i][j] == num and position[0] != i and position[1] != j and solved_board[i][j] != 0:
                return False
    return True
            

def solve(solved_board):
    find = find_empty(solved_board)
    if find:
        row, column = find
    else:
        show_board(solved_board)
        True
    
    for i in range(1,10):
        if valid(solved_board, (row,column), i):
            solved_board[row][column] = i

            if solve(solved_board):
                return True
            solved_board[row][column] = 0
    return False


show_board(board)

solve(board)