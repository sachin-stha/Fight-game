import Sword from "./sword.js";

export default class Player {
  constructor(width, height, position, color, canvas) {
    this.width = width;
    this.height = height;
    this.position = position;
    this.color = color;
    this.canvas = canvas;

    this.velocity = { x: 0, y: 0 };
    this.gravity = 0.8;

    this.sword = new Sword(8, 90, { x: position.x, y: position.y }, "blue");
    this.swordAngle = 10;
    this.veloOfAngle = 0;
    this.swordInertia = -15;
    this.maxAngle = 180;
    this.minAngle = 10;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.position.x, this.position.y, this.width, this.height);
    ctx.fill();

    this.sword.draw(ctx);
    this.sword.position = this.position;
  }

  movement() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height >= this.canvas.height) {
      this.velocity.y = 0;
      this.position.y = this.canvas.height - this.height;
    } else this.velocity.y += this.gravity;

    this.swordMovement();
  }

  swordMovement() {
    if (this.swordAngle >= this.maxAngle) {
      this.swordAngle = 175;
    }

    if (this.swordAngle < this.maxAngle) {
      this.swordAngle += this.veloOfAngle;
    }

    if (this.swordAngle <= this.minAngle) {
      this.swordAngle = this.minAngle;
      this.veloOfAngle = 0;
    } else if (this.swordAngle > this.minAngle) {
      this.veloOfAngle += this.swordInertia;
    }

    this.sword.angle = this.swordAngle;
  }
}
