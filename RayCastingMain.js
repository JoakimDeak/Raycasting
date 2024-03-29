document.addEventListener('keydown', keyDownHandler, false); // event listeners for button presses
document.addEventListener('keyup', keyUpHandler, false);

const canvas2d = document.getElementById('2d');// to show top down view
const ctx2d = canvas2d.getContext('2d');
const canvas3d = document.getElementById('3d');// to show view of observer
const ctx3d = canvas3d.getContext('2d');

// input handling
let upPressed = false;
let leftPressed = false;
let downPressed = false;
let rightPressed = false;

function keyDownHandler(event){
    if(event.key === 'd'){
        rightPressed = true;
    } else if(event.key === 'a'){
        leftPressed = true;
    }
    if(event.key === 's'){
        downPressed = true;
    } else if(event.key === 'w'){
        upPressed = true;
    }
}

function keyUpHandler(event){
    if(event.key === 'd'){
        rightPressed = false;
    } else if(event.key === 'a'){
        leftPressed = false;
    }
    if(event.key === 's'){
        downPressed = false;
    } else if(event.key === 'w'){
        upPressed = false;
    }
}

function checkInputs(){
    if(upPressed){
        observer.moveForward();
    } else if(downPressed){
        observer.moveBackwards();
    }
    if(leftPressed){
        observer.turnLeft();
    } else if(rightPressed){
        observer.turnRight();
    }
}

function render3d(){
    ctx3d.clearRect(0, 0, canvas3d.width, canvas3d.height);
    ctx3d.fillStyle = "#000";
    ctx3d.fillRect(0, 0, canvas3d.width, canvas3d.height);

    for(let i = 0; i < observer.rays.length; i++){
        let ray = observer.rays[i];
        let rdist = ray.length();
        let wallHeight = canvas3d.height - rdist;
        if(rdist > 2){ // rays that dont hit walls are just very short
            let color = 255 - rdist;
            ctx3d.fillStyle = 'rgb(' + color + ', ' + color + ', ' + color + ')';
            ctx3d.fillRect(canvas3d.width / observer.rays.length * i, canvas3d.height / 2 - wallHeight / 2, canvas3d.width / observer.rays.length + 1, wallHeight);
        }
    }
}

// generates a given number of walls
function generateWalls(numOfWalls){
    /*walls.push(new Wall(0, canvas2d.height, canvas2d.width, canvas2d.height));// framing the canvas with border walls
    walls.push(new Wall(0, 0, canvas2d.width, 0));
    walls.push(new Wall(0, 0, 0, canvas2d.height));
    walls.push(new Wall(canvas2d.width, 0, canvas2d.width, canvas2d.height));*/
    for(let i = 0; i < numOfWalls; i++){
        let nums = [];
        for(let j = 0; j < 4; j++){
            nums.push(Math.floor(Math.random() * canvas2d.width)); // assuming a square canvas
        }
        let wall = new Wall(nums[0], nums[1], nums[2], nums[3]);
        walls.push(wall);
    }
}

function showWalls(){
    walls.forEach(wall => wall.show());
}

// initializing
let walls = [];
generateWalls(5);
let observer = new Observer(300, 150, 10, 90);

// game loop
requestAnimationFrame(update);
function update(){
    ctx2d.clearRect(0, 0, canvas2d.width, canvas2d.height);
    ctx2d.fillStyle = "#000";
    ctx2d.fillRect(0, 0, canvas2d.width, canvas2d.height);

    checkInputs();
    observer.rayCollision(walls);

    render3d();

    showWalls();
    observer.show();


    requestAnimationFrame(update);
}