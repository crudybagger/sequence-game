import { neighboours } from './tile';
export let solution = [];
export let fans=[]
let dirs = [[1,4],[0,2,5],[1,3,6],[2,7],[0,5,8],[1,4,6,9],[2,5,7,10],[3,6,11],[4,9,12],[5,8,10,13],[6,9,11,14],[7,10,15],[8,13],[9,12,14],[10,13,15],[11,14]];


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
    let s = "";
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if(i===3 && j===3) s+=grid[i][j]
            else s += grid[i][j] + ' ';
        }
    }
    // console.log(s);
    return s;
}
const tostring2 = (arr) => {
    let s = "";
    for (let i = 0; i < arr.length; i++) {
            if(i===arr.length-1) s+=arr[i]
            else s += arr[i] + ' ';
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

export const getFinalSolution = (arr)=>{
    let grid = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    for(let i=0;i<arr.length;i++){
        if(arr[i]!==''){
            grid[parseInt(i/4)][i%4]=parseInt(arr[i])
        }
    }
    // console.log(grid[3][3])
    getSolution(grid);
}


export const getSolution=(board)=>{

        let target = "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 0"
        let start = tostring(board);

        // console.log("target = ",target);
        // console.log("start = ",start)
        
        let visited = new Set();
        let arr=[];
        let ress = []
        ress.push(start);
        
        // all the positions 0 can be swapped to
        


        let queue = new Queue();
        queue.push(start);
        visited.add(start);
        let res = 0;
        while (!queue.isEmpty()) {
            // level count, has to use size control here, otherwise not needed
            let size = queue.size();
            console.log(size)
            for (let i = 0; i < size; i++) {
                let cur = queue.poll();
                // console.log(cur)
                if (cur.toString()===target.toString()) {
                    console.log("the end")
                    // console.log("ans = ",arr);
                    // console.log("min steps = ",res)
                    dfs(arr,0,target,ress);
                    console.log("final answer = ",fans)
                    return res;
                }
                let zero = cur.split(' ').indexOf('0');
                // swap if possible
                // console.log("zeroi = ",zero,"  and arr = ",dirs[zero])
                dirs[zero].forEach(dir=>{
                    // console.log("dir = ",dir)
                    let next = swap(cur, zero, dir);
                    if (!visited.has(next)) {
                        visited.add(next);
                        queue.push(next);
                    }}
                )
                    
            }
            res++;
            // console.log(queue)
            // console.log(queue.toArray());
            arr.push([...queue.toArray()]);
            // console.log(arr)
        }
        return -1;
}


const dfs = (arr, r,target, ress)=>{

    if(r>=arr.length) return;
    let temp = arr[r];

    // console.log(temp)
    for(let i=0;i<temp.length;i++){
        if(i===temp.length-1 && temp[i]!==target) continue;
        // console.log(ress[ress.length-1],temp[i])
        if(isOk(ress[ress.length-1],temp[i])){
            ress.push(temp[i]);
            // console.log("yessss")
            if(ress[ress.length-1]===target){
                for(let j=0;j<ress.length-1;j++) fans.push(chng(ress[j],ress[j+1]));
                 return; 
            }
            dfs(arr,r+1,target,ress);
            ress.pop()
        }
        
    }
}

export const isOk=(a,b)=>{
    let zero = a.split(' ').indexOf('0');
    // console.log(zero)
    let flag = false
    dirs[zero].forEach(dir=>{
        // console.log("dir = ",dir)
        let next = swap(a, zero, dir);
        // console.log(next)
        if (next===b){
            // console.log('first')
            flag=true;
            return;
        }
    })
    return flag;
}


const chng=(a,b)=>{
    let arr = a.split(' ');
    let brr = b.split(' ');
    for(let i=0;i<arr.length;i++){
        let aa = parseInt(arr[i]);
        let bb = parseInt(brr[i]);
        if(aa!==bb) return Math.abs(aa-bb);
    }
    return -1;
}

const swap = (str, i, j) =>{
    let arr = str.split(' ');
    let brr = str.split(' ');
    brr[i]=arr[j]
    brr[j]=arr[i]
    return tostring2(brr);
}


class Queue
{
    // Array is used to implement a Queue
    constructor()
    {
        this.items = [];
    }
                  
    // Functions to be implemented

    push(element)
    {	
        // adding element to the queue
        this.items.push(element);
    }

    poll()
    {
        if(this.isEmpty()) return "Underflow";
        return this.items.shift();
    }

    peek()
    {
        if(this.isEmpty())  return "No elements in Queue";
        return this.items[0];
    }
    
    isEmpty()
    {
        // return true if the queue is empty.
        return this.items.length === 0;
    }

    size()
    {
        return this.items.length
    }

    toArray()
    {
        return this.items
    }

    // printQueue()
}