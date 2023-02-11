console.log('sketch blah');
var startNode;
let timer = 0;
let length = 10;
function setup() {
    let c = createCanvas(windowWidth, windowHeight);
    c.position(0, 0);
    clear();
    console.log("Initializing node");
    startNode = new Node(windowWidth / 2, 0, 90, null);
    stroke(255, 255, 255);
    strokeWeight(4);
    circle(300, 300, 20);
    frameRate(5);
    angleMode(DEGREES);
}
function draw() {
    stroke(255, 255, 255);
    strokeWeight(4);
    console.log("Drawing node");
    startNode.draw();
    if (millis() >= 250 + timer) {
        startNode.grow();
        timer = millis();
    }
}

/* chrome.tabs.query({ windowType: 'normal' }, function (tabs) {
    console.log('Number of open tabs in all normal browser windows:', tabs.length);
}); */

class Node {
    constructor(x, y, angle = 0, other = null) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.other = other;
    }

    draw() {
        line()
        if (this.other != null) {
            line(this.x, this.y, this.other.x, this.other.y);
            this.other.draw();
        }
    }

    grow() {
        if (this.other === null) {
            console.log("other is null");
            let deltaAngle = Math.floor(Math.random() * 11) - 5;
            let deltaX = cos(this.angle) * length;
            let deltaY = sin(this.angle) * length;
            this.other = new Node(this.x + deltaX, this.y + deltaY, this.angle + deltaAngle, null);
        } else {
            console.log("growing next");
            this.other.grow();
        }
    }
}