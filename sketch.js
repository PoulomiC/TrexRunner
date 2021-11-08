var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage;

function preload() {
    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    trex_collided = loadImage("trex_collided.png");
    groundImage = loadImage("ground2.png");
    cloudImage = loadImage("cloud.png");
}

function setup() {
    createCanvas(600, 200);
    
    //create a trex sprite
    trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trex_running);
    trex.scale = 0.5;
    
    //create a ground sprite
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -4;

    //create an invisible ground sprite
    invisibleGround = createSprite(200,200,400,20);
    invisibleGround.visible = false;

    console.log("Quotient " + Math.floor(623/7));

    //Modulo operator returns remainder of a division operation
    console.log("Remainder " + 623 % 80)
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
    drawSprites();
}
//single line

/**
 * This method creates clouds at random heights
 * and adds them to the frame
 */
function spawnClouds(){
    //to draw clouds at different Y positions from the ground
    var randNum = Math.round(random(30,100))
    console.log("Hello Rishabh");

    if(frameCount % 80 === 0){
        //creates a cloud
        var cloud = createSprite(600, 30, 20, 10);

        //adds velocity to the clous to move from right to left
        cloud.velocityX = -4;
        //changing the y position of the cloud
        cloud.y = randNum;

        //adding cloud Image to the sprite and making it smaller
        cloud.addImage(cloudImage);
        cloud.scale = 0.1;

        //to destroy a sprite after a certain time when it is no longer tracked or required
        cloud.lifetime = Math.round(invisibleGround.width/abs(cloud.velocityX));

        //Depth
        cloud.depth = trex.depth;
        trex.depth = trex.depth + 1;
    }
 
}
