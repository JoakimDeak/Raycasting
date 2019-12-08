class Observer{

    constructor(x, y, size, fov){
        this.x = x; // x coordinate
        this.y = y; // y coordinate
        this.size = size; // radius
        this.facing = 0; // which direction the observer is facing, measured in radians
        this.fov = fov * Math.PI / 180; // field of view, measured in radians
        this.rays = [];
        this.movementSpeed = 3; // movement speed modifier
        this.turnSpeed = 2.5; // turn speed modifier
    }

    show(){ // draws a circle sector representing the fov of the observer
        this.showRays();
        this.makeRays();

        ctx2d.fillStyle = "#f00";
        ctx2d.beginPath();
        ctx2d.moveTo(this.x, this.y);
        ctx2d.arc(this.x, this.y, this.size, this.facing - this.fov / 2, this.facing + this.fov / 2);
        ctx2d.closePath();
        ctx2d.fill();
    }

    showRays(){
        this.rays.forEach(ray => ray.show());
    }

    makeRays(){
        this.rays = [];

        let facing = this.facing * 180 / Math.PI; // converting radians to degrees so that each degree is one ray
        let fov = this.fov * 180 / Math.PI;

        let angle = facing - fov / 2;

        for(let i = 0; i < fov; i++){
            let angleRadians = angle * Math.PI / 180; // convert angles to radians so cos and sin works correctly
            this.rays.push(new Ray(this.x, this.y, Math.cos(angleRadians) + this.x, Math.sin(angleRadians) + this.y));
            angle++;
        }
    }

    rayCollision(walls){ // check every ray for collision with every wall
        for(let ray of this.rays){

            let smallestDistanceToIntersection = Number.MAX_VALUE;
            let closestX = Number.MAX_VALUE;
            let closestY = Number.MAX_VALUE;

            for(let wall of walls){

                let intersection = ray.cast(wall);
                if(intersection !== undefined){
                    let x = intersection.x;
                    let y = intersection.y;
                    let distanceToIntersection = Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
                    if(distanceToIntersection < smallestDistanceToIntersection){
                        smallestDistanceToIntersection = distanceToIntersection;
                        closestX = x;
                        closestY = y;
                    }
                }
            }
            if(closestX !== Number.MAX_VALUE && closestY !== Number.MAX_VALUE){
                ray.x2 = closestX;
                ray.y2 = closestY;
            }
        }
    }

    moveForward(){
        this.x += Math.cos(this.facing) * this.movementSpeed;
        this.y += Math.sin(this.facing) * this.movementSpeed;
    }
    moveBackwards(){
        this.x += Math.cos(this.facing + Math.PI) * this.movementSpeed / 2; // divide by 2 to slow down when moving backwards
        this.y += Math.sin(this.facing + Math.PI) * this.movementSpeed / 2;
    }
    turnLeft(){
        this.facing -= Math.PI / 180 * this.turnSpeed;
    }
    turnRight(){
        this.facing += Math.PI / 180 * this.turnSpeed;
    }
}