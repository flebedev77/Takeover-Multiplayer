class Path {
    //a,b are vectors
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    draw(ctx) {
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(this.a.x, this.a.y);
        ctx.lineTo(this.b.x, this.b.y);
        ctx.stroke();
        ctx.closePath();
    }
}