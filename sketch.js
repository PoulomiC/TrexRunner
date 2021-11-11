var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage, obstacleImg1, obstacleImg2, obstacleImg3, obstacleImg4, obstacleImg5, obstacleImg6;

var cloudsGroup, obstaclesGroup;

function preload() {
    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    trex_collided = loadImage("trex_collided.png");
    groundImage = loadImage("ground2.png");
    cloudImage = loadImage("cloud.png");
    obstacleImg1 = loadImage("obstacle1.png");
    obstacleImg2 = loadImage("obstacle2.png");
    obstacleImg3 = loadImage("obstacle3.png");
    obstacleImg4 = loadImage("obstacle4.png");
    obstacleImg5 = loadImage("obstacle5.png");
    obstacleImg6 = loadImage("obstacle6.png");
}

function setup() {
    createCanvas(600, 200);
    
    //create a trex sprite
    trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trex_running);
    trex.addAnimation("collided", trex_collided);
    trex.scale = 0.5;
    
    //create a ground sprite
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -4;

    //create an invisible ground sprite
    invisibleGround = createSprite(200,200,800,20);
    invisibleGround.visible = false;

    //To group similar objects together
    cloudsGroup = createGroup();
    obstaclesGroup = createGroup();    

    //console.log("Quotient " + Math.floor(623/7));

    //Modulo operator returns remainder of a division operation
    //console.log("Remainder " + 623 % 80)
}

function draw() {
    background(255);
    
    //jump when the space button is pressed
    if (keyDown("space") && trex.y>150) {
        trex.velocityY = -10;
    }

    trex.velocityY = trex.velocityY + 0.8
    
    if (ground.x < 0) {
        ground.x = ground.width / 2;
    }

    trex.collide(invisibleGround);

    spawnClouds();
    spawnObstacles();

    if(trex.isTouching(obstaclesGroup)){
        gameState = "over";
    }

    /**
     * 1. stop the ground from moving
     * 2. stop the clouds from moving
     * 3. stop the obstacles from moving
     * 4. stop the trex from marching
     * 5. show Game Over image to user
     * 6. show the Restart icon to user
     */
    if(gameState === "over"){
        ground.velocityX = 0;
        cloudsGroup.setVelocityXEach(0);
        obstaclesGroup.setVelocityXEach(0);
        trex.changeAnimation("collided");
    }

    drawSprites();
}

 /**
     * This method will add different obstacles to the game
     */
  function spawnObstacles(){
    if(frameCount % 80 === 0){
        //creates an obstacle
        var obstacle = createSprite(600, 170, 10, 20);
        var randNum = Math.round(random(1,6));
        console.log("Random Number::: " + randNum)
        switch(randNum){
            case 1: obstacle.addImage(obstacleImg1);
            break;

            case 2: obstacle.addImage(obstacleImg2);
            break;

            case 3: obstacle.addImage(obstacleImg3);
            break;

            case 4: obstacle.addImage(obstacleImg4);
            break;

            case 5: obstacle.addImage(obstacleImg5);
            break;

            case 6: obstacle.addImage(obstacleImg6);
            break;

            default: break;
        }

        obstacle.scale = 0.08;

        //adds velocity to the obstacles to move from right to left
        obstacle.velocityX = -4;

        obstaclesGroup.add(obstacle);

        //to destroy a sprite after a certain time when it is no longer tracked or required
        obstacle.lifetime = Math.round(invisibleGround.width/abs(obstacle.velocityX));
    }
}

/**
 * This method creates clouds at random heights
 * and adds them to the frame
 */
function spawnClouds(){
    //to draw clouds at different Y positions from the ground
    var randNum = Math.round(random(30,100))
    //console.log("Hello Rishabh");

    if(frameCount % 80 === 0){
        //creates a cloud
        var cloud = createSprite(600, 30, 20, 10);

        //adds velocity to the clouds to move from right to left
        cloud.velocityX = -4;
        //changing the y position of the cloud
        cloud.y = randNum;

        //adding cloud Image to the sprite and making it smaller
        cloud.addImage(cloudImage);
        cloud.scale = 0.1;

        cloudsGroup.add(cloud);

        //to destroy a sprite after a certain time when it is no longer tracked or required
        cloud.lifetime = Math.round(invisibleGround.width/abs(cloud.velocityX));

        //Depth
        cloud.depth = trex.depth;
        trex.depth = trex.depth + 1;
    }
 
}
