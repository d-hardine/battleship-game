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

    shipPlacement(ship, x = Math.ceil(Math.random() * 10), y = Math.ceil(Math.random() * 10), isVertical = Math.random() < 0.5) { //position boolean: true is horizontal
        if(isVertical) { // concerning x coordinate, boolean true is vertical

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

            for(let i = x; i < x + ship.length; i++ )
                this.boardInfo[this.boardCoordinate.indexOf(`${i},${y}`)] = ship
            
        } else if(!isVertical){ // concerning y coordinate, boolean false is horizontal

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

            for(let i = y; i < y + ship.length; i++ )
                this.boardInfo[this.boardCoordinate.indexOf(`${x},${i}`)] = ship
        }
    }
    receiveAttack(index) {
        if(this.coordinateHistory.includes(index))
            return

        if(this.boardInfo[index] === 'none' || this.boardInfo[index] === 'missed') {
            this.boardInfo[index] = 'missed'
            this.coordinateHistory.push(index)
            console.log(`attack missed.`)
        } else {
            this.boardInfo[index].hitCompute()
            console.log(this.boardInfo[index])
            this.coordinateHistory.push(index)
            if(this.boardInfo[index].sunkCompute())
                console.log(`${this.boardInfo[index].name} is sunk`)
            this.boardInfo[index] = 'bullseye'
        }
        //all ships destroyed checker
        let enemyCheckerArray = []
        let playerCheckerArray = []
        for(let i=0; i < enemyShips.length; i++) {
            enemyCheckerArray[i] = enemyShips[i].isSunk
            playerCheckerArray[i] = ships[i].isSunk
        }
        let enemyChecker = enemyCheckerArray.every(check => check == true)
        let playerChecker = playerCheckerArray.every(check => check == true)

        if(enemyChecker) {
            return 'All of the enemy ships are destroyed.'
        }
        else if (playerChecker) {
            return 'All of your ships are destroyed.'
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