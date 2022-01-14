import Tile from './tile';
import { useState } from 'react';
import { gameOver, scrabble, solution } from './game.js';
let sequence = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '',
];
export default function Grid() {
  const [seq, setSeq] = useState(scrabble(sequence));
  //   setSeq(sequence);
  let swap = (f, s) => {
    let newSeq = seq.slice();
    let temp = newSeq[f];
    newSeq[f] = newSeq[s];
    newSeq[s] = temp;
    setSeq(newSeq);
  };

  return (
    <div className="grid">
      <h1>{gameOver(seq) ? 'You Win' : 'Arrange in sequence'}</h1>
      <button
        onClick={() => {
          console.log('Click the buttons in order of :');
          console.log(solution.reverse());
        }}
      >
        click me for solution in console
      </button>
      <div className="grid-row">
        <Tile
          index={1}
          displayIndex={seq[0]}
          changeVal={swap}
          gameState={seq}
        />
        <Tile
          index={2}
          displayIndex={seq[1]}
          changeVal={swap}
          gameState={seq}
        />
        <Tile
          index={3}
          displayIndex={seq[2]}
          changeVal={swap}
          gameState={seq}
        />
        <Tile
          index={4}
          displayIndex={seq[3]}
          changeVal={swap}
          gameState={seq}
        />
      </div>
      <div className="grid-row">
        <Tile
          index={5}
          displayIndex={seq[4]}
          changeVal={swap}
          gameState={seq}
        />
        <Tile
          index={6}
          displayIndex={seq[5]}
          changeVal={swap}
          gameState={seq}
        />
        <Tile
          index={7}
          displayIndex={seq[6]}
          changeVal={swap}
          gameState={seq}
        />
        <Tile
          index={8}
          displayIndex={seq[7]}
          changeVal={swap}
          gameState={seq}
        />
      </div>
      <div className="grid-row">
        <Tile
          index={9}
          displayIndex={seq[8]}
          changeVal={swap}
          gameState={seq}
        />
        <Tile
          index={10}
          displayIndex={seq[9]}
          changeVal={swap}
          gameState={seq}
        />
        <Tile
          index={11}
          displayIndex={seq[10]}
          changeVal={swap}
          gameState={seq}
        />
        <Tile
          index={12}
          displayIndex={seq[11]}
          changeVal={swap}
          gameState={seq}
        />
      </div>
      <div className="grid-row">
        <Tile
          index={13}
          displayIndex={seq[12]}
          changeVal={swap}
          gameState={seq}
        />
        <Tile
          index={14}
          displayIndex={seq[13]}
          changeVal={swap}
          gameState={seq}
        />
        <Tile
          index={15}
          displayIndex={seq[14]}
          changeVal={swap}
          gameState={seq}
        />
        <Tile
          index={16}
          displayIndex={seq[15]}
          changeVal={swap}
          gameState={seq}
        />
      </div>
    </div>
  );
}
