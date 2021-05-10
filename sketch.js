var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var lives 

function preload(){
  
  
  monkey_running =                  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkeyImage = loadAnimation ("sprite_0.png")
  jungleImage = loadImage ("jungle.png")
  GameOverImage = loadImage ("GameOver.png")
}



function setup() {
  background = createSprite (300,300,0,0)
  background.addImage("jungle",jungleImage)
  background.scale = 0.7
  
  text("Score: "+ score, 500,550);
  text("lives:"+lives,50,550)
  
  monkey = createSprite (30,300,20,10)
  monkey.addAnimation ("monkey",monkey_running)
  monkey.scale = 0.101
  
  obstacle = createSprite (350,410,20,10)
  obstacle.addImage ("obstacles",obstacleImage)
  obstacle.scale = 0.1

  path = createSprite (200,440,800,10)
  path.visible = false
  
  banana = createSprite (350,320,20,10)
  banana.addImage (bananaImage)
  
  // monkey.debug = true
  // obstacle.debug = true
  // banana.debug = true
  
  score = 0
  lives = 3
  
  obstacle.setCollider("rectangle",0,0,400,400);
  
  MonkeyGroup = createGroup()
  MonkeyGroup.add (monkey)
  
  BananaGroup = createGroup()
  BananaGroup.add (banana)
 
  ObstacleGroup = createGroup()
  ObstacleGroup.add (obstacle)
  

}


function draw() {
  createCanvas (600,600)
  text("Score: "+ score, 500,550);
  text("lives:"+lives,50,550)
  
  if(frameCount % 150===0 &&(obstacle.x < 0)){
    obstacle.x = 650
  }
  
  if(frameCount % 120===0 && (banana.x < 0)){
     banana.x = 600
     banana.visible = true
  }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
  if(monkey.isTouching(path)){
     monkey.velocityY= 0
  }
  
  banana.scale =  0.07
  
  if(keyDown ("space") && (monkey.y >= 360)){
     jump()
  }
  
  obstacle.velocityX = -5
  banana.velocityX = -5
  monkey.depth = banana.depth
  monkey.depth = monkey.depth + 1
  
  if(banana.isTouching(monkey)){
    score= score+1
    banana.x = 600
  }
  
  if(obstacle.isTouching(monkey)){
    monkey.scale = 0.095
    lives = lives - 1
    obstacle.x = 900
  }
  
  if(obstacle.isTouching(monkey)&& (lives === 2)){
    monkey.scale = 0.08
    lives = lives - 1
    obstacle.x = 100
  }
  
  if(obstacle.isTouching(monkey)&& (lives === 1)){
    monkey.scale = 0.08
    lives = lives - 1
    obstacle.x = 900
  }
  
  if(lives===0){
    text("Game Over",300,175)
    GameOver()
  }
  
  if(score > 1){ 
    monkey.scale = 0.108
  }
  
  monkey.depth = obstacle.depth
  monkey.depth = monkey.depth + 1
  
  drawSprites()
  
  stroke("white")
  fill("white")
  text("Score: "+ score, 500,100);
  text("lives:"+lives,50,100)
}

function jump(){
  monkey.velocityY = -12
} 

function GameOver(){
  Gameover = createSprite (300,250,30,30)
  Gameover.addImage (GameOverImage)
  
  MonkeyGroup.destroyEach()
  BananaGroup.destroyEach()
  ObstacleGroup.destroyEach()
}

