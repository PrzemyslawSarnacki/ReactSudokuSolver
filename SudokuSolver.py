

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

def row_valid(solved_board, row, num):
    # Check row
    for i in range(9):
        if solved_board[row][i] == num and solved_board[row][i] != 0:
            return False
    return True

def row_duplicates(solved_board, row, num):
    # Check row
    count_duplicates = 0
    for i in range(9):
        if solved_board[row][i] == num and solved_board[row][i] != 0:
            count_duplicates += 1    
    if count_duplicates > 1:
        return True
    else:
        return False
    
def column_valid(solved_board, column, num):
    # Check row
    for i in range(9):
        if solved_board[i][column] == num and solved_board[i][column] != 0:
            return False
    return True

def column_duplicates(solved_board, column, num):
    # Check row
    count_duplicates = 0
    for i in range(9):
        if solved_board[i][column] == num and solved_board[i][column] != 0:
            count_duplicates += 1    
    if count_duplicates > 1:
        return True
    else:
        return False
    
def square_valid(solved_board, position, num):
    # Check box
    square_row = position[0]//3
    square_column = position[1]//3

    for i in range(square_row*3, square_row*3 + 3):
        for j in range(square_column*3, square_column*3 + 3):
            if solved_board[i][j] == num and solved_board[i][j] != 0:
                return False
    return True

def square_duplicates(solved_board, position, num):
    # Check box
    count_duplicates = 0    
    square_row = position[0]//3
    square_column = position[1]//3

    for i in range(square_row*3, square_row*3 + 3):
        for j in range(square_column*3, square_column*3 + 3):
            if solved_board[i][j] == num and solved_board[i][j] != 0:
                count_duplicates += 1
    if count_duplicates > 1:
        return True
    else:
        return False
    

def find_empty(solved_board, l):
    for i, row_element in enumerate(solved_board):
        for j, column_element in enumerate(row_element):
            if column_element == 0:
                l[0] = i
                l[1] = j
                return True
    return False

def valid(solved_board, position, num):
    if row_valid(solved_board, position[0], num) and column_valid(solved_board, position[1], num) and square_valid(solved_board, position, num):
        return True

def duplicates(solved_board, position, num):
    if row_duplicates(solved_board, position[0], num) or column_duplicates(solved_board, position[1], num) or square_duplicates(solved_board, position, num):
        return True

def check_board(solved_board):
    # Is board correct?
    for i in range(9):
        for j in range(9):
            if duplicates(solved_board, (i,j), solved_board[i][j]):
                print(i,j)
                # print("ok")
                return False
    return True

def solve(solved_board):
    l =[0, 0] 
    if(not find_empty(solved_board, l)):
        show_board(solved_board) 
        return True
    row = l[0]
    column = l[1]
    
    for i in range(1,10):
        if valid(solved_board, (row,column), i):
            solved_board[row][column] = i
            if solve(solved_board):
                return True
            solved_board[row][column] = 0
    return False

if __name__ == "__main__":    
    
    board = [[3, 0, 6, 5, 0, 8, 4, 0, 0], 
          [5, 2, 0, 0, 0, 0, 0, 0, 0], 
          [0, 8, 7, 0, 0, 0, 0, 3, 1], 
          [0, 0, 3, 0, 1, 0, 0, 8, 0], 
          [9, 0, 0, 8, 6, 3, 0, 0, 5], 
          [0, 5, 0, 0, 9, 0, 6, 0, 0], 
          [1, 3, 0, 0, 0, 0, 2, 5, 0], 
          [0, 0, 0, 0, 0, 0, 0, 7, 4], 
          [0, 0, 5, 2, 0, 6, 3, 0, 0]] 

    if(check_board(board)):        
        if(solve(board)):
            print("thats right")
        else: 
            print("No solution exists")
    else:
        print("check duplicates")
