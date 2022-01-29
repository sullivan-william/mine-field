// Create player

const player = document.getElementById("player")
let direction = null;
let x = 270; 
let y = -250;
score = 0

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

// document.addEventListener('keyup', function(e) {
//     direction = null
// })

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
    eatConsumable()
    endGame()
}, 1)


// Place consumable piece in random spot within play area
const consumable = document.getElementById("consumable")

cX = 0
cY = 0

function placeConsumable() {
    // https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range/1527834
    //keeps random number in set range by utilizing the max and min possible settings
    cX = (Math.random() * (520 + 20) - 20)
    consumable.style.left = cX + "px"
    cY = (Math.random() * (0 + 540) - 540)
    consumable.style.bottom = cY + "px"
    // Prevents first placement from being on top of player piece
    if (x > cX &&
        x < cX + 40 &&
        y < cY + 20 &&
        y > cY - 20) {
            placeConsumable()
        }
}

placeConsumable()

// Detect collision with consumable and player pieces
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection Checks for colloision using each piece's left position (cX and x), bottom position (cY and y), and width/height(20) to determine if they would touch.
function eatConsumable() {
    if (x > cX &&
        x < cX + 40 &&
        y < cY + 20 &&
        y > cY - 20) {
            score = score + 10
            placeConsumable()
            document.getElementById("score").innerHTML = `Score: ${score}`
        }
    }

// Detect collision with border of play area or player piece with player body
function endGame() {
    if (x < 0 ||
        x > 540 ||
        y > 0 ||
        y < -540) {
            player.style.visibility = "hidden"
            console.log("Game Over!")
        }
}