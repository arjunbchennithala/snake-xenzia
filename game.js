var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');
var scorewindow = document.getElementById("score");
var game = document.getElementById("over");
var over = false;
const scale = 10;
const width = canvas.width;
const height = canvas.height;
const rows = height/scale;
const columns = width/scale; 

class Snakeparts {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class Snake {
	constructor(x, y) {
		this.body = [new Snakeparts(x, y)];
		this.head = 0;
		this.xspeed = 0;
		this.yspeed = 0;
                
	}

	update() {
		if((this.body[this.head].x === food.x) && (this.body[this.head].y == food.y)) {
			this.grow();
			food.picklocation();
			return;
		}
		this.body[this.head].x += this.xspeed;
		this.body[this.head].y += this.yspeed;
		if(this.body[this.head].x >= columns) {
			this.body[this.head].x = 0;
		} else if(this.body[this.head].x < 0) {
			this.body[this.head].x = columns;
		} else if(this.body[this.head].y >= rows) {
			this.body[this.head].y = 0;
		} else if(this.body[this.head].y < 0) {
			this.body[this.head].y = rows;
		}
	}

	draw() {
		ctx.fillStyle = "green";
		ctx.beginPath();
		for(var i=0; i<this.head; i++) {
			ctx.fillRect(this.body[i].x*scale, this.body[i].y*scale, scale, scale);
			if(i<this.head) {
				this.body[i].x = this.body[i+1].x;
				this.body[i].y = this.body[i+1].y;
			} 
		}
	}

	grow() {
		this.body.push(new Snakeparts(this.body[this.head].x + this.xspeed, this.body[this.head].y + this.yspeed));
		this.head++;
		scorewindow.innerHTML = (this.head-3)*10;
                
	}
    gameover() {
                for(let j=0;j<(this.head-3);j++)
                    {
                     let part=this.body[j];
                     let head=this.body[this.head];
                     if((part.x===head.x)&&(part.y===head.y))
                     {
                    clearInterval(Interval);
					over=true;
                    game.innerHTML ="GAME OVER";
					ctx.fillStyle="white";
                    ctx.font="40px verdana";
                    ctx.fillText("Press Enter", width/4.5, height/2);
                     }}
        }
}

class Food {
	picklocation() {
		this.x = Math.floor(Math.random()*columns);
		this.y = Math.floor(Math.random()*rows);
	}
	draw() {
		ctx.beginPath();
                ctx.fillStyle = "blue";
		ctx.fillRect(this.x * scale, this.y * scale, scale, scale);
	}	
}


var snake = new Snake(0, 2);
snake.grow();
snake.grow();
snake.grow();
snake.xspeed = 1;
var food = new Food();
food.picklocation();

document.addEventListener("keydown", (event) => {
	switch(event.key) {
		case 'a':
		case 'A':
                case 'ArrowLeft':
                        if((snake.xspeed == 1)&&(snake.yspeed == 0))
                        {
                         break;}
			snake.yspeed = 0;
			snake.xspeed = -1;
			break;
		case 'd':
		case 'D':
                case 'ArrowRight':
                        if((snake.xspeed == -1)&&(snake.yspeed == 0))
                        {
                         break;}
			snake.yspeed = 0;
			snake.xspeed = 1;
			break;
		case 'w':
		case 'W':
                case 'ArrowUp':
                        if((snake.xspeed == 0)&&(snake.yspeed == 1))
                        {
                         break;}
			snake.xspeed = 0;
			snake.yspeed = -1;
			break;
		case 's':
		case 'S':
                case 'ArrowDown':
                        if((snake.xspeed == 0)&&(snake.yspeed == -1))
                        {
                         break;}
			snake.xspeed = 0;
			snake.yspeed = 1;
			break;
		case 'Enter'://Restart the game
			if(over==true)
			{
				game.innerHTML ="";
				scorewindow.innerHTML =0;
				document.location.reload();
				break;
			}
			break;
	}
});

Interval=setInterval(()=>{
	ctx.clearRect(0, 0, width, height);
	snake.update();
	snake.draw();
	food.draw();
    snake.gameover();
        
}, 120);
