const player = document.getElementById("player")
let direction = null;
let x = 250;
let y = 550;

document.addEventListener('keydown', function(e) {
    if (e.repeat) return;

    if (e.key === 'ArrowLeft') {
        direction = 'west'
    }
    if (e.key === 'ArrowUp') {
        direction = 'north'
    }
    if (e.key === 'ArrowRight') {
        direction = 'east'
    }
    if (e.key === 'ArrowDown') {
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