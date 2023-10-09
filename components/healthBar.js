export default class HealthBar {
  constructor(width, height, position, color, healthPercentage, face_dir) {
    this.width = width;
    this.height = height;
    this.position = position;
    this.color = color;
    this.healthPercentage = healthPercentage;
    this.face_dir = face_dir;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.position.x, this.position.y, this.width, this.height);
    ctx.globalAlpha = 0.2;
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.beginPath();
    ctx.fillStyle = this.color;

    this.face_dir == "right"
      ? ctx.rect(
          this.position.x + this.width * (1 - this.healthPercentage),
          this.position.y,
          this.width * this.healthPercentage,
          this.height
        )
      : ctx.rect(
          this.position.x,
          this.position.y,
          this.width * this.healthPercentage,
          this.height
        );
    ctx.fill();
  }
}
