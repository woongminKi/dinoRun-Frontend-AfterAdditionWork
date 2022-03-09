class Bird {
  constructor(ctx, image) {
    this.x = 1000;
    this.y = 150;
    this.width = 50;
    this.height = 35;
    this.ctx = ctx;
    this.image = image;
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

export default Bird;
