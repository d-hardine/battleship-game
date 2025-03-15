import './styles.css'
import { player, enemy } from "./battleship"
import { createBoard, clickableBlocks } from './board-render.js'

//create player and enemy boards
createBoard(player)
createBoard(enemy)

//create clickable blocks inside boards
const playerBlocks = document.querySelectorAll('#player div')
const enemyBlocks = document.querySelectorAll('#enemy div')

let test = clickableBlocks(enemy, enemyBlocks, player, playerBlocks) //playerBlocks is inserted to make sure the enemy can attack the player blocks
console.log(test)

//hide the enemy's ship placement
enemyBlocks.forEach(enemyBlock => {
    enemyBlock.setAttribute('class', '')
    enemyBlock.classList.add('hidden')
})