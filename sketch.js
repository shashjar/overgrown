var startNode;
var startingNodes = []
let timer = 0;

let length = 10;
let angleChange = 10;
let splitChance = 0.99;
let leafChance = 0.90;
let fps = 10;
let growthRate = 100;
let startNodeCount = 10;

function setup() {
    let c = createCanvas(windowWidth, windowHeight);
    c.position(0, 0);
    clear();
    console.log("Initializing node");
    for (let i = 0; i < startNodeCount; i++) {
        startingNodes.push(new Node(Math.floor(Math.random() * windowWidth), 0, 90));
    }
    frameRate(fps);
    angleMode(DEGREES);
}
function draw() {
    stroke(37, 66, 14);
    strokeWeight(4);
    if (millis() >= growthRate + timer) {
        startingNodes.forEach(function (node) {
            node.grow();
        })
        timer = millis();
    }
}

/* chrome.tabs.query({ windowType: 'normal' }, function (tabs) {
    console.log('Number of open tabs in all normal browser windows:', tabs.length);
}); */

class Node {
    constructor(x, y, angle = 0) {
        this.x = Math.floor(x);
        this.y = Math.floor(y);
        this.angle = Math.floor(angle);
        this.others = [];
    }

    draw() {
        stroke(37, 66, 14);
        strokeWeight(4);
        fill(86, 115, 53);
        let parent = this;
        this.others.forEach(function (other) {
            console.log(parent);
            let x1 = parent.x;
            let y1 = parent.y;
            let x2 = other.x;
            let y2 = other.y;
            line(x1, y1, x2, y2);
            parent.leaf();
            other.draw();
        });
    }

    grow() {
        if (this.others.length === 0) {
            console.log("no children");
            let count = 1;
            if (Math.random() > splitChance) count = 2;
            for (let i = 0; i < count; i++) {
                let deltaAngle = Math.floor(Math.random() * angleChange * 2 + 1) - angleChange;
                let deltaX = cos(this.angle) * length;
                let deltaY = sin(this.angle) * length;
                console.log("this.x + deltaX: " + this.x + deltaX);
                console.log("this.y + deltaY: " + this.y + deltaY);
                console.log("this.angle + deltaAngle: " + this.angle + deltaAngle);
                let other = new Node(this.x + deltaX, this.y + deltaY, this.angle + deltaAngle)
                this.others.push(other);
                this.draw();
            }
        } else {
            this.others.forEach(function (other) {
                console.log("growing next");
                other.grow();
            })
        }
    }

    leaf() {
        if (Math.random() > leafChance) {
            let side = (Math.random() > 0.5 ? 1 : -1);
            angleMode(DEGREES);
            let center = { x: this.x, y: this.y };
            let angle = this.angle;

            let p1 = { x: center.x, y: center.y };
            let p2 = { x: center.x + side * (cos(270 + angle) * 40), y: center.y + side * (sin(270 + angle) * 40) };

            let c1 = { x: center.x + (cos(180 + angle) * 50), y: center.y + (sin(180 + angle) * 50) };
            let c2 = { x: -center.x + p2.x + c1.x, y: -center.y + p2.y + c1.y };
            let c3 = { x: center.x + (cos(angle) * 50), y: center.y + (sin(angle) * 50) };
            let c4 = { x: -center.x + p2.x + c3.x, y: -center.y + p2.y + c3.y };

            curve(c1.x, c1.y, p1.x, p1.y, p2.x, p2.y, c2.x, c2.y);
            curve(c3.x, c3.y, p1.x, p1.y, p2.x, p2.y, c4.x, c4.y);

        }
    }
}