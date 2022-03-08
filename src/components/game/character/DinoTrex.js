import { dinoCharacterImage } from "../gameImages/CharaterImages";
import Cactus from "./Cactus";

const STATUS = Object.freeze({
  START: "START",
  JUMP: "JUMP",
  DUCK_1: "DUCK_1",
  DUCK_2: "DUCK_2",
  CRASH: "CRASH",
});

class DinoTrex {
  requestAnimation;
  cactus = new Cactus();

  config = {
    STATUS: {
      START: { img: dinoCharacterImage },
    },
  };

  constructor(ctx, image) {
    this.x = 10;
    this.y = 200;
    this.width = 50;
    this.height = 50;
    this.ctx = ctx;
    this.image = image;
    this.jumpTime = 0;
    this.jumpState = false;

    this.status = STATUS.START;
  }

  jump() {
    let animationFrameId = null;
    this.ctx.clearRect(0, 0, this.width, this.height);
    animationFrameId = requestAnimationFrame(() => this.jump());

    if (this.jumpState) {
      this.y -= 3;
      this.jumpTime += 1;
    }

    if (!this.jumpState) {
      if (this.y < 200) {
        this.y += 3;
      }
    }

    if (this.jumpTime > 50) {
      this.jumpState = false;
      this.jumpTime = 0;
    }

    if (this.y === 200) {
      cancelAnimationFrame(animationFrameId);
    }
    return { animationFrameId };
  }

  collisionCheck(obstacleItem) {
    const differenceX = obstacleItem.x - (this.x + this.width);
    const differenceY = obstacleItem.y - (this.y + this.height);

    return { differenceX, differenceY };
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

export default DinoTrex;
