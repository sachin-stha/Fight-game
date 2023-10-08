export default class Player {
  constructor(width, height, position, color, canvas) {
    this.width = width;
    this.height = height;
    this.position = position;
    this.color = color;
    this.canvas = canvas;

    this.velocity = { x: 0, y: 0 };
    this.gravity = 0.8;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.position.x, this.position.y, this.width, this.height);
    ctx.fill();

    this.movement();
  }

  movement() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height >= this.canvas.height) {
      this.velocity.y = 0;
      this.position.y = this.canvas.height - this.height;
    } else this.velocity.y += this.gravity;
  }
}
