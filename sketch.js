//import { openedTabs } from "./utils.js";
//const openedTabs = require('utils');

var startNode;
var currentNodes = []
var newNodes = [];
var layers = []
var currentLayer;
let timer = 0;


let otherTimer = 0;
let fetchedTabs = 0;
let increasing = true;


let currentTabs = 0;
var remainingIterations = 0;
var growthsPerIteration = 10;
var preferredTabCount = localStorage.preferredTabCount;

let length = 5;
let angleChange = 10;
let splitChance = 0.99;
let leafChance = 0.95;
let fps = 30;
const GrowthRates = {
    Fast: 35,
    Medium: 20,
    Slow: 10
};
let growthRate = 25;
let startNodeCount = 15;
let detectRange = 100;
let stemColor = { r: 37, g: 66, b: 14 };
let leafColor = { r: 86, g: 115, b: 53 };
let outlineThickness = 2;
let stemThickness = 4;

const VineColors = {
    stemColor: { r: 37, g: 66, b: 14 },
    leafColor: { r: 86, g: 115, b: 53 }
};

function setup() {
    let c = createCanvas(displayWidth, displayHeight);
    c.position(0, 0);
    c.style('pointer-events', 'none');
    clear();
    console.log("Initializing node");
    layers = [];
    currentNodes = [];
    for (let i = 0; i < startNodeCount; i++) {
        currentNodes.push(new Vine(Math.floor(Math.random() * windowWidth), 0, 90, undefined));
    }
    frameRate(fps);
    angleMode(DEGREES);
    remainingIterations += growthsPerIteration;

    switch (localStorage.growthSpeed) {
        case "Fast":
            growthRate = Fast;
            break;
        case "Medium":
            growthRate = Medium;
            break;
        case "Slow":
            growthRate = Slow;
            break;
    }

    switch (localStorage.plant) {
        case "Vines":
            stemColor = VineColors.stemColor;
            leafColor = VineColors.leafColor;
            break;
    }
}
function draw() {
    clear();
    if (millis() >= 2000 + otherTimer) {
        if (increasing) {
            fetchedTabs++;
            console.log("1 more tab: " + fetchedTabs);
            otherTimer = millis();
            if (fetchedTabs >= preferredTabCount + 3) increasing = false;
        } else {
            fetchedTabs--;
            console.log("1 less tab: " + fetchedTabs);
            otherTimer = millis();
            if (fetchedTabs === 0) increasing = true;
        }
    }

    let deltaTabs = fetchedTabs - currentTabs;
    currentTabs = fetchedTabs;
    if (fetchedTabs >= preferredTabCount && deltaTabs != 0) {
        if (fetchedTabs > preferredTabCount && deltaTabs > 0) {
            remainingIterations += deltaTabs * growthsPerIteration;
        } else if (deltaTabs < 0) {
            layers.pop();
            currentNodes = layers[layers.length - 1].nodes;
            for (var n of currentNodes) {
                n.others = [];
            }
        }
    }

    //console.log("remaining iterations: " + remainingIterations);

    layers.forEach(function (layer) {
        image(layer.graphic, 0, 0);
    });

    if (remainingIterations > 0 && millis() >= growthRate + timer) {
        //console.log(remainingIterations % growthsPerIteration);
        if (remainingIterations % growthsPerIteration === 0) {
            var layerGraphic = createGraphics(displayWidth, displayHeight);
            currentLayer = new Layer(currentNodes, layerGraphic);
            layers.push(currentLayer);
        }
        newNodes = []
        currentLayer.nodes.forEach(function (node) {
            node.grow();
        })
        currentNodes = newNodes
        currentLayer.nodes = currentNodes;
        timer = millis();
        remainingIterations--;
    }
}

class Vine {
    constructor(x, y, angle = 0, parent = undefined) {
        this.x = Math.floor(x);
        this.y = Math.floor(y);
        this.angle = Math.floor(angle);
        this.others = [];
        this.parent = parent;
    }

    draw() {
        currentLayer.graphic.stroke(stemColor.r, stemColor.g, stemColor.b);
        currentLayer.graphic.fill(leafColor.r, leafColor.g, leafColor.b);
        let parent = this;
        this.others.forEach(function (other) {
            let x1 = parent.x;
            let y1 = parent.y;
            let x2 = other.x;
            let y2 = other.y;
            currentLayer.graphic.line(x1, y1, x2, y2);
            currentLayer.graphic.strokeWeight(outlineThickness);
            parent.leaf();
            currentLayer.graphic.strokeWeight(stemThickness);
            other.draw();
        });
    }

    grow() {
        //console.log("no children");
        let count = 1;
        if (Math.random() > splitChance) count = 2;
        for (let i = 0; i < count; i++) {
            //console.log(this);
            let deltaX = cos(this.angle);
            let deltaY = sin(this.angle);
            let deltaAngle; // [-10, 10]

            let vineAngle = this.angle;

            //console.log("x: " + this.x + " y: " + this.y);

            if (this.x + (deltaX * detectRange) < 0) {
                console.log("left");
                if (vineAngle > 180 && vineAngle < 270) {
                    deltaAngle = Math.floor(Math.random() * (angleChange * 2 + 1)); // [0, 20]
                } if (vineAngle > 90 && vineAngle < 180) {
                    deltaAngle = -Math.floor(Math.random() * (angleChange * 2 + 1)); // [-20, 0]
                }
            } else if (this.x + (deltaX * detectRange) > windowWidth) {
                console.log("right");
                if (vineAngle > 0 && vineAngle < 90) {
                    deltaAngle = Math.floor(Math.random() * (angleChange * 2 + 1)); // [0, 20]
                } if (vineAngle > 270 && vineAngle < 360) {
                    deltaAngle = -Math.floor(Math.random() * (angleChange * 2 + 1)); // [-20, 0]
                }
            } else if (this.y + (deltaY * detectRange) < 0) {
                console.log("top");
                if (vineAngle > 0 && vineAngle < 90) {
                    deltaAngle = -Math.floor(Math.random() * (angleChange * 2 + 1)); // [-20, 0]
                } if (vineAngle > 90 && vineAngle < 180) {
                    deltaAngle = Math.floor(Math.random() * (angleChange * 2 + 1)); // [0, 20]
                }
            } else if (this.y + (deltaY * detectRange) > windowHeight) {
                console.log("bottom");
                if (vineAngle > 180 && vineAngle < 270) {
                    deltaAngle = -Math.floor(Math.random() * (angleChange * 2 + 1)); // [-20, 0]
                } if (vineAngle > 270 && vineAngle < 360) {
                    deltaAngle = Math.floor(Math.random() * (angleChange * 2 + 1)); // [0, 20]
                }
            } else {
                //console.log("contained")
                deltaAngle = Math.floor(Math.random() * (angleChange * 2 + 1)) - angleChange;
            }

            /* console.log("this.x + deltaX: " + this.x + ", " + (deltaX * length));
            console.log("this.y + deltaY: " + this.y + ", " + (deltaY * length));
            console.log("this.angle + deltaAngle: " + this.angle + ", " + deltaAngle); */
            let other = new Vine(this.x + (deltaX * length), this.y + (deltaY * length), (this.angle + deltaAngle) % 360, this)
            this.others.push(other);
            newNodes.push(other);
            this.draw();
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

            currentLayer.graphic.curve(c1.x, c1.y, p1.x, p1.y, p2.x, p2.y, c2.x, c2.y);
            currentLayer.graphic.curve(c3.x, c3.y, p1.x, p1.y, p2.x, p2.y, c4.x, c4.y);
        }
    }
}

class Layer {
    constructor(nodes = [], graphic) {
        console.log("OTHER NODES: " + nodes);
        this.nodes = [];
        for (var n of nodes) {
            this.nodes.push(n);
        }
        console.log("THESE NODES: " + this.nodes);
        this.graphic = graphic;
    }
}