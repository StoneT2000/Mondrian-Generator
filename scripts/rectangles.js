var cWidth = window.innerWidth;
var cHeight = window.innerHeight;
var colors2 = ["#fde74c","#ffbb32",  "#fa7921", "#f93416","#ff1654","#f3ffbd","#b2dbbf","#247ba0","#06d6a0"];
var rectangleColors = ["#ffffff"];

var single = true;
$(document).on("ready",function(){
  $("#reset").on("click",function(){
    //reset colors
    rectangleColors = ["#ffffff"];
    
    //Reset rectangles
    cWidth = window.innerWidth;
    cHeight = window.innerHeight;
    rectangles = [[0,0,cWidth,cHeight]];

  })
  
  $("#generate").on("click",function(){
    generateRectangles(rectangles,60);
  })
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
  if (single != true){
    background(255,255,255);
  }
  for (var i = rectangles.length-1; i>=0;i--){
    if (pointInRect(mouseX,mouseY,rectangles[i])){
      fill(rectangleColors[i]);
      rect(rectangles[i][0],rectangles[i][1],rectangles[i][2],rectangles[i][3])
    }
  }
}
var rectangles = [[0,0,cWidth,cHeight]];
var count = 0;
function generateRectangles(rectArr, max){
  if (count < max){
    
    var randomIndex = round(random(0,1) * (rectArr.length - 1));
    
    //Choose a place to split rectangle
    var chosenRect = rectArr[randomIndex];
    
    //xv,yv are displacement values
    var xv;
    var yv;
    //console.log(rectArr,"before")
    if (random(0,1) <= 0.5){
      //split left right
      yv = round (random(0,1) * (chosenRect[3]));
      //if too small, redo
      if (yv < 50 || chosenRect[3] - yv < 50){
        max--;
        return generateRectangles(rectArr, max);
      }
    }
    else {
      xv = round (random (0,1) * (chosenRect[2]));
      if (xv < 50 || chosenRect[2] - xv < 50){
        max--;
        return generateRectangles(rectArr, max);
      }
    }
    //console.log(rectArr.slice(0));
    
    if (yv){
      //left to right split
      //Retains width, and height yv, and chosenRect[3]-yv;
      //New pos at original and originalx, originaly+yv
      rectArr.push([chosenRect[0],chosenRect[1],chosenRect[2], yv ])
      rectArr.push([chosenRect[0],chosenRect[1]+yv,chosenRect[2], abs(chosenRect[3]-yv)]);
    }
    else if (xv){
      //up down split
      //Retains height, and width xv, and chosenRect[2]-xv;
      //New pos at original and originaly, originalx+xv
      rectArr.push([chosenRect[0],chosenRect[1], xv, chosenRect[3]])
      rectArr.push([chosenRect[0]+xv,chosenRect[1], abs(chosenRect[2] - xv), chosenRect[3]])
      
    }
    else {
      return generateRectangles(rectArr,max);
    }
    rectArr.splice(randomIndex,1);
    console.log(rectArr.slice(0));
    max--;
    //console.log(rectArr,"after")
    return generateRectangles(rectArr,max);
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
  for (var i=rectArr.length-1; i>=0;i--){
    var randomIndex = round(random(0,1) * (colors2.length -1));
    //fill(colors2[randomIndex]);
    rectangleColors.push(colors2[randomIndex]);
    //rect(rectArr[i][0],rectArr[i][1],rectArr[i][2],rectArr[i][3])
  }
}

function pointInRect(x1,y1,rectangle){
  if (x1 >= rectangle[0] && x1<= rectangle[0]+rectangle[2] && y1>=rectangle[1] && y1<=rectangle[1] + rectangle[3]){
    return true;
  }
}