import { neighboours } from './tile';
export let solution = [];
export const gameOver = (sequence) => {
    for (let i = 0; i < sequence.length - 1; i++) {
        // console.log(i + 1, sequence[i]);
        if (sequence[i] !== (i + 1).toString()) return false;
    }
    //   console.log('gameOver');
    return true;
};

export const scrabble = (sequence) => {
    solution = [];
    // let debug = [];
    let tempseq = sequence.slice();
    let startidx = sequence.length - 1;
    let cand = [];
    let prev = tempseq[startidx];
    let num1 = 1;
    for (let i = 0; i < 30; i++) {
        cand = neighboours(startidx);
        num1 = Math.floor(Math.random() * cand.length);
        while (cand[num1] === prev) {
            num1 = Math.floor(Math.random() * cand.length);
        }
        prev = tempseq[cand[num1]];
        let temp = tempseq[cand[num1]];
        tempseq[cand[num1]] = tempseq[startidx];
        tempseq[startidx] = temp;

        solution.push(tempseq[startidx]);
        startidx = cand[num1];

        // debug.push(cand);
    }
    // console.log(debug);
    return tempseq;
};
const tostring = (grid) => {
    let n = 4,
        m = 4;
    let s = "";
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            s += grid[i][j] + ' ';
        }
    }
    // console.log(s);
    return s;
}

export const gameEnd = (grid) => {
    let i = 0;
    for (let j = 0; j < 4; j++) {
        for (let k = 0; k < 4; k++) {
            if (grid[j][k] !== i + 1) {
                return false;
            }
            i++;
        }

    }
    return true;
}
const bfs = (grid, i, j, visited) => {
    if (gameEnd(grid) || i > 3 || j > 3 || i < 0 || j < 0) {
        return []
    } else if (visited[grid] == 1) {
        return []
    } else {
        visited[grid] = 1;
        let x = [];
        if (i + 1 < 3) {
            let temp = grid[i][j];
            grid[i][j] = grid[i + 1][j];
            grid[i + 1][j] = temp;
            x = bfs(grid, i + 1, j, visited);
            temp = grid[i][j];
            grid[i][j] = grid[i + 1][j];
            grid[i + 1][j] = temp;
        }
        let y = [];
        if (j + 1 < 3) {
            temp = grid[i][j];
            grid[i][j] = grid[i][j + 1];
            grid[i][j + 1] = temp;
            y = bfs(grid, i, j + 1, visited);
            temp = grid[i][j];
            grid[i][j] = grid[i][j + 1];
            grid[i][j + 1] = temp;
        }
        let z = [];
        if (i - 1 >= 0) {
            temp = grid[i][j];
            grid[i][j] = grid[i - 1][j];
            grid[i - 1][j] = temp;
            z = bfs(grid, i - 1, j, visited);
            temp = grid[i][j];
            grid[i][j] = grid[i - 1][j];
            grid[i - 1][j] = temp;

        }
        let k = [];
        if (j - 1 >= 0) {
            temp = grid[i][j];
            grid[i][j] = grid[i][j - 1];
            grid[i][j - 1] = temp;
            k = bfs(grid, i, j - 1, visited);
            temp = grid[i][j];
            grid[i][j] = grid[i][j - 1];
            grid[i][j - 1] = temp;
        }
        let arr = [x, y, z, k];
        arr = arr.filter(x => (x.length > 0));
        let xx = arr[0];
        for (let x of arr) {
            if (x.length < xx.length) {
                xx = x;
            }
        }
        if (xx == x) {
            let temp = grid[i][j];
            grid[i][j] = grid[i + 1][j];
            grid[i + 1][j] = temp;
            return [...xx, (i + 1) * 4 + j];
        } else if (xx == y) {
            let temp = grid[i][j];
            grid[i][j] = grid[i][j + 1];
            grid[i][j + 1] = temp;
            return [...xx, (i) * 4 + j + 1];
        } else if (xx == z) {
            let temp = grid[i][j];
            grid[i][j] = grid[i - 1][j];
            grid[i - 1][j] = temp;
            return [...xx, (i - 1) * 4 + j];
        } else if (xx == k) {
            let temp = grid[i][j];
            grid[i][j] = grid[i][j - 1];
            grid[i][j - 1] = temp;
            return [...xx, (i) * 4 + j - 1];
        }

    }

}
export const getSolution = (grid) => {
    let visited = {};
    let ii = 0;
    let jj = 0
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] == 16) {
                ii = i;
                jj = j;
                break
            }

        }
    }
    bfs(grid, ii, jj, visited);
}