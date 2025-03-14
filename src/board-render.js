export const jancok = 'board render cok'

//////////////////////////
import { player, enemy } from "./battleship"
const twoBoardContainer = document.querySelector('.two-boards-container')

//create boards
function createBoard(user) {
    const gameBoardContainer = document.createElement('div')
    gameBoardContainer.classList.add('game-board')
    gameBoardContainer.style.backgroundColor = '#dde5b6'
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

createBoard(player)
createBoard(enemy)

//create clickable blocks
const playerBlocks = document.querySelectorAll('#player div')
const enemyBlocks = document.querySelectorAll('#enemy div')

function clickableBlocks(user, userBlocks) {
    let randomNumberArray = []
    userBlocks.forEach(userBlocks => {
        userBlocks.addEventListener('click', () =>  {
            user.GameBoard.receiveAttack(userBlocks.id)
            userBlocks.setAttribute('class', '')
            userBlocks.classList.add(user.GameBoard.boardInfo[userBlocks.id])
        
            //enemy attack to player
            let randomNumber = Math.floor(Math.random() * 100)

            while(randomNumberArray.includes(randomNumber)) //enemy will never attack the same location twice
                randomNumber = Math.floor(Math.random() * 100)
            randomNumberArray.push(randomNumber)

            console.log('enemy attack:', randomNumberArray)
            player.GameBoard.receiveAttack(randomNumber)
            playerBlocks[randomNumber].setAttribute('class', '')
            playerBlocks[randomNumber].classList.add(player.GameBoard.boardInfo[randomNumber])
        })
    })
}

clickableBlocks(player, playerBlocks)
clickableBlocks(enemy, enemyBlocks)