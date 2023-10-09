import Sprite from "./components/sprite.js";

const c = document.querySelector("#myCanvas");
const ctx = c.getContext("2d");

c.width = 1000;
c.height = 500;

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
);

let playerMovement = {
  right: false,
  left: false,
  jump: false,
  sword: false,
  keyVal: 0,
};

let player2Movement = {
  right: false,
  left: false,
  jump: false,
  sword: false,
  keyVal: 0,
};

let ptime = 0;
function gameLoop(ctime) {
  requestAnimationFrame(gameLoop);
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

  // for facing towards each other in any positions
  if (player.position.x < player2.position.x) {
    player.face_dir = "right";
    player2.face_dir = "left";
  } else {
    player2.face_dir = "right";
    player.face_dir = "left";
  }
}
requestAnimationFrame(gameLoop);

function playerMovementFunc(spriteMovement, spriteElem, keyVal, keyNumArr) {
  spriteMovement.jump && spriteElem.position.y + spriteElem.height >= c.height // only for jump movement, independent of x axis movements
    ? (spriteElem.velocity.y = -15)
    : "";

  if (spriteMovement.sword) {
    spriteElem.veloOfAngle = 20; // make velocity if rotation of sword to 20
  }

  // left and right movement are interconnect with each other
  if (spriteMovement.left && keyVal == keyNumArr[0]) {
    spriteElem.velocity.x = -15;
  } else if (spriteMovement.right && keyVal == keyNumArr[1]) {
    spriteElem.velocity.x = 15;
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
      playerMovement.sword = true;
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
      player2Movement.sword = true;
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
