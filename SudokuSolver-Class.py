import random

class Board(object):
    """
    Class that solves and generates new boards
    """
    def __init__(self):
        self.board = [[random.randint(1, 9), 0, 0, 0, 0, 0, 0, 0, 0], 
          [0, 0, 0, 0, 0, 0, 0, 0, 0], 
          [0, 0, 0, 0, 0, 0, 0, 0, 0], 
          [0, 0, 0, 0, 0, 0, 0, 0, 0], 
          [0, 0, 0, 0, 0, 0, 0, 0, 0], 
          [0, 0, 0, 0, 0, 0, 0, 0, 0], 
          [0, 0, 0, 0, 0, 0, 0, 0, 0], 
          [0, 0, 0, 0, 0, 0, 0, 0, 0], 
          [0, 0, 0, 0, 0, 0, 0, 0, 0]]
        self.solved_board = self.board 

    def generate_board(self):
        self.solve()
        self.clear_random_positions()

    def clear_random_positions(self):
        for i in range(32):
            self.solved_board[random.randint(0, 8)][random.randint(0, 8)] = 0
        
    def show_position(self, position):
        row, col = position
        return self.solved_board[row][col] 

    def clear_board(self):
        for i in range(9):
            for j in range(9):
                self.solved_board[i][j] = 0       

    def show_board(self):
        for i, column_element in enumerate(self.solved_board):
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

    def row_valid(self, row, num):
        # Check row
        for i in range(9):
            if self.solved_board[row][i] == num and self.solved_board[row][i] != 0:
                return False
        return True

    def row_duplicates(self, row, num):
        # Check row
        count_duplicates = 0
        for i in range(9):
            if self.solved_board[row][i] == num and self.solved_board[row][i] != 0:
                count_duplicates += 1    
        if count_duplicates > 1:
            return True
        else:
            return False
        
    def column_valid(self, column, num):
        # Check row
        for i in range(9):
            if self.solved_board[i][column] == num and self.solved_board[i][column] != 0:
                return False
        return True

    def column_duplicates(self, column, num):
        # Check row
        count_duplicates = 0
        for i in range(9):
            if self.solved_board[i][column] == num and self.solved_board[i][column] != 0:
                count_duplicates += 1    
        if count_duplicates > 1:
            return True
        else:
            return False
        
    def square_valid(self, position, num):
        # Check box
        square_row = position[0]//3
        square_column = position[1]//3
        for i in range(square_row*3, square_row*3 + 3):
            # print(i)
            for j in range(square_column*3, square_column*3 + 3):
                if self.solved_board[i][j] == num and self.solved_board[i][j] != 0:
                    return False
        return True

    def square_duplicates(self, position, num):
        # Check box
        count_duplicates = 0    
        square_row = position[0]//3
        square_column = position[1]//3

        for i in range(square_row*3, square_row*3 + 3):
            for j in range(square_column*3, square_column*3 + 3):
                if self.solved_board[i][j] == num and self.solved_board[i][j] != 0:
                    count_duplicates += 1
        if count_duplicates > 1:
            return True
        else:
            return False
        

    def find_empty(self, l):
        for i, row_element in enumerate(self.solved_board):
            for j, column_element in enumerate(row_element):
                if column_element == 0:
                    l[0] = i
                    l[1] = j
                    return True
        return False

    def valid(self, position, num):
        if self.row_valid(position[0], num) and self.column_valid(position[1], num) and self.square_valid(position, num):
            return True

    def duplicates(self, position, num):
        if self.row_duplicates(position[0], num) or self.column_duplicates(position[1], num) or self.square_duplicates(position, num):
            return True

    def check_board(self):
        for i in range(9):
            for j in range(9):
                if self.duplicates((i,j), self.solved_board[i][j]):
                    # print(i,j)
                    # print("ok")
                    return False
        return True

    def solve(self):
        l =[0, 0] 
        if(not self.find_empty(l)):
            # self.show_board() 
            return True
        row = l[0]
        column = l[1]
        
        for i in range(1,10):
            if self.valid((row,column), i):
                self.solved_board[row][column] = i
                if self.solve():
                    return True
                self.solved_board[row][column] = 0
        return False

if __name__ == "__main__":    

    board = Board()
    board.generate_board()
    board.show_board()
    board.solve()
    board.show_board()
    print(board.show_position((0,0)))
    board.clear_board()
    board.show_board()
    print(board.check_board())


    # print(square_valid(board,[8,1],3))
    # if(check_board(board)):        
    #     if(solve(board)):
    #         print("thats right")
    #     else: 
    #         print("No solution exists")
    # else:
    #     print("check duplicates")
