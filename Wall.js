class Wall{

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
}