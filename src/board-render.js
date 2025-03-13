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
        //block.classList.add('none')
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

console.log(player.GameBoard.boardInfo)