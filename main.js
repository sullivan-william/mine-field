// Create player

console.log(screen.availWidth)
console.log(screen.availHeight)

const player = document.getElementById("player")
let direction = null
let x = 270
let y = -250
speed = 4
score = 0
highScore = 0
gameOver = false

// Increase speed as score gets higher

// Consumable variables

const consumable = document.getElementById("consumable")
cX = 0
cY = 0

// Mine variables

mineLocX = []
mineLocY = []
mX = 0
mY = 0
z = 20 // used to adjust the x-axis position for each new mine added

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

document.addEventListener('keyup', function(e) {
    direction = null
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

    if (gameOver === true) {
        // Reset player position
        x = 270
        y = -250
        direction = null 
        console.log("Game Over!")

        // remove mines
        playArea = document.getElementById("play-area").getElementsByTagName("div")
        len = playArea.length
        z = 20
        mineLocX = []
        mineLocY = []

        // https://stackoverflow.com/questions/4777077/removing-elements-by-class-name showed me how to sort through a div and remove all instances of a class

        for (i = 0; i < len; i++) {
            if(playArea[i].className.toLowerCase() == "mine") {
                playArea[i].parentNode.removeChild(playArea[i])
            }
        }

        // https://stackoverflow.com/questions/29370017/adding-a-high-score-to-local-storage
        if(highScore !== null) {
            if(score > highScore) {
                localStorage.setItem('highScore', score)
                highScore = localStorage.getItem("highScore")
                document.getElementById("high-score").innerHTML = `High Score: ${highScore}`
            }
        } else {
            localStorage.setItem("highScore", score)
            highScore = localStorage.getItem("highScore")
            document.getElementById("high-score").innerHTML = `High Score: ${highScore}`
        }

        gameOver = false
        score = 0
    }
    player.style.left = x + "px"
    player.style.bottom = y + "px"
    eatConsumable()
    endGame()
}, speed)


// Place consumable piece in random spot within play area

function placeConsumable() {
    // https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range/1527834
    //keeps random number in set range by utilizing the max and min possible settings
    cX = (Math.random() * (540) - 20)
    consumable.style.left = cX + "px"
    cY = (Math.random() * (540) - 540)
    consumable.style.bottom = cY + "px"
    // Prevents first placement from being on top of player piece
    if (x > cX &&
        x < cX + 40 &&
        y < cY + 20 &&
        y > cY - 20) {
            placeConsumable()
        }
    // Prevents placement on top of mine
    for (i = 0; i < mineLocX.length; i++) {
        m = i * 20
        // m is to counteract the z measurment throwing off the left postion reading (this is getting complicated!)
        if (cX > mineLocX[i] + m &&
            cX < mineLocX[i] + 40 + m &&
            cY < mineLocY[i] + 20 &&
            cY > mineLocY[i] - 20) {
                placeConsumable()
            }
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
            document.getElementById("score").innerHTML = `Score: ${score}`

            placeConsumable()

            z = z + 20 // make sure mine placement stays within play area (only works for up to 24 mines on desktop screen size)
            placeMine()
        }
    }

// Place mines randomly on the board and keep track of their locations for collison detection

function placeMine() {
    if (score < 210) {
    mine = document.createElement("div")
    mine.setAttribute("class", "mine")
    document.getElementById("play-area").appendChild(mine)
    mX = (Math.random() * (540) - z)
    mineLocX.push(mX)
    mine.style.left = mX + "px"
    mY = (Math.random() * (540) - 540)
    mineLocY.push(mY)
    mine.style.bottom = mY + "px"
    // make sure initial placement is not on top of player
    } else {
        return
    }
}

// Detect collision with border of play area or mines
function endGame() {
    // Collision with border?
    if (x < 0 ||
        x > 540 ||
        y > 0 ||
        y < -540) {
            gameOver = true
        }
    // Collision with mine?
    for (i = 0; i < mineLocX.length; i++) {
        m = i * 20
        // m is to counteract the z measurment throwing off the left postion reading (this is getting complicated!)
        if (x > mineLocX[i] + 20 + m &&
            x < mineLocX[i] + 60 + m &&
            y < mineLocY[i] + 20 &&
            y > mineLocY[i] - 20) {
                gameOver = true
            }
    }
}

// localStorage.clear()