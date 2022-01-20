// Create player

const player = document.getElementById("player")
let direction = null;
let x = 470;
let y = 400;

// Add movement to player

document.addEventListener('keydown', function(e) {
    if (e.repeat) return;

    if (e.key === 'ArrowLeft' && direction !== 'east') {
        direction = 'west'
    }
    if (e.key === 'ArrowUp' && direction !== 'south') {
        direction = 'north'
    }
    if (e.key === 'ArrowRight' && direction !== 'west') {
        direction = 'east'
    }
    if (e.key === 'ArrowDown' && direction !== 'north') {
        direction = 'south'
    }
})

setInterval(function() {
    if (direction === 'west') {
        x = x - 1
    }
    if (direction === 'north') {
        y = y + 1
    }
    if (direction === 'east') {
        x = x + 1
    }
    if (direction === 'south') {
        y = y - 1
    }
    player.style.left = x + "px"
    player.style.bottom = y + "px"
    detectCollision()
}, 8)

// Place consumable piece in random spot within play area
const consumable = document.getElementById("consumable")

cX = 0
cY = 0

function placeConsumable() {
    // https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range/1527834
    //keeps random number in set range by utilizing the max and min possible settings
    cX = (Math.random() * (735 - 195) + 195)
    consumable.style.left = cX + "px"
    cY = (Math.random() * (670 - 130) + 130)
    consumable.style.bottom = cY + "px"
}

placeConsumable()

// Detect collision with consumable and player pieces
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection Checks for colloision using each piece's left position (cX and x), bottom position (cY and y), and width/height(20) to determine if they would touch.
function detectCollision() {
    if (cX < x + 20 &&
        cX + 20 > x &&
        cY < y + 20 &&
        cY + 20 > y) {
            placeConsumable()
        }
}