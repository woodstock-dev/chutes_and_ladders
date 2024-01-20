import { Board } from './board.js';
import { Avatar, Color } from './avatar.js';
import { Space, SpaceType } from './space.js';
import { RangeSelector } from './range.js';
import { Die } from './die.js';
import { rollDice } from './utils.js';

/**
 * SEPERATE PLAYER AND AVATAR
 */

const TOTAL_SPACES = 100;
const START = 1;
const ROWS = Math.ceil(TOTAL_SPACES / Math.sqrt(TOTAL_SPACES));
const MAX_SPECIAL_DISTANCE = 40;
const DIE = new Die(6);
const MAX_PLAYERS = 4;
const MIN_PLAYERS = 2;
let uniqueSpecialValues = new Set();
let startSpace;
let uniqueSpecialValuesDump = new Set();
let specials = [];
let chuteCount = 0;
let ladderCount = 0;

const spaceMaker = (indexOfSpace) => {
	let space = new Space(SpaceType.NORMAL, indexOfSpace);
	if (indexOfSpace === TOTAL_SPACES)
		space = new Space(SpaceType.FINISH, 'Finish');
	if (indexOfSpace === START) {
		space = new Space(SpaceType.START, 'Start');
		startSpace = space;
	}
	if (checkIfSpecialSpace(indexOfSpace)) {
		space = specialSpaceSelector(indexOfSpace);
		specials.push([space, indexOfSpace]);
	}
	return space;
};

function checkIfSpecialSpace(indexOfSpace) {
	return uniqueSpecialValues.has(indexOfSpace);
}

function specialSpaceSelector(indexOfSpace) {
	let type;
	let row = rowFinder(indexOfSpace);
	if (chuteCount === ladderCount || row === ROWS - 1) {
		type = SpaceType.CHUTE;
		chuteCount++;
	} else {
		type = SpaceType.LADDER;
		ladderCount++;
	}
	return new Space(type, indexOfSpace);
}

function minSpecialRangeValue() {
	return (ROWS - 1) ** 2 + 2;
}

const connectSpecials = () => {
	let dummyNode = null;
	let indexOfSpace = undefined;

	for (let i = 0; i < specials.length; i++) {
		[dummyNode, indexOfSpace] = specials[i];
		dummyNode.type === SpaceType.CHUTE
			? (dummyNode.special = _connectChute(dummyNode, indexOfSpace))
			: (dummyNode.special = _connectLadder(dummyNode, indexOfSpace));
	}
};

function _connectChute(dummyNode, indexOfSpace) {
	const maxValForRand =
		indexOfSpace > MAX_SPECIAL_DISTANCE ? MAX_SPECIAL_DISTANCE : indexOfSpace;
	const minDist = indexOfSpace % ROWS === 0 ? 1 : indexOfSpace % ROWS;
	let cDistanceToTraverse = new RangeSelector(minDist, maxValForRand).random;
	let space = indexOfSpace - cDistanceToTraverse;
	if (!specialDumpValueChecker(space)) {
		while (cDistanceToTraverse > 0) {
			dummyNode = dummyNode.previous;
			cDistanceToTraverse--;
		}
	} else return _connectChute(dummyNode, indexOfSpace);

	return dummyNode;
}

function _connectLadder(dummyNode, indexOfSpace) {
	const maxValForRand =
		TOTAL_SPACES - indexOfSpace > MAX_SPECIAL_DISTANCE
			? MAX_SPECIAL_DISTANCE
			: TOTAL_SPACES - indexOfSpace;
	const minDist = ROWS - (indexOfSpace % ROWS) + 1;
	let lDistanceToTraverse = new RangeSelector(minDist, maxValForRand).random;
	let space = indexOfSpace + lDistanceToTraverse;
	if (!specialDumpValueChecker(space)) {
		while (lDistanceToTraverse > 0) {
			dummyNode = dummyNode.next;
			lDistanceToTraverse--;
		}
	} else return _connectLadder(dummyNode, indexOfSpace);

	return dummyNode;
}

function specialDumpValueChecker(space) {
	uniqueSpecialValuesDump.add(space);
	return uniqueSpecialValues.has(uniqueSpecialValuesDump);
}

function rowFinder(indexOfSpace) {
	return Math.floor(indexOfSpace / ROWS);
}

function resortPlayerOrderInPlayersArray(playersArray) {
	return playersArray.sort((a, b) => {
		return a.playerOrder - b.playerOrder;
	});
}

export { uniqueSpecialValues, TOTAL_SPACES, spaceMaker, startSpace };

export class ChutesAndLadders {
	/**
	 *
	 * @param {Number} chutes number of chutes
	 * @param {Number} ladders number of ladders
	 */

	constructor(chutes, ladders) {
		this.CHUTES = chutes;
		this.LADDERS = ladders;
		this.makeGameBoard();
		// this.playerNoAvatar = undefined;
		this.playersArray = [];
		this.colorList = Color;
		this.currentPlayer = 0;
		this.playerInTurn = undefined;
		this.readyToPlay = false;
		this.haveWinner = false;
		this.avatarList = [
			{ id: 0, name: '' },
			{ id: 1, name: 'XENOMORPH' },
			{ id: 2, name: 'PREDATOR' },
			{ id: 3, name: 'TERMINATOR' },
			{ id: 4, name: 'ROBOCOP' },
		];
	}

	/**
	 * makes calls in order to make the game, link the spaces and set the startspace
	 */

	get startSpace() {
		return startSpace;
	}

	makeGameBoard() {
		return new Board(
			TOTAL_SPACES,
			spaceMaker,
			this.specialValuesMaker,
			connectSpecials
		);
	}

	displayGameBoard() {
		let space = startSpace;
		let gameBoard = [];
		let row = [];
		let indexOfSpace = 1;
		while (space) {
			let rowCount = rowFinder(indexOfSpace);
			row.push(space);
			if (row.length === ROWS) {
				row = rowCount % 2 !== 0 ? row : row.reverse();
				gameBoard.push(row);
				row = [];
			}
			indexOfSpace++;
			space = space.next;
		}
		return gameBoard.reverse();
	}

	specialValuesMaker = (min = minSpecialRangeValue(), max = TOTAL_SPACES) => {
		if (uniqueSpecialValues.size >= this.CHUTES + this.LADDERS) return;
		const specialValue = new RangeSelector(min, max).random;
		if (uniqueSpecialValues.has(specialValue))
			this.specialValuesMaker(min, max);
		else {
			uniqueSpecialValues.add(specialValue);
			this.specialValuesMaker(min - (ROWS - 1), max - (ROWS - 1));
		}
		return uniqueSpecialValues;
	};

	// registerPlayer(name) {
	// if (!name) {
	// alert('CANNOT ENTER BLANK NAME');
	// return;
	// }
	// const player = new Player(name);
	// this.playerNoAvatar = player;
	// this.generatePlayerOrder(player);
	// return player;
	// }
	//
	// generatePlayerOrder(player) {
	// const unshiftOrPush = generateRandomNumber(2);
	// if (unshiftOrPush === 1) this.playersArray.push(player);
	// if (unshiftOrPush === 2) this.playersArray.unshift(player);
	// }

	registerAvatar(player, avatar, color) {
		// if (!this.playerNoAvatar) alert('PLEASE REGISTER PLAYER FIRST');
		// else {
		player.avatar = new Avatar(avatar, color);
		this.playersArray.push(player);
		// }
	}

	verifyReadyToPlay() {
		return (this.readyToPlay =
			this.playersArray.length >= MIN_PLAYERS &&
			this.playersArray.length <= MAX_PLAYERS &&
			this.haveWinner === false
				? true
				: false);
	}

	setOrderAndStart() {
		if (this.verifyReadyToPlay()) {
			this.playersArray.forEach((player, idx) => {
				player.playerOrder = idx + 1;
				this.startSpace.land(player.avatar);
			});
			this.playerInTurn = this.playersArray[this.currentPlayer];
		}
	}

	takeTurn() {
		const moveDist = rollDice(DIE);
		this.playerInTurn.avatar.move(moveDist);
		if (this.wonGame(this.playerInTurn.avatar.location.type)) {
			this.haveWinner = true;
			return alert(`CONGRADULATIONS ${this.playerInTurn.name}... YOU WON!!!!`);
		} else {
			this.playerInTurn = this.rotatePlayers();
		}
	}

	rotatePlayers() {
		this.currentPlayer++;
		if (this.currentPlayer === this.playersArray.length) this.currentPlayer = 0;
		return this.playersArray[this.currentPlayer];
	}

	wonGame(locationType) {
		return locationType === SpaceType.FINISH;
	}
	reset() {
		uniqueSpecialValues.clear();
		uniqueSpecialValuesDump.clear();
		this.makeGameBoard();
		this.playersArray.forEach((player) => {
			player.avatar.location.leave();
			this.startSpace.land(player.avatar);
		});
		this.readyToPlay = false;
		this.haveWinner = false;
		this.currentPlayer = 0;
		resortPlayerOrderInPlayersArray(this.playersArray);
		return this.displayGameBoard();
	}
}
