var ground;
var groundimg;
var lander;
var moonlander;
var vx = 0;
var vy  = 0;
var g= 0.05;
var fuel = 100;
var thrust,rcs_left,rcs_right;
var timer;
var obstacle_img;
var lz_img;
var crash;
var land;
var obs;
var lz;

function preload() {
 moonlander = loadImage("normal.png");
 groundimg = loadImage("bg.png");
obstacle_img = loadImage("obstacle.png");
lz_img = loadImage("lz.png");

 thrust = loadAnimation("b_thrust_1.png","b_thrust_2.png","b_thrust_3.png");
 thrust.playing = true;
 thrust.looping = false;

rcs_right = loadAnimation("right_thruster_1.png","right_thruster_2.png");
 rcs_right.playing = true;
 rcs_right.looping = false;

 rcs_left = loadAnimation("left_thruster_1.png","left_thruster_2.png");
 rcs_left.playing = true;
 rcs_left.looping = false;

crash = loadAnimation("crash1.png","crash2.png","crash3.png");
crash.playing = true;
crash.looping = false;



land = loadAnimation("landing1.png","landing2.png","landing_3.png");
land.playing = true;
land.looping = false;


}

function setup() {
  canvas = createCanvas(1000,700);
  frameRate(80);
  timer = 1500;
  thrust.frameDelay =5;
  rcs_left.frameDelay =5;
  rcs_right.frameDelay =5;
  crash.frameDelay = 10;
  land.frameDelay = 5;

  lander = createSprite(100,54,30,30);
  lander.addImage(moonlander);
  lander.scale = 0.1;

  lander.addAnimation('thrusting',thrust);
  lander.addAnimation('left',rcs_left);
  lander.addAnimation('right',rcs_right);
  lander.addAnimation('crashing',crash);
  lander.addAnimation('landing',land);

  lander.setCollider("rectangle",0,0,200,200);

  obs = createSprite(320,530,50,100);
  obs.addImage(obstacle_img);
  obs.scale = 0.5;

  ground = createSprite(500,690,1000,20);

  lz = createSprite(880,610,50,30);
  lz.addImage(lz_img);
  lz.scale = 0.3;
  lz.setCollider("rectangle",0,180,400,100);

  rectMode(CENTER);
  textSize(15);

}

function draw() {
  background("black");
  image(groundimg,0,0);
  push();
  fill(255);
  text("vertical velocity"+round(vy),800,75);
  text("horizontal velocity"+round(vx),800,100);
  text("fuel: "+fuel,800,25);
  pop();

  //fall down
  vy += g;
  lander.position.x+=vx;
  lander.position.y+=vy;
  
 //obstacle detection
if(lander.collide(obs)==true) {
  lander.changeAnimation('crashing');
  stop();
}

// landing detection
var d = dist(lander.position.x,lander.position.y,lz.position.x,lz.position.y);
console.log(d);

if(d<=35 && (vy<2 && vy>-2) && (vx<2 && vx>-2)) {
  console.log("landed");
vx = 0;
vy = 0;
g = 0;
lander.changeAnimation('landing');
}

if(lander.collide(ground)==true) {
  console.log("collided");
  lander.changeAnimation("crashing");
  vx = 0;
  vy = 0;
  g = 0;
} 

  drawSprites();
}

function keyPressed() {
  if(keyCode == UP_ARROW && fuel>0) {
    upward_thrust();
    lander.changeAnimation("thrusting");
    thrust.nextFrame();
  }
  if(keyCode == RIGHT_ARROW && fuel>0) {
    right_thrust();
    lander.changeAnimation("right");
  }
  if(keyCode == LEFT_ARROW && fuel>0) {
   left_thrust();
   lander.changeAnimation("left");
  }
}

function upward_thrust() {
  vy = -1;
  fuel -=1;
}

function right_thrust() {
  vx +=0.2;
  fuel -=1;
}

function left_thrust() {
  vx -=0.2;
  fuel -=1;
}

function stop() {
vx = 0;
vy = 0;
fuel = 0;
g = 0;  
}