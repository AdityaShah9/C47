var canvas, farm;
var sticks, rocks;
var platform;
var farmer;

var score = 0;

var gameState = "play";

var obstaclesGroup, obstacle1,obstacle2;

function preload() {
  farmImage = loadImage ("sprites/cartoon-factory.png");
  farmerImage = loadImage("sprites/farmer.png");
  platformImage = loadImage("sprites/wood.png");
}

function setup() {
  createCanvas(750,750);

  farm = createSprite(500,500);
  farm.addImage("farm", farmImage);
  farm.scale = 1.5;
  
  farmer = createSprite(200,200,50,50);
  farmer.addImage("farmer",farmerImage);
  farmer.scale = 0.08;

  platformsGroup = new Group();
  invisibleBlockGroup = new Group();

  score = 0;
}

function draw() {
  background("white"); 
  text("Score : " + score, 600,200);
   
  if(gameState === "play"){
    score = score + Math.round(getFrameRate()/60);

    if(keyDown("space")) {
      farmer.velocityY = -10;
    }
    if(keyDown("left_arrow")) {
      farmer.x = farmer.x-3;
    }
    if(keyDown("right_arrow")) {
      farmer.x = farmer.x+3;
    }
    farmer.velocityY = farmer.velocityY + 0.8;
    
    if(farmImage.y>400){
      farmImage.y = 300
    }
    spawnPlatform();

    if(invisibleBlockGroup.isTouching(farmer)){
      farmer.velocityY = 0;
    }

    if(farmer.y>750){
      farmer.destroy();
      gameState = "end";
    }

    drawSprites();
  }
  

  if(gameState === "end"){
    textSize(30);
    text("Game Over , Better Luck Next Time",230,250);
    
  }
}


function spawnPlatform (){
    if (frameCount % 100 === 0) {
       var platform = createSprite(200,100,20,10);
       platform.scale = 0.5;
       var invisibleBlock = createSprite(200,100,20,10);

       invisibleBlock.width = platform.width;
       invisibleBlock.height = 2;

       platform.x = Math.round(random(50,450));
       invisibleBlock.x = platform.x;

       platform.addImage("platform", platformImage);

       platform.velocityY = 4;
       invisibleBlock.velocityY = 4;

       //platform.velocityY = -(6 + 2*score/100);
       //invisibleBlock.velocityY = -(6 + 2*score/100);

       platform.depth = farmer.depth;
       platform.depth = platform.depth + 1;

       platform.lifetime = 600;
       invisibleBlock.lifetime = 600;

       platformsGroup.add(platform);   
       invisibleBlockGroup.add(invisibleBlock);      
    }


}