function init(){
    canvas=document.getElementById("canvas")
    pen=canvas.getContext("2d");
    W=canvas.width;
    H=canvas.height;
    food=getRandomFood();
    score=5;
    game_over=false;
    snake={
        init_length:5,
        color:"aqua",
        cells:[],
        direction:"right",
        createSnake:function(){
            for(let i=this.init_length-1;i>=0;i--){
                this.cells.push({x:i,y:0})
            }
        },
        drawSnake:function(){
            for(let i=0;i<this.cells.length;i++){
                pen.fillStyle="yellow";
                pen.strokeStyle="black";
                pen.lineWidth=5;
                pen.strokeRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
                pen.fillRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
            }
        },
        updateSnake:function(){
            var headX=this.cells[0].x;
            var headY=this.cells[0].y;


            //nextHeadX=headX+1;
            //this.cells.pop();

            if(headX==food.x && headY==food.y){
                food=getRandomFood();
                score++;
            }else{

                this.cells.pop();

            }
            //this.cells.unshift({x:nextHeadX,y:headY});
            if(this.direction=="right"){
                nextX=headX+1;
                nextY=headY;
            }
            else if(this.direction=="left"){
                nextX=headX-1;
                nextY=headY;
            }
            else if(this.direction=="down"){
                nextX=headX;
                nextY=headY+1;
            }
            else{
                nextX=headX;
                nextY=headY-1;
            }
            //insert the new cell
            //this.cells.pop();
            this.cells.unshift({x:nextX,y:nextY});

            //find out the last
            last_x=Math.round(W/10);
            last_y=Math.round(H/10);

            if(this.cells[0].y<0 || this.cells[0].x<0 || this.cells[0].x>last_x || this.cells[0].y>last_y){
                alert("Game over your sccore :",score);
                game_over=true;
            }
            
        }

    }
    snake.createSnake();
    //add eventlistners------

    function keyPress(event){
        console.log(event);
        if(event.key=="ArrowRight"){
            snake.direction="right";
        }else if(event.key=="ArrowLeft"){
            snake.direction="left";
        }else if(event.key=="ArrowDown") {
            snake.direction="down";
          
        }else{
            snake.direction="up";
        }

    }
    document.addEventListener("keydown",keyPress);
}
function draw(){
    //console.log(box.speed);
    pen.clearRect(0,0,W,H);
    snake.drawSnake();

    pen.fillStyle=food.color;
    pen.fillRect(food.x*10,food.y*10,10,10);

    

}
function update(){
    snake.updateSnake();
    
}

function gameLoop(){
    draw();
    update();
    if(game_over==true){
        clearInterval(f);

    }
}
function getRandomFood(){
    var foodX=Math.round(Math.random()*(W-10)/14);
    var foodY=Math.round(Math.random()*(H-10)/10);
    foodColors=["red","green","aqua","coral","orchid"];

    i=Math.round(Math.random()*foodColors.length);

    food={
        x:foodX,
        y:foodY,
        color:foodColors[i]
    }
    return food;
}
init();
//gameLoop();
var f=setInterval(gameLoop,100);


