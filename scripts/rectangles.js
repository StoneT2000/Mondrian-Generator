var cWidth = window.innerWidth;
var cHeight = window.innerHeight;
var colors2 = ["#fde74c","#ffbb32",  "#fa7921", "#f93416","#ff1654","#f3ffbd","#b2dbbf","#247ba0","#06d6a0"];
var rectangleColors = [];
$(document).on("ready",function(){

  $(document).mousemove(function(e){

  });
  
});
var rCanvas;
function setup(){
  rCanvas = createCanvas(cWidth,cHeight);
  rCanvas.parent("display");
  background(255,255,255);
  stroke(255,255,255)
  strokeWeight(5);
}

function draw(){
  for (var i =0; i<rectangles.length;i++){
    if (pointInRect(mouseX,mouseY,rectangles[i])){
      fill(rectangleColors[i]);
      rect(rectangles[i][0],rectangles[i][1],rectangles[i][2],rectangles[i][3])
    }
  }
}
var rectangles = [[0,0,cWidth,cHeight]];
var count = 0;
function generateRectangles(rectArr){
  if (count < 10){
    
    var randomIndex = round(random(0,1) * (rectArr.length - 1));
    
    //Choose a place to split rectangle
    var chosenRect = rectArr[randomIndex];
    
    //xv,yv are displacement values
    var xv;
    var yv;
    //console.log(rectArr,"before")
    if (random(0,1) < 0.5){
      //split left right
      yv = random(0,1) * (chosenRect[3]);
      //if too small, redo
      if (yv < 100){
        return generateRectangles(rectArr);
      }
    }
    else {
      xv = random (0,1) * (chosenRect[3]);
      if (xv < 100){
        return generateRectangles(rectArr);
      }
    }
    rectArr.splice(randomIndex,1);
    if (yv){
      //left to right split
      //Retains width, and height yv, and chosenRect[3]-yv;
      //New pos at original and originalx, originaly+yv
      rectArr.push([chosenRect[0],chosenRect[1],chosenRect[2], yv ])
      rectArr.push([chosenRect[0],chosenRect[1]+yv,chosenRect[2], chosenRect[3]-yv]);
    }
    else {
      //up down split
      //Retains height, and width xv, and chosenRect[2]-xv;
      //New pos at original and originaly, originalx+xv
      rectArr.push([chosenRect[0],chosenRect[1], xv, chosenRect[3]])
      rectArr.push([chosenRect[0]+xv,chosenRect[1], chosenRect[2] - xv, chosenRect[3]])
      
    }
    
    count++;
    //console.log(rectArr,"after")
    return generateRectangles(rectArr);
  }
  else {
    displayRectangles(rectArr)
    return rectArr;
  }
  //generate rectangles so far, first being the canvas itself
  //Splits a random rectangle in given array of chosen rectangles
  //Removes the original rectangle and appends two new ones
  
  
  
}

function displayRectangles(rectArr){
  for (var i=0;i<rectArr.length;i++){
    var randomIndex = round(random(0,1) * (colors2.length -1));
    fill(colors2[randomIndex]);
    rectangleColors.push(colors2[randomIndex]);
    rect(rectArr[i][0],rectArr[i][1],rectArr[i][2],rectArr[i][3])
  }
}

function pointInRect(x1,y1,rectangle){
  if (x1 >= rectangle[0] && x1<= rectangle[0]+rectangle[2] && y1>=rectangle[1] && y1<=rectangle[1] + rectangle[3]){
    return true;
  }
}