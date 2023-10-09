let x = 0;

export default class Sword {
  constructor(width, height, position, color, face_dir) {
    this.width = width;
    this.height = height;
    this.position = position;
    this.color = color;
    this.face_dir = face_dir;

    this.angle = 0;
  }

  draw(ctx) {
    this.face_dir == "right"
      ? (x = this.position.x + 10)
      : (x = this.position.x + 20);

    ctx.beginPath();
    ctx.lineWidth = this.width;
    ctx.moveTo(x, this.position.y + 20);
    ctx.lineTo(
      x + this.height * Math.sin((this.angle * Math.PI) / 180),
      this.position.y +
        20 +
        this.height * Math.cos((this.angle * Math.PI) / 180)
    );
    ctx.stroke();
  }
}
