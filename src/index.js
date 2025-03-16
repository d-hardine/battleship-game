import './styles.css'
import { player, enemy, ships } from "./battleship.js"
import { createBoard, clickableBlocks } from './board-render.js'

//create player boards
createBoard(player)

//create player clickable blocks inside boards
let playerBlocks = document.querySelectorAll('#player div')

//rotation buttons and logic
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
    if(angleCarrier == 0) {
        angleCarrier = 90
        sideBarCarrier.classList.remove('vertical')
        sideBarCarrier.classList.add('horizontal')
    }
    else {
        angleCarrier = 0
        sideBarCarrier.classList.remove('horizontal')
        sideBarCarrier.classList.add('vertical')
    }
    sideBarCarrier.style.transform = `rotate(${angleCarrier}deg)`
})

rotateBtnBattleship.addEventListener('click', function() {
    if(angleBattleship == 0) {
        angleBattleship = 90
        sideBarBattleship.classList.remove('vertical')
        sideBarBattleship.classList.add('horizontal')
    }
    else {
        angleBattleship = 0
        sideBarBattleship.classList.remove('horizontal')
        sideBarBattleship.classList.add('vertical')
    }
    sideBarBattleship.style.transform = `rotate(${angleBattleship}deg)`
})

rotateBtnDestroyer.addEventListener('click', function() {
    if(angleDestroyer == 0) {
        angleDestroyer = 90
        sideBarDestroyer.classList.remove('vertical')
        sideBarDestroyer.classList.add('horizontal')
    }
    else {
        angleDestroyer = 0
        sideBarDestroyer.classList.remove('horizontal')
        sideBarDestroyer.classList.add('vertical')
    }
    sideBarDestroyer.style.transform = `rotate(${angleDestroyer}deg)`
})

rotateBtnSubmarine.addEventListener('click', function() {
    if(angleSubmarine == 0) {
        angleSubmarine = 90
        sideBarSubmarine.classList.remove('vertical')
        sideBarSubmarine.classList.add('horizontal')
    }
    else {
        angleSubmarine = 0
        sideBarSubmarine.classList.remove('horizontal')
        sideBarSubmarine.classList.add('vertical')
    }
    sideBarSubmarine.style.transform = `rotate(${angleSubmarine}deg)`
})

rotateBtnPatrolBoat.addEventListener('click', function() {
    if(anglePatrolBoat == 0) {
        anglePatrolBoat = 90
        sideBarPatrolBoat.classList.remove('vertical')
        sideBarPatrolBoat.classList.add('horizontal')
    }
    else {
        anglePatrolBoat = 0
        sideBarPatrolBoat.classList.remove('horizontal')
        sideBarPatrolBoat.classList.add('vertical')
    }
    sideBarPatrolBoat.style.transform = `rotate(${anglePatrolBoat}deg)`
})

//drag and drop ship placement
const sideBarShips = document.querySelectorAll('.ship') //this is the side bar ship blocks
let beingDragged

//drag logic
sideBarShips.forEach(ship => {
    ship.addEventListener('dragstart', dragStat)
})

function dragStat(e) {
    beingDragged = e.target
    console.log(`dragging has started on ${beingDragged.id}`)
}

//drop logic
let placementCounter = 5
playerBlocks.forEach(block => {
    block.addEventListener('dragover', (e) => e.preventDefault()) //to disable default browser setting, and enable drag and drop
    //block.addEventListener('dragenter', dragEnter)
    //block.addEventListener('dragleave', dragLeave)
    block.addEventListener('drop', dragDrop)
})

function dragDrop(e) {
    console.log(`you have dropped ${beingDragged.id} into ${e.target.id}`)
    const droppedShip = ships[beingDragged.id]
    const droppedCoordinate = player.GameBoard.boardCoordinate[e.target.id].split(',')
    const x = Number(droppedCoordinate[0])
    const y = Number(droppedCoordinate[1])
    const position = beingDragged.classList.contains('vertical')
    player.GameBoard.shipPlacement(droppedShip, x, y, position)

    document.querySelector('.board-container').remove() //delete whole player board, also remove the drag-and-drop capabilities on player blocks
    createBoard(player)
    beingDragged.draggable = false

    //make the blocks drag-and-droppable again
    playerBlocks = document.querySelectorAll('#player div')

    playerBlocks.forEach(block => {
        block.addEventListener('dragover', (e) => e.preventDefault()) //to disable default browser setting, and enable drag and drop
        block.addEventListener('drop', dragDrop)
    })

    placementCounter -= 1
}

//bottom buttons logic
const playBtn = document.querySelector('.play-btn')
playBtn.addEventListener('click', () => {
    if(placementCounter !== 0)
        alert('Place all of the ships on the board.')
    else {
        //create player boards
        createBoard(enemy)
        //create enemy clickable blocks inside boards
        let enemyBlocks = document.querySelectorAll('#enemy div')
 
        clickableBlocks(enemy, enemyBlocks, player, playerBlocks) //playerBlocks is inserted to make sure the enemy can attack the player blocks

        //hide the enemy's ship placement
        enemyBlocks.forEach(enemyBlock => {
        enemyBlock.setAttribute('class', '')
        enemyBlock.classList.add('hidden')
        })
        playBtn.disabled = true
        randomizePlacementbtn.disabled = true
    }
})

const randomizePlacementbtn = document.querySelector('.randomize-btn')
/*randomizePlacementbtn.addEventListener('click', () => {
    document.querySelector('.board-container').remove() //delete whole player board, also remove the drag-and-drop capabilities on player blocks
    player.randomizedShipsPlacement()
    createBoard(player)

    playerBlocks.forEach(block => {
        block.addEventListener('dragover', (e) => e.preventDefault()) //to disable default browser setting, and enable drag and drop
        block.addEventListener('drop', dragDrop)
    })

    placementCounter = 0
    sideBarCarrier.draggable = false
    sideBarBattleship.draggable = false
    sideBarDestroyer.draggable = false
    sideBarPatrolBoat.draggable = false
    sideBarSubmarine.draggable = false
})*/