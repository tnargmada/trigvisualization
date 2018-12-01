var canvas;
var canvasContext;

var form, input, button;

const UNIT_LENGTH = 100;
const ANGLE_SPEED = 0.008;

var rotation = true;
var angleUnits = true; //true for radians, false for degrees

var originX, originY;
var angle = 0;
var radiusX, radiusY;
// for sin, cos, and tan, the vars represent the end that is not the same as the end of the radius
var sinLength, sinX, sinY, cosLength, cosX, cosY, tanLength, tanX, tanY, tanAngle;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	
	setupInput();

	originX = canvas.width/2;
	originY = canvas.height/2;

	var fps = 60;
	setInterval(function() {
		move();
		draw();
	}, 1000/fps);
}

function setupInput() {
	document.addEventListener('keydown', keyPressed);
    	
	form = document.createElement("FORM");
    	form.setAttribute("id", "angleForm");
	form.style.position='absolute';
	form.style.left='230px';
	form.style.top='43px';
    	document.body.appendChild(form);
    	
    	input = document.createElement("INPUT");
    	input.setAttribute("type", "number");
    	document.getElementById("angleForm").appendChild(input); 

	button = document.createElement("INPUT");
    	button.setAttribute("type", "button");
	button.setAttribute("onclick", "setAngle()");
	button.setAttribute("value", "GO");
    	document.getElementById("angleForm").appendChild(button); 
}

function keyPressed(evt) {
	//console.log(evt.keyCode);
	if (evt.keyCode == 32) {
		rotation = !rotation;
	}
	if (evt.keyCode == 68) {
		angleUnits = false;
	}
	if (evt.keyCode == 82) {
		angleUnits = true;
	}
	if (evt.keyCode == 27) {
		angle = 0;
	}
}

function setAngle() {
	rotation = false;
	if(angleUnits) {
		angle = parseFloat(input.value);
	} else {
		angle = parseFloat(input.value) * Math.PI/180;
	}
}

function moveAngle() {
	if(rotation) {
		angle += ANGLE_SPEED;
	}
	sinLength = UNIT_LENGTH*sin(angle);
	cosLength = UNIT_LENGTH*cos(angle);
	tanLength = UNIT_LENGTH*tan(angle);
}

function moveRadius() {
	radiusX = originX+cosLength;
	radiusY = originY-sinLength;
}

function moveSin() {
	sinX = originX+cosLength;
	sinY = originY;
}

function moveCos() {
	cosX = originX;
	cosY = originY-sinLength;
}

function moveTan() {
	if(radiusX > originX) {
		tanX = originX + cosLength + Math.sqrt(tanLength*tanLength - sinLength*sinLength);
	} else {
		tanX = originX + cosLength - Math.sqrt(tanLength*tanLength - sinLength*sinLength);
	}
	tanY = originY;
}

function move() {
	moveAngle();
	moveRadius();
	moveSin();
	moveCos();
	moveTan();
}

function drawPlane() {
	// draw coordinate plane
	drawLine(0,originY, 800,originY, '#9b9b9b');
	drawLine(originX,0, originX,600, '#9b9b9b');
	
	// draw unit dashes for x axis
	for(var i=UNIT_LENGTH; i<400; i+=UNIT_LENGTH) {
		drawLine(originX-i,originY+4, originX-i,originY-4, '#9b9b9b');
		drawLine(originX+i,originY+4, originX+i,originY-4, '#9b9b9b');
	}
	// draw unit dashes for y axis
	for(var i=UNIT_LENGTH; i<300; i+=UNIT_LENGTH) {
		drawLine(originX+4,originY+i, originX-4,originY+i, '#9b9b9b');
		drawLine(originX+4,originY-i, originX-4,originY-i, '#9b9b9b');
	}
}

function drawTrig() {
	//draw unit circle
	canvasContext.strokeStyle = 'black';
	canvasContext.beginPath();
	canvasContext.arc(originX,originY,UNIT_LENGTH,0,Math.PI*2,true);
	canvasContext.stroke();

	//draw radius
	drawLine(originX,originY, radiusX,radiusY, 'black');

	//draw sin
	drawLine(sinX,sinY, radiusX,radiusY, 'red');

	//draw cos
	drawLine(cosX,cosY, radiusX,radiusY, 'blue');

	//draw tan
	drawLine(tanX,tanY, radiusX,radiusY, 'green');
}

function drawInfo() {
	canvasContext.font = '15px sans-serif';

	//draw angle value and deg/rad text
	var angleText, unitsText;
	if(angleUnits) {
		angleText = "angle: " + Math.round(angle*100)/100;
		unitsText = "RAD";
	} else {
		angleText = "angle: " + Math.round(angle*(180/Math.PI)*100)/100;
		unitsText = "DEG";
	}
	drawText(angleText, 14,50, "black");
	drawText(unitsText, 14,22, "#9b9b9b");

	//draw sin, cos, tan value text
	drawText("sin: " + Math.round(100*sin(angle))/100, 14,70, 'red');
	drawText("cos: " + Math.round(100*cos(angle))/100, 14,90, 'blue');
	drawText("tan: " + Math.round(100*tan(angle))/100, 14,110, 'green');

	//draw instructions
	drawText("press space to stop or start the animation", 14,140, "#9b9b9b");
	drawText("press d for degrees, r for radians", 14,160, "#9b9b9b");
	drawText("press esc to reset", 14,180, "#9b9b9b");
	drawText("enter an angle:", 115,50, "#9b9b9b");
}

function draw() {
	// draw canvas
	canvasContext.fillStyle = 'white';
	canvasContext.fillRect(0,0, canvas.width,canvas.height);

	drawTrig();
	drawPlane();
	drawInfo();
}

function drawLine(startX,startY, endX,endY, color) {
	canvasContext.strokeStyle = color;
	canvasContext.beginPath();
	canvasContext.moveTo(startX,startY);
	canvasContext.lineTo(endX,endY);
	canvasContext.stroke();
}

function drawText(text, x,y, color) {
	canvasContext.fillStyle = color;
	canvasContext.fillText(text, x,y);
}