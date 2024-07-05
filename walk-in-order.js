/*
@title: Walk In Order
@author: prwrit_
@tags: []
@addedOn: 2024-07-03
*/

const player = "p";
const wall = "w";
const redblock = "r";
const orangeblock = "o";
const yellowblock = "y";
const greenblock = "g";
const blueblock = "b";
const purpleblock = "c";
const pinkblock = "d";
const brownblock = "e";
const checkmark = "x";
let ordercount = 0;
let prevX, prevY;
let shouldpunish = 0;

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
  [ blueblock,  bitmap`
0000000000000000
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0000000000000000` ],
  [ purpleblock,  bitmap`
0000000000000000
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0000000000000000` ],
  [ pinkblock,  bitmap`
0000000000000000
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0000000000000000` ],
  [ brownblock,  bitmap`
0000000000000000
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0000000000000000` ],
  [ checkmark, bitmap`
0000000000000000
00.............0
0.0............0
0..0...........0
0...0..........0
0....0.........0
0.....0........0
0......0.......0
0.......0......0
0........0.....0
0.........0....0
0..........0...0
0...........0..0
0............0.0
0.............00
0000000000000000` ],
)

let level = 0
const levels = [
  map`
......royg
wwwwwwwwww
wwgwwwwwww
ww......ww
wwwwwwwyww
wwo.....ww
ww.wwwwwww
wwr....pww
wwwwwwwwww
wwwwwwwwww`, //level 0
  map`
......royg
wwwwwwwwww
wwwwwwwwww
www....o.w
www.wwww.w
ww..y.r..w
ww.ww.wwww
ww.gwpwwww
wwwwwwwwww
wwwwwwwwww`,
  map`
......royg
wwwwwwwwww
wwp......w
wwwwwgww.w
wwo......w
wwwwwwww.w
wwy......w
wwwwwwwwrw
wwwwwwwwww
wwwwwwwwww`,
  map`
.......royg
wwwwwwwwwww
ww.wwpw...w
wwowwrw.w.w
ww......w.w
wwwwwwwww.w
www...w...w
wwwyw.w.w.w
ww..w...wgw
wwwwwwwwwww
wwwwwwwwwww`,
  map`
......royg
wwwwwwwwww
wp..w....w
w.w.w.ww.w
wwwrw.ww.w
w...y..wgw
w.wwww...w
w...ww.w.w
www....wow
wwwwwwwwww`,
  map`
.....roygb
wwwwwwwwww
wp..w....w
w.w.w.ww.w
wwwrwbww.w
w...y..wgw
w.wwww...w
w...ww.w.w
www....wow
wwwwwwwwww`, //level 5 - +blue
  map`
......roygb
wwwwwwwwwww
w.o.w...w.w
wpw...wyw.w
w.r.w...w.w
ww.www.wwww
w...w...w.w
wbw.g.w.w.w
w...w...w.w
wwwwwwwwwww
wwwwwwwwwww`,
  map`
......roygb
wwwwwwwwwww
wo.w..w..ww
ww..wb.wy.w
www..w..w.w
wrww..w.g.w
w..ww..ww.w
ww..ww....w
www...www.w
wwwww....pw
wwwwwwwwwww`,
  map`
......roygb
wwwwwwwwwww
w.w.....wyw
w.wow.w.w.w
w...w.w...w
w.www.www.w
w.www.www.w
wbw.....wrw
w.wgw.w.w.w
w...w.w..pw
wwwwwwwwwww`,
  map`
.p....roygb
wwwwwwwwwww
wwwwwwwwwww
ww.......ww
ww.w...w.ww
ww.w...w.ww
ww.......ww
ww.wwwww.ww
ww.......ww
wwwwwwwwwww
wwwwwwwwwww`,
  map`
......roygb
wwwwwwwwwww
wwwwwwwwwww
ww.r.....ww
ww.w.p.w.ww
ww.w.g.wbww
ww.o.....ww
ww.wwwwwyww
ww.......ww
wwwwwwwwwww
wwwwwwwwwww`,
  map`
.....roygbc
wwwwwwwwwww
wwwwwwwwwww
ww.r.c...ww
ww.w.p.w.ww
ww.w.g.wbww
ww.o.....ww
ww.wwwwwyww
ww.......ww
wwwwwwwwwww
wwwwwwwwwww`, //level 11 - +purple
  map`
.....roygbc
wwwwwwwwwww
w.........w
w.w.w.w.w.w
wow.w.w.w.w
w.w.w.w.w.w
w.wywbwgwcw
wrw.w.w.w.w
w.w.w.w.www
w....p....w
wwwwwwwwwww`,
  map`
.....roygbc
wwwwwwwwwww
w.........w
w.w.w.w.w.w
wow.w.w.w.w
w.w.w.w.w.w
w.wywgwbw.w
wrw.w.w.w.w
w.w.w.w.www
w....pc...w
wwwwwwwwwww`,
  map`
.....roygbc
wwwwwwwwwww
wb.......cw
wwwwwgwwwww
wg.......bw
wwwwwywwwww
wo.......gw
wwwwwrwwwww
wy.......ow
wwwwwpwwwww
wwwwwwwwwww`,
  map`
.....roygbc
wwwwwwwwwww
wp.r..o...w
w.wwwwwww.w
wrw.....wyw
w...www.w.w
w.wowgw.wgw
wyw.....w.w
w.w.wwwwwcw
w.b...b...w
wwwwwwwwwww`,
  map`
....roygbcd
wwwwwwwwwww
w......c..w
wpwwrw.ww.w
www..d..w.w
w.w.wwwbw.w
w.o.www...w
w.w...g.w.w
w.wwywwww.w
w.....w...w
wwwwwwwwwww`, //level 16 - +pink
  map`
....roygbcd
wwwwwwwwwww
w.b.g.o.y.w
wbwcwywbwdw
w.b.o.r.c.w
wgwywrwgwcw
w.o.rpo.b.w
wgwgwrwgwrw
w.c.c.o.y.w
wdwgwcwcwdw
wwwwwwwwwww`,
  map`
....roygbcd
wwwwwwwwwww
wwwwwwwwwww
w..c...g..w
wdwwwwwwwyw
w..d...ro.w
wwwwwpwwwww
w..r...c..w
wowwwwwww.w
w..y..g..bw
wwwwwwwwwww`,
  map`
....roygbcd
wwwwwwwwwww
w.pw..y...w
w.wwowwww.w
w.r.....w.w
wwwwwww.b.w
w....gwowdw
w.w.www.w.w
w.w.w...wcw
wyw...w.b.w
wwwwwwwwwww`,
  map`
....roygbcd
wwwwwwwwwww
wwwwwwwwwpw
w.........w
wrwwowwrwww
w....c....w
wwwywwgwwbw
w.........w
wdwwcwwywww
w....c....w
wwwwwwwwwww`,
  map`
...roygbcde
wwwwwwwwwww
w....p....w
w.wwwwwrw.w
wyw.....wcw
w.wowwwww.w
w....b....w
w.wwwwwww.w
w.w.e..d..w
wgw.wwwww.w
wwwwwwwwwww`, //level 21 - +brown
  map`
...roygbcde
wwwwwwwwwww
wp........w
wwwwwrwwwew
w......d..w
wowww.wwwww
w..y...g..w
wwwwwcwwwbw
w..e......w
wwwwwwwwwww
wwwwwwwwwww`,
  map`
...roygbcde
wwwwwwwwwww
wp........w
weg.y.b.rew
wg.od..o..w
w...g....bw
w.c...o.r.w
w.o.rb..c.w
wb........w
we.c.ogc.cw
wwwwwwwwwww`,
]

setMap(levels[level]);
setSolids([player, wall]);

// player movement controls WASD
onInput("w", () => {
    // get previous position before moving
  prevX = getFirst(player).x;
  prevY = getFirst(player).y;

  //attempt movement
  getFirst(player).y -= 1;

  // check position after movement
  if (getFirst(player).x === prevX && getFirst(player).y === prevY) {
    // if haven't moved, reset the position
    getFirst(player).x = prevX;
    getFirst(player).y = prevY;
    shouldpunish = 0;
  } else {
    // update previous position if player has moved
    prevX = getFirst(player).x;
    prevY = getFirst(player).y;
    shouldpunish = 1;
  }
});

onInput("a", () => {
    // get previous position before moving
  prevX = getFirst(player).x;
  prevY = getFirst(player).y;

  //attempt movement
  getFirst(player).x -= 1;

  // check position after movement
  if (getFirst(player).x === prevX && getFirst(player).y === prevY) {
    // if haven't moved, reset the position
    getFirst(player).x = prevX;
    getFirst(player).y = prevY;
    shouldpunish = 0;
  } else {
    // update previous position if player has moved
    prevX = getFirst(player).x;
    prevY = getFirst(player).y;
    shouldpunish = 1;
  }
});

onInput("s", () => {
  // get previous position before moving
  prevX = getFirst(player).x;
  prevY = getFirst(player).y;

  //attempt movement
  getFirst(player).y += 1;

  // check position after movement
  if (getFirst(player).x === prevX && getFirst(player).y === prevY) {
    // if haven't moved, reset the position
    getFirst(player).x = prevX;
    getFirst(player).y = prevY;
    shouldpunish = 0;
  } else {
    // update previous position if player has moved
    prevX = getFirst(player).x;
    prevY = getFirst(player).y;
    shouldpunish = 1;
  }
});

onInput("d", () => {
// get previous position before moving
  prevX = getFirst(player).x;
  prevY = getFirst(player).y;

  //attempt movement
  getFirst(player).x += 1;

  // check position after movement
  if (getFirst(player).x === prevX && getFirst(player).y === prevY) {
    // if haven't moved, reset the position
    getFirst(player).x = prevX;
    getFirst(player).y = prevY;
    shouldpunish = 0;
  } else {
    // update previous position if player has moved
    prevX = getFirst(player).x;
    prevY = getFirst(player).y;
    shouldpunish = 1;
  }
});

// reset level if stuck
onInput("j", () => {
  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

//check every after input
afterInput(() => {
  const playerSprite = getFirst(player);
  const redBlockTiles = tilesWith(redblock);
  const orangeBlockTiles = tilesWith(orangeblock);
  const yellowBlockTiles = tilesWith(yellowblock);
  const greenBlockTiles = tilesWith(greenblock);
  const blueBlockTiles = tilesWith(blueblock);
  const purpleBlockTiles = tilesWith(purpleblock);
  const pinkBlockTiles = tilesWith(pinkblock);
  const brownBlockTiles = tilesWith(brownblock);
  const currentLevel = levels[level];
  let advancedness = 3;

  // Check if the player is on a red block
  redBlockTiles.forEach(tile => {
    if (tile.some(sprite => sprite.type === player)) {
      if (ordercount !== 0 && shouldpunish === 1) {
        // Reset the player to the start position
        setMap(currentLevel);
        ordercount = 0;
      } else {
        if (shouldpunish !== 0) {
          ordercount++;
          console.log("Order Count:", ordercount);
        }
      }
    }
  });

  //check if on orange block
  orangeBlockTiles.forEach(tile => {
    if (tile.some(sprite => sprite.type === player)) {
      if (ordercount !== 1 && shouldpunish === 1) {
        // Reset the player to the start position
        setMap(currentLevel);
        ordercount = 0;
      } else {
        if (shouldpunish !== 0) {
          ordercount++;
          console.log("Order Count:", ordercount);
        }
      }
    }
  });

  //check if on yellow block
  yellowBlockTiles.forEach(tile => {
    if (tile.some(sprite => sprite.type === player)) {
      if (ordercount !== 2 && shouldpunish === 1) {
        // Reset the player to the start position
        setMap(currentLevel);
        ordercount = 0;
      } else {
        if (shouldpunish !== 0) {
          ordercount++;
          console.log("Order Count:", ordercount);
        }
      }
    }
  });

  //check if on green block
  greenBlockTiles.forEach(tile => {
    if (tile.some(sprite => sprite.type === player)) {
      if (ordercount !== 3 && shouldpunish === 1) {
        // Reset the player to the start position
        setMap(currentLevel);
        ordercount = 0;
      } else {
        if (shouldpunish !== 0) {
          ordercount++;
          console.log("Order Count:", ordercount);
          
          // check if this level introduces blue blocks yet?
          if (tilesWith(blueblock).length == 0) {
            if ((level+1) < levels.length) {
              level++;
              setMap(levels[level]); // Set the map to the next level if no blue blocks
              clearText(); 
              ordercount = 0;
              console.log("Moved to the next level.");
            } else {
              console.log("No more levels available."); //if no more levels left
            }
          }
        }
      }
    }
  });

  //check if on blue block
  blueBlockTiles.forEach(tile => {
    if (tile.some(sprite => sprite.type === player)) {
      if (ordercount !== 4 && shouldpunish === 1) {
        // Reset the player to the start position
        setMap(currentLevel);
        ordercount = 0;
      } else {
        if (shouldpunish !== 0) {
          ordercount++;
          console.log("Order Count:", ordercount);
          
          // check if this level introduces purple blocks yet?
          if (tilesWith(purpleblock).length == 0) {
            if ((level+1) < levels.length) {
              level++;
              setMap(levels[level]); // Set the map to the next level if no purple blocks
              clearText(); 
              ordercount = 0;
              console.log("Moved to the next level.");
            } else {
              console.log("No more levels available."); //if no more levels left
            }
          }
        }
      }
    }
  });

  //check if on purple block
  purpleBlockTiles.forEach(tile => {
    if (tile.some(sprite => sprite.type === player)) {
      if (ordercount !== 5 && shouldpunish === 1) {
        // Reset the player to the start position
        setMap(currentLevel);
        ordercount = 0;
      } else {
        if (shouldpunish !== 0) {
          ordercount++;
          console.log("Order Count:", ordercount);
          
          // check if this level introduces pink blocks yet?
          if (tilesWith(pinkblock).length == 0) {
            if ((level+1) < levels.length) {
              level++;
              setMap(levels[level]); // Set the map to the next level if no pink blocks
              clearText(); 
              ordercount = 0;
              console.log("Moved to the next level.");
            } else {
              console.log("No more levels available."); //if no more levels left
            }
          }
        }
      }
    }
  });

  pinkBlockTiles.forEach(tile => {
    if (tile.some(sprite => sprite.type === player)) {
      if (ordercount !== 6 && shouldpunish === 1) {
        // Reset the player to the start position
        setMap(currentLevel);
        ordercount = 0;
      } else {
        if (shouldpunish !== 0) {
          ordercount++;
          console.log("Order Count:", ordercount);
          
          // check if this level introduces brown blocks yet?
          if (tilesWith(brownblock).length == 0) {
            if ((level+1) < levels.length) {
              level++;
              setMap(levels[level]); // Set the map to the next level if no brown blocks
              clearText(); 
              ordercount = 0;
              console.log("Moved to the next level.");
            } else {
              console.log("No more levels available."); //if no more levels left
            }
          }
        }
      }
    }
  });

  brownBlockTiles.forEach(tile => {
    if (tile.some(sprite => sprite.type === player)) {
      if (ordercount !== 7 && shouldpunish === 1) {
        // Reset the player to the start position
        setMap(currentLevel);
        ordercount = 0;
      } else {
        if (shouldpunish !== 0) {
          ordercount++;
          console.log("Order Count:", ordercount);
          
            if ((level+1) < levels.length) {
              level++;
              setMap(levels[level]);
              clearText(); 
              ordercount = 0;
              console.log("Moved to the next level.");
            } else {
              console.log("No more levels available."); //if no more levels left
            }
          
        }
      }
    }
  });

  // display order count text on screen
  addText(`Level: ${level}`, { x: 2, y: 2, color: color`2` });

  // these are mostly for debugging purposes, to see the variables.
  // addText(`punish: ${shouldpunish} count: ${ordercount}`, { x: 2, y: 14, color: color`2` });

  // gradually add advancedness number after more colors introduced
  if (level === 5) {
    if (advancedness === 3) {
      (advancedness = advancedness + 1);
    }
  }
  
  if (level === 11) {
    if (advancedness === 4) {
      (advancedness = advancedness + 1);
    }
  }

  prevX = getFirst(player).x;
  prevY = getFirst(player).y;

});