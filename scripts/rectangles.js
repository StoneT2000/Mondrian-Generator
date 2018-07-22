var cWidth = window.innerWidth;
var cHeight = window.innerHeight - 60;
var colors2 = ["#fff001","#ff0101","#0101fd","#f9f9f9","#f9f9f9","#f9f9f9","#f9f9f9","#30303a"]
var colorsUnique = ["#fff001", "#ff0101", "#0101fd", "#f9f9f9", "#30303a"]
var rectangleColors = [];

var clear = false;
$(document).on("ready",function(){
  $("#reset").on("click",function(){
    //reset colors
    rectangleColors = [];
    
    //Reset rectangles
    cWidth = window.innerWidth;
    cHeight = window.innerHeight- 60;
    rectangles = [];
    background(255,255,255)
  })
  
  $("#generate").on("click",function(){
    rectangles = [];
    background(255,255,255)

    rectangles = generateStartRectangles(5);
    displayRectangles(rectangles);
    generateRectangles(rectangles,60);
    //generateRectangles(rectangles,60);
  })
  $("#download").on("click",function(){
    saveCanvas(rCanvas,"MondrianArt.png")
  })
  $(window).resize(function() {
    cWidth = window.innerWidth;
    cHeight = window.innerHeight - 60;
    rCanvas = createCanvas(cWidth,cHeight);
    rCanvas.parent("display");
    clear =true;
    background(255,255,255);
    //stroke(10,10,10)
    strokeWeight(5);
  });
  
});
var rCanvas;
function setup(){
  noStroke();
  rCanvas = createCanvas(cWidth,cHeight);
  rCanvas.parent("display");
  background(255,255,255);

  //stroke(10,10,10)
  strokeWeight(5);
}

function draw(){
  if (clear == true){
    clear = false;
    background(255,255,255);
  }
  for (var i = rectangles.length-1; i>=0;i--){
    if (pointInRect(mouseX,mouseY,rectangles[i])){
      stroke(10,10,10);
      fill(rectangleColors[i]);
      rect(rectangles[i][0],rectangles[i][1],rectangles[i][2],rectangles[i][3])
    }
  }
}
var rectangles = [];
var count = 0;
function mousePressed(){
  console.log("press")
  for (var i = rectangles.length-1; i>=0;i--){
    if (pointInRect(mouseX,mouseY,rectangles[i])){
      var currColor = rectangleColors[i];
      var currIndex = 0;
      for (var k = 0; k<colorsUnique.length;k ++){
        //Find index of color
        if (colorsUnique[k] == rectangleColors[i]){
          currIndex = k;
          break;
        }
      }
      rectangleColors[i] = colorsUnique[ (k+1) % colorsUnique.length];
      break;

    }
  }
}

function generateStartRectangles(mc){
  var rectArr = [];
  var updown = round(random(0,1) * (mc - 1)) + 1;
  var leftright = round(random(0,1) * (mc - 1)) + 1;
  
  var pos = 10;
  var cws = [10];
  var chs = [10];
  for (var i = 0; i<updown;i++){
    var cw = max(round(random(0,1) * ((cWidth-10)/updown)), 20);
    cws.push(cw + pos)
    pos += cw;
  }
  pos = 10;
  for (var i = 0; i<leftright;i++){
    var ch = max(round(random(0,1) * ((cHeight-10)/updown)), 20);
    chs.push(ch + pos)
    pos += ch;
  }
  var px=0;
  var py=0;
  for (var i = 0; i < updown; i++){
    for (var j = 0; j < leftright; j++){
      if (j < leftright -1 && i < updown -1){
        rectArr.push([cws[i],chs[j],cws[i+1]-cws[i],chs[j+1]-chs[j]]);
      }
      else if (j == leftright -1 && i < updown -1){
        rectArr.push([cws[i],chs[j],cws[i+1]-cws[i],cHeight-10-chs[j]]);
      }
      else if (j < leftright -1 && i == updown -1){
        rectArr.push([cws[i],chs[j],cWidth-10 - cws[i],chs[j+1]-chs[j]]);
      }
      else {
        rectArr.push([cws[i],chs[j],cWidth-10 - cws[i], cHeight-10-chs[j]]);
      }
    }
  }
  //console.log(updown,leftright,rectArr)
  return rectArr;
  
}
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
      yv = round (random(0,1) * (chosenRect[3]) / 30) * 30;
      //if too small, redo
      if (yv < 50 || chosenRect[3] - yv < 50){
        max--;
        return generateRectangles(rectArr, max);
      }
    }
    else {
      xv = round (random (0,1) * (chosenRect[2]) / 30) * 30;
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