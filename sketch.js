// Team Ahmed, Lana and Retal
// Images
var trackImage;
var catImage;
var mouseImage;
var introImage;
// Music
var music;

// Game properties
var intro = true;
var isWinner = false;
var tomImages = [];
var jerryImages = [];
var threshold = 1430;
var count = 3;
var timer = false;
var charSpeed = 30;
// Characters properties
// -- Initial coordinates
var tomX = 0;
var tomY = 370;
var jerryX = 0;
var jerryY = 200;

// -- size
var tomSize = 150;
var jerrySize = 130;


function preload()
{
  // music
  music = loadSound('../assets/music.mp3');
  music.setLoop(true);

  // Images
  introImage = loadImage("assets/intro.jpg");
  trackImage = loadImage("assets/track.webp");
  catImage = loadImage("assets/cat.png");
  mouseImage = loadImage("assets/mouse.png");

  // winner images
  for(var i = 1; i <= 3; i++){
    tomImages.push(loadImage("assets/tom/" + i + ".png"));
  }
  
  for(var i = 1; i <= 3; i++){
    jerryImages.push(loadImage("assets/jerry/" + i + ".png"));
  }

}

function setup()
{
  createCanvas(1500, 700);

  // music
  music.play();
}

function draw() {
  if(intro == true){
    background(59, 1, 0);
    imageMode(CENTER)
    image(introImage, width/2, height/ 2 - 170, 492, 374);

    // text
    textSize(40);
    textAlign(CENTER);
    fill('white');
    text("Hey! \n To play with Jerry use s \n To play with Tom use l \n Press Enter to start", width/2, height/2 + 60);

    if(timer == true){
      textSize(80);
      text(count, width/2, height/2 + 300);
      if(frameCount % 60 == 0 && count > 0){
        count -= 1;
      }
      else if (count === 0){
        intro = false;
      }
    }
  }
  if(isWinner == false && intro == false){
    imageMode(CORNER);
    // background
    // prints on each frame to remove the previous char's image after every move
    image(trackImage, 0, 0, 1500, 700);

    // characters
    image(catImage, tomX, tomY, tomSize, tomSize);
    image(mouseImage, jerryX, jerryY, jerrySize, jerrySize);
  }

}

function keyPressed(){
  // Intro remover
  if(key == 'Enter'){
    timer = true;
  }
  
  // Tom
  if(key == 'l'){
    tomX += charSpeed;
    if(tomX >= threshold){
      isWinner = true;
      console.log("tom is winner");
      jerryX = 0; //loser
      winner("tom");
    }
  }


  // Jerry
  if(key == 's'){
    jerryX += charSpeed;
    if(jerryX >= threshold){
      isWinner = true;
      console.log("jerry is winner");
      tomX = 0; //loser
      winner("jerry");
    }
  }
}

function winner(character){
  imageMode(CENTER);
  if(character == "jerry"){
    background(59, 1, 0);
    image(random(jerryImages), width / 4, height / 2); //---
    text("Jerry has won!", 1000, height / 2);
  }
  else if(character == "tom"){
    background(59, 1, 0);
    image(random(tomImages), width / 4, height / 2); //---
    text("Tom has won!", 1000, height / 2);
  }
}

// For debugging
function mousePressed(){
  console.log(mouseX, mouseY);
}
