import Sprite from "./components/sprite.js";

const c = document.querySelector("#myCanvas");
const ctx = c.getContext("2d");

c.width = 1000;
c.height = 400;

let gameState = true;

let player = new Sprite(
  30,
  120,
  { x: c.width - 230, y: c.height - 120 },
  "red",
  "left",
  c
); // player object

let player2 = new Sprite(
  30,
  120,
  { x: 200, y: c.height - 120 },
  "blue",
  "right",
  c
); // player 2 object

let playerMovement = {
  right: false,
  left: false,
  jump: false,
  sword: false,
  keyVal: 0,
}; // player key movements

let player2Movement = {
  right: false,
  left: false,
  jump: false,
  sword: false,
  keyVal: 0,
}; // // player 2 key movements

let ptime = 0;
function gameLoop(ctime) {
  gameState ? requestAnimationFrame(gameLoop) : "";
  if (ctime - ptime < 1) return;
  ptime = ctime;

  ctx.clearRect(0, 0, c.width, c.height);

  // player
  playerMovementFunc(playerMovement, player, playerMovement.keyVal, [37, 39]);
  spriteWallCollision(player, playerMovement.keyVal, [37, 39]);
  player.draw(ctx);
  player.movement();

  // player 2
  playerMovementFunc(
    player2Movement,
    player2,
    player2Movement.keyVal,
    [65, 68]
  );
  spriteWallCollision(player2, player2Movement.keyVal, [65, 68]);
  player2.draw(ctx);
  player2.movement();

  [player2, player].forEach((e, i, arr) => {
    if (e.health <= 0) {
      gameState = false;
      alert(arr[i].color + " player looses!!! <br> Refresh page to play again");
    }

    // for facing towards each other in any positions
    if (arr[0].position.x < arr[1].position.x) {
      arr[0].face_dir = "right";
      arr[1].face_dir = "left";
    } else {
      arr[0].face_dir = "left";
      arr[1].face_dir = "right";
    }

    function playerAttackHealthDecrease(elemArr) {
      // changes the condition of attack, in respect to the side player is standing
      if (
        arr[0].position.y + arr[0].height >= arr[1].position.y &&
        arr[0].position.y + arr[0].height <= arr[1].position.y + arr[1].height
      ) {
        if (elemArr[0].swordAngle > 40 && elemArr[0].swordAngle < 110) {
          if (
            elemArr[0].sword.position.x +
              Math.sin((elemArr[0].swordAngle * Math.PI) / 180) *
                elemArr[0].sword.height >
            elemArr[1].position.x
          ) {
            elemArr[1].health > 0 ? (elemArr[1].health -= 1) : "";
          }
        }

        if (elemArr[1].swordAngle > 40 && elemArr[1].swordAngle < 110) {
          if (
            elemArr[1].sword.position.x -
              Math.sin((elemArr[1].swordAngle * Math.PI) / 180) *
                elemArr[1].sword.height <
            elemArr[0].position.x + arr[0].width
          ) {
            elemArr[0].health > 0 ? (elemArr[0].health -= 1) : "";
          }
        }
      }
    }

    arr[0].face_dir == "right"
      ? playerAttackHealthDecrease([arr[0], arr[1]])
      : playerAttackHealthDecrease([arr[1], arr[0]]);
  });
}
gameLoop();

function playerMovementFunc(spriteMovement, spriteElem, keyVal, keyNumArr) {
  spriteMovement.jump && spriteElem.position.y + spriteElem.height >= c.height // only for jump movement, independent of x axis movements
    ? (spriteElem.velocity.y = -20)
    : "";

  if (spriteMovement.sword) {
    spriteElem.veloOfAngle = 20; // make velocity if rotation of sword to 20
  }

  // left and right movement are interconnect with each other
  if (spriteMovement.left && keyVal == keyNumArr[0]) {
    spriteElem.velocity.x = -10;
  } else if (spriteMovement.right && keyVal == keyNumArr[1]) {
    spriteElem.velocity.x = 10;
  }

  // player velocity turns 0 only if both x-axis movement is false
  if (!(spriteMovement.left || spriteMovement.right)) {
    spriteElem.velocity.x = 0;
  }
}

function spriteWallCollision(spriteElem, keyVal, keyNumArr) {
  if (spriteElem.position.x < 0 && keyVal == keyNumArr[0]) {
    spriteElem.velocity.x = 0;
    spriteElem.position.x = 0; // sets position to 0
  } else if (
    spriteElem.position.x + spriteElem.width > c.width &&
    keyVal == keyNumArr[1]
  ) {
    spriteElem.velocity.x = 0;
    spriteElem.position.x = c.width - spriteElem.width; // sets position to c.width - spriteElem.width
  }
}

document.addEventListener("keydown", function (e) {
  switch (e.which) {
    // player keys
    case 38:
      playerMovement.jump = true;
      break;

    case 37:
      playerMovement.left = true;
      playerMovement.keyVal = e.which;
      break;

    case 39:
      playerMovement.right = true;
      playerMovement.keyVal = e.which;
      break;

    case 16:
      gameState ? (playerMovement.sword = true) : "";
      break;

    // player 2 keys
    case 87:
      player2Movement.jump = true;
      break;

    case 65:
      player2Movement.left = true;
      player2Movement.keyVal = e.which;
      break;

    case 68:
      player2Movement.right = true;
      player2Movement.keyVal = e.which;
      break;

    case 32:
      gameState ? (player2Movement.sword = true) : "";
      break;
  }
});

document.addEventListener("keyup", function (e) {
  switch (e.which) {
    // player keys
    case 38:
      playerMovement.jump = false;
      break;

    case 37:
      playerMovement.left = false;
      break;

    case 39:
      playerMovement.right = false;
      break;

    case 16:
      playerMovement.sword = false;
      break;

    // player 2 keys
    case 87:
      player2Movement.jump = false;
      break;

    case 65:
      player2Movement.left = false;
      break;

    case 68:
      player2Movement.right = false;
      break;

    case 32:
      player2Movement.sword = false;
      break;
  }
});
