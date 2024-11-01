const startGameBTN = document.querySelector('.btn')
const introPage = document.querySelector('.intro')
const gamePage = document.querySelector('.container')
const mario = document.querySelector('.mario')
let timer = 0
let x = 50
let y = 250
let moving = false
let jumping = false
let score = 0
let killedEnemiess = 0
mario.style.left = x + 'px'
mario.style.bottom = y + 'px'
startGameBTN.addEventListener('click', function () {
    introPage.classList.add("animate__animated");
    introPage.classList.add('animate__fadeOut')

    setTimeout(() => {
        gamePage.classList.add("animate__animated");
        gamePage.classList.add("show");
        gamePage.classList.add("animate__fadeIn")
    }, 1000);

})
function updateScores(points) {
score += points
document.getElementById('scores').innerText = "Scores:" + " " + score;
}
updateScores(2)

function numberOfKilledEnemies(killedPoints) {
killedEnemiess += killedPoints
document.getElementById("killdEnemies").innerText = "Killed Enemies:" + " " + killedEnemiess;
}
numberOfKilledEnemies(1)

function walk(step) {
    x += step
    mario.style.left = x + 'px'
    console.log(x);
}
const keyState = {
    left: false,
    right: false,
    up: false
}
document.body.addEventListener("keydown", function (event) {
   
    console.log(timer);
    switch (event.key) {
        case "ArrowRight":
            keyState.right = true
            break;
        case "ArrowLeft":
            keyState.left = true
            break;
        case "ArrowUp":
        case " ":
            keyState.up = true
        default:
            break;
    }



    // document.body.addEventListener("keydown", function (event) {
    //     timer++
    //     console.log(timer);
    //     switch (event.key) {
    //         case "ArrowRight":
    //             mario.classList.remove('flip')
    //             if (timer > 5) {
    //                 if (!moving) {
    //                     mario.src = 'assets/walking.gif'
    //                     mario.style.width = "60px";
    //                   mario.style.height = "129px";
    //                     moving = true
    //                 }
    //                 walk(5)
    //             }
    //             console.log('right');
    //             break;
    //         case "ArrowLeft":
    //             console.log("left");
    //             mario.classList.add('flip')
    //             if (timer > 5) {
    //                 if (!moving) {
    //                     mario.src = 'assets/walking.gif'
    //                     mario.style.width = "60px";
    //                   mario.style.height = "129px";
    //                     moving = true
    //                 }
    //                 walk(-5)
    //             }
    //             break;
    //         case "ArrowUp":
    //         case " ":
    //             if (!jumping) {
    //                 jumping = true
    //                 mario.src = 'assets/jumping.gif'
    //    mario.style.bottom = y + 100 + 'px'
    //    setTimeout(() => {
    //        mario.style.bottom = y + 'px'
    //        setTimeout(() => {
    //         jumping = false
    //         resetPose()

    //     }, 250);
    //    }, 400);
    //             }
    //             console.log("Jump");
    //             break;
    //         default:
    //             break;
    //     }



});
document.body.addEventListener("keyup", function (event) {
    switch (event.key) {
        case "ArrowRight":
            keyState.right = false
            resetPose()
            break;
        case "ArrowLeft":
            keyState.left = false
            resetPose()
            break;

        default:
            break;
    }

    keyState.right = false
    keyState.left = false
});

// document.body.addEventListener("keyup", function (event) {
//     if (moving && !jumping) {
//       resetPose()
//     }
// timer = 0
// });
function updatePosi() {
    timer++
    if (keyState.left && keyState.up) {
        jumpPose()
        mario.classList.add('flip')
        walk(-8)
        if (!jumping) {
            jumping = true
            jumpPose()
            mario.style.bottom = y + 100 + 'px'
            setTimeout(() => {
                mario.style.bottom = y + 'px'
                setTimeout(() => {
                    jumping = false
                    keyState.up = false
                    resetPose()

                }, 250);
            }, 400);
        }
        console.log("Jump");
    }
    else if (keyState.right && keyState.up) {
        mario.classList.remove('flip')
        walk(8)
        if (!jumping) {
            jumping = true

            mario.style.bottom = y + 100 + 'px'
            setTimeout(() => {
                mario.style.bottom = y + 'px'
                setTimeout(() => {
                    jumping = false
                    keyState.up = false
                    resetPose()

                }, 250);
            }, 400);
        }
        console.log("Jump");
    }
    else if (keyState.right) {
        mario.classList.remove('flip')
        if (timer > 1) {
            if (!moving) {
                mario.src = 'assets/walking.gif'
                mario.style.width = "60px";
                mario.style.height = "129px";
                moving = true
            }
            walk(5)
        }
        console.log('right');
    } else if (keyState.left) {
        mario.classList.add('flip')
        if (timer > 1) {
            if (!moving) {
                mario.src = 'assets/walking.gif'
                mario.style.width = "60px";
                mario.style.height = "129px";
                moving = true
            }
            walk(-5)
        }
        console.log('left');
    } else if (keyState.up) {
        if (!jumping) {
            jumpPose()
            jumping = true
            mario.src = 'assets/jumping.gif'
            mario.style.bottom = y + 100 + 'px'
            setTimeout(() => {
                mario.style.bottom = y + 'px'
                setTimeout(() => {
                    jumping = false
                    keyState.up = false
                    resetPose()

                }, 250);
            }, 400);
        }
        console.log("Jump");
    } else {
        resetPose()
    }
    console.log(1);

    requestAnimationFrame(updatePosi)
}
requestAnimationFrame(updatePosi)
function resetPose() {
    mario.src = 'assets/standing.gif'
    mario.style.width = '80px'
    mario.style.height = '132px'
    moving = false
}
function jumpPose() {
    mario.src = 'assets/jumping.gif'
    mario.style.width = '80px'
    mario.style.height = '132px'

}

function checkCollision(x, y) {
    let m = y.getBoundingClientRect();
    let w = x.getBoundingClientRect();
    console.log("mario Top " + m.top);
    console.log("wall Bottom " + w.bottom);
  
    // return w.left < m.right && w.bottom < m.top;
    if (w.left < m.right && w.right > m.left) {
      if (w.bottom < m.top) {
        return true;
      } else {
        return false;
      }
    }
  }

