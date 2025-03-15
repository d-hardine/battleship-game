const twoBoardContainer = document.querySelector('.two-boards-container')

//create boards
export function createBoard(user) {
    const gameBoardContainer = document.createElement('div')
    gameBoardContainer.classList.add('game-board')
    gameBoardContainer.id = user.name

    for(let i=0; i < 100; i++) {
        const block = document.createElement('div')
        if(user.GameBoard.boardInfo[i] == 'none')
            block.classList.add('none')
        else
            block.classList.add(user.GameBoard.boardInfo[i].name)
        block.id = i
        gameBoardContainer.appendChild(block)
    }

    twoBoardContainer.appendChild(gameBoardContainer)
}

//create clickable blocks
export function clickableBlocks(user, userBlocks, player, playerBlocks) {
    let clickedBlockArray = []
    let randomNumberArray = []
    let battleOver
    userBlocks.forEach(userBlocks => {
        userBlocks.addEventListener('click', () =>  {
            if(clickedBlockArray.includes(userBlocks.id)) //player will never attack the same location twice
                return
            clickedBlockArray.push(userBlocks.id)
            battleOver = user.GameBoard.receiveAttack(userBlocks.id)
            userBlocks.setAttribute('class', '')
            userBlocks.classList.add(user.GameBoard.boardInfo[userBlocks.id])

            //check if battle is over, no need for further attack
            if(battleOver) {
                return gameOver(battleOver)
            }
        
            //enemy attack to player
            let randomNumber = Math.floor(Math.random() * 100)

            while(randomNumberArray.includes(randomNumber)) //enemy will never attack the same location twice
                randomNumber = Math.floor(Math.random() * 100)
            randomNumberArray.push(randomNumber)

            player.GameBoard.receiveAttack(randomNumber)
            playerBlocks[randomNumber].setAttribute('class', '')
            playerBlocks[randomNumber].classList.add(player.GameBoard.boardInfo[randomNumber])
        })
    })
}

//create game over popup
function gameOver(winner) {
    console.log('kontol su')
    const overlay = document.querySelector('#overlay')
    const popup = document.querySelector('.popup')
    const winnerText = document.querySelector('.winner-text')

    overlay.classList.add('active')
    popup.classList.add('active')

    winnerText.textContent = winner
}