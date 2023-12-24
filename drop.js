class Drop {
  
  constructor(zoom) {
    this.z = zoom;
    
    this.reset();
  }
  
  reset() {
    this.x = random(width);
    this.y = random(-500, -50);
    this.len = map(this.z, 0, 1, 8, 20);
    this.yspeed = map(this.z, 0, 1, 3, 7);
    this.xspeed = 0;
    
    this.alpha = map(this.z, 0, 1, 100, 255);
  }
  

  fall(speedBoost, wind) {
    this.xspeed = this.len * Math.sin(wind / 180 * Math.PI);
    
    this.y = this.y + this.yspeed + speedBoost;
    this.x = this.x + this.xspeed;
    // let grav = map(this.z, 0, 1, 0, 0.2);
    // this.yspeed = this.yspeed + grav;

    if (this.x < 0) {
      this.x = width + this.xspeed;
    } else if (this.x > width) {
      this.x = -this.xspeed;
    }

    if (this.y > height) {
      this.reset();
    }
  }

  show() {
    var thick = map(this.z, 0, 1, 1, 4);
    strokeWeight(thick);
    stroke(138, 43, 226, this.alpha);
    line(this.x, this.y, this.x + this.xspeed, this.y + this.len);
  }
}