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
