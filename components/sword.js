export default class Sword {
  constructor(width, height, position, color) {
    this.width = width;
    this.height = height;
    this.position = position;
    this.color = color;

    this.angle = 10;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.lineWidth = this.width;
    ctx.moveTo(this.position.x + 10, this.position.y + 20);
    ctx.lineTo(
      this.position.x +
        10 +
        this.height * Math.sin((this.angle * Math.PI) / 180),
      this.position.y +
        20 +
        this.height * Math.cos((this.angle * Math.PI) / 180)
    );
    ctx.stroke();
  }
}
