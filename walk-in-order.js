/*
@title: Walk In Order
@author: prwrit_
@tags: []
@addedOn: 2024-07-03
*/

const player = "p"
const wall = "w"
const redblock = "r"
const orangeblock = "o"
const yellowblock = "y"
const greenblock = "g"
const blueblock = "b"
const purpleblock = "pp"
const pinkblock = "pb"
let ordercount = 0

setLegend(
  [ player, bitmap`
................
................
.....000000.....
...000....000...
...0........0...
..00........00..
..0..0....0..0..
..0..0....0..0..
..0..........0..
..0..........0..
..00.000000.00..
...0........0...
...000....000...
.....000000.....
................
................` ],
  [ wall,  bitmap`
0000000000000000
0LLLL00LLLLLLL00
0LLL0LLLLLLLL000
0LL00LLLLLLL00L0
000LLLLLLLL00LL0
00LLLLLLL000LLL0
0LLLLLLL00LLLLL0
0LLLLLL00LLLLLL0
0LLLLL00LLLLLLL0
0LLLLL0LLLLLLLL0
0LLLL0LLLLLLL000
0LLL0LLLLLLL00L0
0LL0LLLLLLL00LL0
000LLLLLLL00LLL0
00LLLLLLL00LLLL0
0000000000000000` ],
  [ redblock,  bitmap`
0000000000000000
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0000000000000000` ],
  [ orangeblock,  bitmap`
0000000000000000
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0000000000000000` ],
  [ yellowblock,  bitmap`
0000000000000000
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0000000000000000` ],
  [ greenblock,  bitmap`
0000000000000000
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0000000000000000` ],
)

let level = 0
const levels = [
  map`
.....royg
wwwwwwwww
wgwwwwwww
w......ww
wwwwwwyww
wo.....ww
w.wwwwwww
wr....pww
wwwwwwwww`,
  map`
.....royg
wwwwwwwww
wwwwwwwww
ww....o.w
ww.wwww.w
w..y.r..w
w.ww.wwww
w.gwpwwww
wwwwwwwww`
]

setMap(levels[level])
setSolids([player, wall]);

// player movement controls WASD
onInput("w", () => {
    getFirst(player).y -= 1;
});

onInput("a", () => {
    getFirst(player).x -= 1;
});

onInput("s", () => {
    getFirst(player).y += 1;
});

onInput("d", () => {
    getFirst(player).x += 1;
});

// reset level if stuck
onInput("j", () => {
  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

addText(`Order Count: ${ordercount}`, { x: 2, y: 2, color: color`2` });

//check every after input
afterInput(() => {
  const playerSprite = getFirst(player);
  const redBlockTiles = tilesWith(redblock);
  const orangeBlockTiles = tilesWith(orangeblock);
  const yellowBlockTiles = tilesWith(yellowblock);
  const greenBlockTiles = tilesWith(greenblock);
  const currentLevel = levels[level];

  // Check if the player is on a red block
  redBlockTiles.forEach(tile => {
    if (tile.some(sprite => sprite.type === player)) {
      if (ordercount !== 0) {
        // Reset the player to the start position
        setMap(currentLevel);
        ordercount = 0;
      } else {
        ordercount++;
        console.log("Order Count:", ordercount);
      }
    }
  });

  //check if on orange block
  orangeBlockTiles.forEach(tile => {
    if (tile.some(sprite => sprite.type === player)) {
      if (ordercount !== 1) {
        // Reset the player to the start position
        setMap(currentLevel);
        ordercount = 0;
      } else {
        ordercount++;
        console.log("Order Count:", ordercount);
      }
    }
  });

  //check if on yellow block
  yellowBlockTiles.forEach(tile => {
    if (tile.some(sprite => sprite.type === player)) {
      if (ordercount !== 2) {
        // Reset the player to the start position
        setMap(currentLevel);
        ordercount = 0;
      } else {
        ordercount++;
        console.log("Order Count:", ordercount);
      }
    }
  });

  //check if on green block
  greenBlockTiles.forEach(tile => {
    if (tile.some(sprite => sprite.type === player)) {
      if (ordercount !== 3) {
        // Reset the player to the start position
        setMap(currentLevel);
        ordercount = 0;
      } else {
        ordercount++;
        console.log("Order Count:", ordercount);
        if ((level+1) < levels.length) {
          level++;
          setMap(levels[level]); // Set the map to the next level
          clearText(); 
          ordercount = 0;
          console.log("Moved to the next level.");
        } else {
          console.log("No more levels available.");
        }
      }
    }
  });

  // display order count text on screen
  addText(`Order Count: ${ordercount}`, { x: 2, y: 2, color: color`2` });

});