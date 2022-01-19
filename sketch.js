var score=0;

var bg,bgImg;
var player, shooterImg, shooter_shooting;

var life =3;
var score=0;
var gameState=1

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  bulletImage=loadImage("assets/bullet.png");
  zombieImage=loadImage("assets/zombie.png")
  backBoardImg= loadImage("assets/back.jpg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

 
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  
backBoard= createSprite(displayWidth-1260, displayHeight-300, 100,height);
backBoard.addImage(backBoardImg)


player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
  

   zombieGroup=createGroup();
   bulletGroup=createGroup();

   heading= createElement("h1");
   scoreboard= createElement("h1");

}

function draw() {
  background(0); 
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

if (gameState===1){


  if (frameCount % 100 === 0) {
    spawnZombies();
  }

  if (zombieGroup.collide(backBoard)) {
    handleGameover();
  }
  
  if(zombieGroup.collide(bulletGroup)){
    handleZombieCollision();
  }

if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


if(keyWentDown("space")){
 
  player.addImage(shooter_shooting) ;
   shootBullet();
}

else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

drawSprites();
}
}

function spawnZombies(){
  zombie = createSprite(1500,random(70,650),40,40);
  zombie.addImage(zombieImage);
  zombie.scale = 0.1;
  zombie.velocityX = -8;
  zombie.lifetime = 400;
  zombieGroup.add(zombie);
}
function shootBullet(){
  bullet=createSprite(player.x+7,player.y,5,5)
  bullet.addImage(bulletImage)
  bullet.scale=0.2;  
  bullet.velocityX=9;
 bulletGroup.add(bullet);

}
function handleZombieCollision(){
  if (life > 0) {
     score=score+1;
  }
  bulletGroup.destroyEach()
    zombieGroup.destroyEach()
}
function handleGameover(){
  
  life=life-1;
  zombieGroup.destroyEach();
  

  if (life === 0) {
    gameState=2
    
    swal({
      title: `Game Over`,
      text: "Oops you lost the game....!!!",
      text: "Your Score is " + score,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }

}