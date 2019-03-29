// Global variables
let canvas;
let canvasContext;

let ball = {
    x: 50,
    y: 50,
    speedX: 15,
    speedY: 4
};

const PADDLE_THICKNESS  = 10;
const PADDLE_HEIGHT = 100;

let paddleOne = {
    x: 0,
    y: 250,
    score: 0
};

let paddleTwo = {
    x: 0,
    y: 250,
    score: 0
};

/**
 * Initialize the game
 * @function
 */
function game () {

    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    const framesPerSecond = 30;
    setInterval(function () {
        moveEverything();
        drawEverything();
    }, 1000 / framesPerSecond);
    
    canvas.addEventListener('mousemove', function (e) {
        const mousePosition = calculateMousePosition(e);

        paddleOne.y = mousePosition.y - (PADDLE_HEIGHT / 2);
    });
}

function computerMovement() {

    const paddleTwoYCenter = paddleTwo.y + (PADDLE_HEIGHT / 2);

    if (paddleTwoYCenter < ball.y - 35) {
        paddleTwo.y += 6;
    }
    if (paddleTwoYCenter > ball.y + 35) {
        paddleTwo.y -= 6;
    }
}

/**
 * Move all elements in the canvas
 * @function
 */
function moveEverything () {

    computerMovement();

    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.x < 0) {
        if (ball.y > paddleOne.y && ball.y < paddleOne.y + PADDLE_HEIGHT) {
            ball.speedX = -ball.speedX
        }
        else {
            ballReset();
            paddleTwo.score++;
        }
    }
    if (ball.x > canvas.width - 10) {
        if (ball.y > paddleTwo.y && ball.y < paddleTwo.y + PADDLE_HEIGHT) {
            ball.speedX = -ball.speedX
        }
        else {
            ballReset();
            paddleOne.score++;
        }
    }
    if (ball.y < 10) {
        ball.speedY = -ball.speedY;
    }
    if (ball.y > canvas.height - 10) {
        ball.speedY = -ball.speedY;
    }
}

/**
 * Draw everything
 * @function
 */
function drawEverything () {

    // Black canvas
    colorRectangle(0, 0, canvas.width, canvas.height, 'black');

    // Left player paddle
    colorRectangle(paddleOne.x, paddleOne.y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

    // Left player paddle
    colorRectangle(canvas.width - PADDLE_THICKNESS, paddleTwo.y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

    // Ball
    colorCircle (ball.x, ball.y, 10, 'white');

    // Text
    canvasContext.fillText(paddleOne.score, 100, 100);
    canvasContext.fillText(paddleTwo.score, canvas.width - 100, 100);
}

/**
 * Draw rectangle
 * @param leftX {Number}
 * @param topY {Number}
 * @param width {Number}
 * @param height {Number}
 * @param drawColor {String}
 */
function colorRectangle (leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

/**
 * Draw circle
 * @param centerX {Number}
 * @param centerY {Number}
 * @param radius {number}
 * @param drawColor {String}
 */
function colorCircle (centerX, centerY, radius, drawColor) {

    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}


/**
 * Calculate the mouse position on the canvas
 * @param e {Event}
 * @returns { {x: number, y: number} }
 * @function
 */
function calculateMousePosition(e) {

    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;

    let mouseX = e.clientX - rect.left - root.scrollLeft;
    let mouseY = e.clientY - rect.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    };
}


/**
 * Center the ball in the middle of the screen
 * @function
 */
function ballReset() {
    ball.speedX = -ball.speedX;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
}

