export const greeting = 'Hello from battleship script'

class Ship {
    constructor(name, length) {
        this.name = name
        this.length = length
        this.totalHits = 0
        this.isSunk = false
    }

    hitCompute() {
        this.totalHits++
        this.sunkCompute()
    }

    sunkCompute() {
        this.isSunk = this.totalHits == this.length
        return this.isSunk
    }
}

const carrier = new Ship('carrier', 5)
const battleship = new Ship('battleship', 4)
const destroyer = new Ship('destroyer', 3)
const submarine = new Ship('submarine', 3)
const patrolBoat = new Ship('patrolBoat', 2)
const ships = [carrier, battleship, destroyer, submarine, patrolBoat]

const enemyCarrier = new Ship('carrier', 5)
const enemyBattleship = new Ship('battleship', 4)
const enemyDestroyer = new Ship('destroyer', 3)
const enemySubmarine = new Ship('submarine', 3)
const enemyPatrolBoat = new Ship('patrolBoat', 2)
const enemyShips = [enemyCarrier, enemyBattleship, enemyDestroyer, enemySubmarine, enemyPatrolBoat]

class GameBoard {
    constructor() {
        this.boardCoordinate = []
        for(let i = 1; i <= 10; i++) 
            for(let j = 1; j <= 10; j++) 
                this.boardCoordinate.push(`${i},${j}`)            
        
        this.boardInfo = []
        for(let i = 0; i < 100; i++)
            this.boardInfo.push('none')

        this.coordinateHistory = []
    }

    shipPlacement(ship, x = Math.ceil(Math.random() * 10), y = Math.ceil(Math.random() * 10), isHorizontal = Math.random() < 0.5) { //position boolean: true is horizontal
        console.log(ship.name, x ,y, isHorizontal)
        if(isHorizontal) { // concerning x coordinate, boolean true is horizontal

            //check validity
            if(x <= 10 - ship.length)
                x = x
            else
                x = 10 - ship.length + 1

            //check the coordinate is taken or not
            for(let i = x; i < x + ship.length; i++ ) {
                if(this.boardInfo[this.boardCoordinate.indexOf(`${i},${y}`)] !== 'none') {
                    return this.shipPlacement(ship)
                }
            }

            for(let i = x; i < x + ship.length; i++ ) {
                console.log(i,y)
                this.boardInfo[this.boardCoordinate.indexOf(`${i},${y}`)] = ship
            }
        } else if(!isHorizontal){ // concerning y coordinate, boolean false is vertical

            //check validity
            if(y <= 10 - ship.length)
                y = y
            else
                y = 10 - ship.length + 1

            //check the coordinate is taken or not
            for(let i = y; i < y + ship.length; i++ ) {
                if(this.boardInfo[this.boardCoordinate.indexOf(`${x},${i}`)] !== 'none') {
                    return this.shipPlacement(ship)
                }
            }

            for(let i = y; i < y + ship.length; i++ ) {
                console.log(x,i)
                this.boardInfo[this.boardCoordinate.indexOf(`${x},${i}`)] = ship
            }
        }
    }
    receiveAttack(x, y) {
        const attackCoordinate = this.boardCoordinate.indexOf(`${x},${y}`)
        if(this.coordinateHistory.includes(attackCoordinate))
            return `attack at coordinate "${x},${y}" has been done, please pick another coordinate`

        if(this.boardInfo[attackCoordinate] === 'none') {
            this.boardInfo[attackCoordinate] = 'missed'
            this.coordinateHistory.push(attackCoordinate)
            console.log(this.boardInfo)
        } else {
            this.boardInfo[attackCoordinate].hitCompute()
            console.log(this.boardInfo[attackCoordinate])
            console.log(this.boardInfo)
            this.coordinateHistory.push(attackCoordinate)
            if(this.boardInfo[attackCoordinate].sunkCompute())
                console.log(`${this.boardInfo[attackCoordinate].name} is sunk`)
        }
        //all ships destroyed checker
        const checker = ships.every(ship => ship.sunkCompute())
        if(checker) {
            console.log('all ships are destroyed')
        }
    }
}

class Player {
    constructor(name) {
        this.name = name
        this.GameBoard = new GameBoard()
    }

    randomizedShipsPlacement() {
        if(this.name == 'enemy') {
            enemyShips.forEach(enemyShip => this.GameBoard.shipPlacement(enemyShip))
        } else {
            ships.forEach(ship => this.GameBoard.shipPlacement(ship))
        }
    }
}

export const player = new Player('player')
export const enemy = new Player('enemy')

player.randomizedShipsPlacement()
enemy.randomizedShipsPlacement()