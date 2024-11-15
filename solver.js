class SudokuSolver {
    solve(board) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === ".") {
                    for (let k = "1"; k <= "9"; k++) {
                        if (this.canPlace(k, i, j, board)) {
                            board[i][j] = k;
                            if (this.solve(board)) {
                                return true;
                            } else {
                                board[i][j] = ".";
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    canPlace(c, row, col, board) {
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === c) return false;
            if (board[row][i] === c) return false;
            if (board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] === c) return false;
        }
        return true;
    }

    isValidSudoku(board) {
        const rows = Array.from({ length: 9 }, () => new Set());
        const cols = Array.from({ length: 9 }, () => new Set());
        const boxes = Array.from({ length: 9 }, () => new Set());

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const num = board[i][j];
                if (num === ".") continue;

                const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
                if (rows[i].has(num) || cols[j].has(num) || boxes[boxIndex].has(num)) {
                    return false;
                }

                rows[i].add(num);
                cols[j].add(num);
                boxes[boxIndex].add(num);
            }
        }
        return true;
    }
}
