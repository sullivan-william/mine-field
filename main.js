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
}, 1)

// Place consumable piece in random spot within play area

function placeConsumable() {
    let consumable = document.getElementById("consumable")
    // https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range/1527834
    //keeps random number in set range by utilizing the max and min possible settings
    consumable.style.left = (Math.random() * (45.9 - 12.2) + 12.2) + "em"
    consumable.style.bottom = (Math.random() * (41.8 - 8.2) + 8.2) + "em"
}

placeConsumable()