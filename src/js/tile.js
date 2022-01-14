export const neighboours = (idx) => {
  let ans = [];
  if (idx > 3) ans.push(idx - 4);
  if (idx % 4 !== 0) ans.push(idx - 1);
  if (idx % 4 !== 3) ans.push(idx + 1);
  if (idx < 12) ans.push(idx + 4);

  return ans;
};
export default function Tile(props) {
  return props.displayIndex ? (
    <div
      className="tile"
      // style={{ backgroundColor: !props.displayIndex ? 'white' : 'black' }}
      onClick={() => {
        let seq = props.gameState;
        let intrest = neighboours(props.index - 1);
        let toSwap = props.index - 1;
        intrest.forEach((i) => {
          if (seq[i] === '') toSwap = i;
        });
        // console.log(props.index - 1, toSwap, intrest);
        props.changeVal(props.index - 1, toSwap);
      }}
    >
      {props.displayIndex}
    </div>
  ) : (
    <div className="blank-tile" />
  );
}
