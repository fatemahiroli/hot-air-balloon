var database,balloon;
var backgroundImage,balloonAnimation;
var balloonPosition;
var height;

function setup() {
  createCanvas(800,400);
  //connect to database
  database=firebase.database()
  console.log("database connected");

  //load images
  backgroundImage=loadImage("image/BgImage.png")
  balloonAnimation=loadAnimation("image/Hot Air Ballon-02.png","image/Hot Air Ballon-03.png","image/Hot Air Ballon-04.png")
 
  //craete balloon
  balloon=createSprite(150,250);
  balloon.scale=0.5
  balloon.addAnimation("fly",balloonAnimation)

  //get all details
  balloonPosition=database.ref('balloon/height');
  balloonPosition.on("value",readDetails,showError)
}

function draw() {
  background(backgroundImage);
  
  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0,0);
  }
  else if(keyDown(UP_ARROW)){
    if(height.scaleVal>0.2){
      writePosition(0,-10,-0.01);
    }
    
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+10,+0.01);
  }

  drawSprites();
}

function readDetails(data){
  console.log("im in readDetails")
  height=data.val()
  console.log("details:",height)
  balloon.x=height.x;
  balloon.y=height.y;
  balloon.scale=height.scaleVal

}

function writePosition(x,y,scaleVal){
  database.ref('balloon/height').set({
    'x':height.x + x,
    'y':height.y + y,
    'scaleVal':height.scaleVal + scaleVal
  });

}
function showError(){
  console.log("error while writing data to database")
}