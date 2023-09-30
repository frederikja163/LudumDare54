import P5 from "p5";

function sketch(p5: P5){
    p5.setup = () => {
        p5.createCanvas(400, 400);
    }
    
    p5.draw = () => {
        p5.background(0, 255, 0);
    }
}

new P5(sketch);