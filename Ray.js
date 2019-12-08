class Ray{

    constructor(x1, y1, x2, y2){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    show(){ // draws a line bewteen the 2 points that define a line
        ctx2d.strokeStyle = "#fff";
        ctx2d.beginPath();
        ctx2d.moveTo(this.x1, this.y1);
        ctx2d.lineTo(this.x2, this.y2);
        ctx2d.stroke();
    }

    cast(wall){

        let denominator = (wall.x1 - wall.x2) * (this.y1 - this.y2) - (wall.y1 - wall.y2) * (this.x1 - this.x2);

        if(denominator === 0){
            return;
        }

        let t = ((wall.x1 - this.x1) * (this.y1 - this.y2) - (wall.y1 - this.y1) * (this.x1 - this.x2)) / denominator;
        let u = ((wall.x1 - wall.x2) * (wall.y1 - this.y1) - (wall.y1 - wall.y2) * (wall.x1 - this.x1)) / denominator;

        if(t >= 0 && t <= 1 && u <= 0){
            let x = wall.x1 + t * (wall.x2 - wall.x1);
            let y = wall.y1 + t * (wall.y2 - wall.y1);
            return {x, y};
        }
    }
}