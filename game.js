// Game Setup
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

// Game variables
let carX = canvas.width / 2 - 50;
let carY = canvas.height - 100;
let carSpeed = 5;
let carWidth = 50;
let carHeight = 100;
let carImage = new Image();
let isGameRunning = false;
let fuel = 100;
let crashes = 0;

// Load car image (initial car: Lamborghini)
carImage.src = "assets/images/lamborghini.png";

// Background image
let background = new Image();
background.src = "assets/images/background.jpg";

// Sound effects
let engineSound = new Audio("assets/sounds/engine.mp3");
let crashSound = new Audio("assets/sounds/crash.mp3");
let fuelSound = new Audio("assets/sounds/fuel.mp3");

// Game loop
function gameLoop() {
    if (isGameRunning) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // Draw car
        ctx.drawImage(carImage, carX, carY, carWidth, carHeight);

        // Handle fuel
        fuel -= 0.1;
        if (fuel <= 0) {
            endGame("Out of fuel!");
        }

        // Update fuel level display
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Fuel: " + Math.round(fuel), 20, 30);

        requestAnimationFrame(gameLoop);
    }
}

// Start the game
function startGame() {
    isGameRunning = true;
    fuel = 100;
    crashes = 0;
    gameLoop();
    playEngineSound();
}

// Handle car movement
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft" && carX > 0) {
        carX -= carSpeed;
    }
    if (event.key === "ArrowRight" && carX < canvas.width - carWidth) {
        carX += carSpeed;
    }
    if (event.key === "ArrowUp" && carY > 0) {
        carY -= carSpeed;
    }
    if (event.key === "ArrowDown" && carY < canvas.height - carHeight) {
        carY += carSpeed;
    }
});

// End the game
function endGame(message) {
    isGameRunning = false;
    alert(message);
    playCrashSound();
}

// Menu functions
function openCarOptions() {
    let carChoice = prompt("Choose your car: Lamborghini, Porsche, BMW, AMG");

    switch (carChoice.toLowerCase()) {
        case "lamborghini":
            carImage.src = "assets/images/lamborghini.png";
            break;
        case "porsche":
            carImage.src = "assets/images/porsche.png";
            break;
        case "bmw":
            carImage.src = "assets/images/bmw.png";
            break;
        case "amg":
            carImage.src = "assets/images/amg.png";
            break;
        default:
            alert("Invalid car choice. Defaulting to Lamborghini.");
            carImage.src = "assets/images/lamborghini.png";
    }
}

function viewHighScores() {
    alert("High Scores not implemented yet.");
}

// Sound effects functions
function playEngineSound() {
    engineSound.loop = true;
    engineSound.play();
}

function playCrashSound() {
    crashSound.play();
}

function playFuelSound() {
    fuelSound.play();
}
