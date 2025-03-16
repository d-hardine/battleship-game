import './styles.css'
import { player, enemy } from "./battleship"
import { createBoard, clickableBlocks } from './board-render.js'

//create player and enemy boards
createBoard(player)
createBoard(enemy)

//create clickable blocks inside boards
const playerBlocks = document.querySelectorAll('#player div')
const enemyBlocks = document.querySelectorAll('#enemy div')

//clickableBlocks(enemy, enemyBlocks, player, playerBlocks) //playerBlocks is inserted to make sure the enemy can attack the player blocks

//hide the enemy's ship placement
/*enemyBlocks.forEach(enemyBlock => {
    enemyBlock.setAttribute('class', '')
    enemyBlock.classList.add('hidden')
})*/

//rotation
const rotateBtnCarrier = document.querySelector('.rotate-btn-carrier')
const rotateBtnBattleship = document.querySelector('.rotate-btn-battleship')
const rotateBtnDestroyer = document.querySelector('.rotate-btn-destroyer')
const rotateBtnSubmarine = document.querySelector('.rotate-btn-submarine')
const rotateBtnPatrolBoat = document.querySelector('.rotate-btn-patrol-boat')

const sideBarCarrier = document.querySelector('.sidebar-carrier')
const sideBarBattleship = document.querySelector('.sidebar-battleship')
const sideBarDestroyer = document.querySelector('.sidebar-destroyer')
const sideBarSubmarine = document.querySelector('.sidebar-submarine')
const sideBarPatrolBoat = document.querySelector('.sidebar-patrol-boat')

let angleCarrier = 90
let angleBattleship = 90
let angleDestroyer = 90
let angleSubmarine = 90
let anglePatrolBoat = 90

rotateBtnCarrier.addEventListener('click', function() {
    if(angleCarrier == 0)
        angleCarrier = 90
    else
    angleCarrier = 0
    sideBarCarrier.style.transform = `rotate(${angleCarrier}deg)`
})

rotateBtnBattleship.addEventListener('click', function() {
    if(angleBattleship == 0)
        angleBattleship = 90
    else
        angleBattleship = 0
    sideBarBattleship.style.transform = `rotate(${angleBattleship}deg)`
})

rotateBtnDestroyer.addEventListener('click', function() {
    if(angleDestroyer == 0)
        angleDestroyer = 90
    else
        angleDestroyer = 0
    sideBarDestroyer.style.transform = `rotate(${angleDestroyer}deg)`
})

rotateBtnSubmarine.addEventListener('click', function() {
    if(angleSubmarine == 0)
        angleSubmarine = 90
    else
        angleSubmarine = 0
    sideBarSubmarine.style.transform = `rotate(${angleSubmarine}deg)`
})

rotateBtnPatrolBoat.addEventListener('click', function() {
    if(anglePatrolBoat == 0)
        anglePatrolBoat = 90
    else
        anglePatrolBoat = 0
    sideBarPatrolBoat.style.transform = `rotate(${anglePatrolBoat}deg)`
})