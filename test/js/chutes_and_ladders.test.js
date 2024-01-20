import {
	ChutesAndLadders,
	uniqueSpecialValues,
	startSpace,
} from '../../src/js/model/chutes_and_ladders';
import { Space, SpaceType } from '../../src/js/model/space';
import { Die } from '../../src/js/model/die';
import { Player } from '../../src/js/model/player';

let game, avatar1, avatar2, cur, die, rollValue, player1, player2;

beforeEach(() => {
	game = new ChutesAndLadders(5, 5);

	player1 = new Player('Player1');
	game.registerAvatar(player1, game.avatarList[1].name, game.colorList[1]);

	player2 = new Player('Player2');
	game.registerAvatar(player2, game.avatarList[2].name, game.colorList[2]);

	cur = startSpace;

	avatar1 = game.playersArray[0].playerAvatar;
	avatar2 = game.playersArray[1].playerAvatar;

	game.setOrderAndStart();

	die = new Die(8);
	rollValue = die.roll();
});

describe('Test connectivity of spaces within Board', () => {
	test('Test Next method of all Spaces', () => {
		while (cur) {
			expect(cur).not.toBeNull();
			expect(cur).toBeInstanceOf(Space);
			cur = cur.next;
		}
	});

	test('Test Previous method', () => {
		expect(cur.previous).toBeNull();
		expect(cur.next.previous.type).toBe(SpaceType.START);
	});

	test('SpaceType Start', () => {
		expect(cur.type).toBe(SpaceType.START);
	});

	test('SpaceType Finish', () => {
		while (cur.next) {
			cur = cur.next;
		}
		expect(cur.type).toBe(SpaceType.FINISH);
	});

	test('Space.Special', () => {
		while (cur) {
			if (cur.special) expect(cur.special).not.toBeNull();
			cur = cur.next;
		}
	});

	test('SpaceType Chute', () => {
		while (cur) {
			if (cur.type === SpaceType.CHUTE) {
				expect(cur.special).not.toBeNull();
				expect(cur.special).toBeInstanceOf(Space);
			}
			cur = cur.next;
		}
	});

	test('SpaceType Ladder', () => {
		while (cur) {
			if (cur.type === SpaceType.LADDER) {
				expect(cur.special).not.toBeNull();
				expect(cur.special).toBeInstanceOf(Space);
			}
			cur = cur.next;
		}
	});

	test('Avatar position / space recognition after Die roll method', () => {
		avatar1.move(rollValue);
		avatar2.move(rollValue);
		let avatar1Space = avatar1.location;
		let avatar2Space = avatar2.location;

		for (let i = 0; i < rollValue; i++) {
			cur = cur.next;
		}
		if (cur.type === SpaceType.NORMAL) {
			if (cur.next.type === SpaceType.NORMAL) {
				expect(avatar1Space === cur.next).toBeTruthy();
				expect(avatar2Space === cur).toBeTruthy();
				expect(avatar1Space.occupied === cur.next.occupied).toBeTruthy();
				expect(avatar2Space.occupied === cur.occupied).toBeTruthy();
			} else {
				expect(avatar1Space === cur.next.special).toBeTruthy();
				expect(
					avatar1Space.occupied === cur.next.special.occupied
				).toBeTruthy();
			}
		}
	});

	test('Avatar landing on chute', () => {
		while (cur) {
			if (cur.type === SpaceType.CHUTE) {
				cur.land(avatar1);
				break;
			}
			cur = cur.next;
		}
		if (avatar1.location.type === SpaceType.NORMAL) {
			expect(avatar1.location).toEqual(cur.special);
		}
	});

	test('Avatar landing on ladder', () => {
		while (cur) {
			if (cur.type === SpaceType.LADDER) {
				cur.land(avatar2);
				break;
			}
			cur = cur.next;
		}
		if (avatar2.location.type === SpaceType.NORMAL) {
			expect(avatar2.location).toEqual(cur.special);
		}
	});

	test('Number of special spaces', () => {
		expect(uniqueSpecialValues.length === game.CHUTES + game.LADDERS);
	});

	test('reset', () => {
		game.reset();
		expect(game.readyToPlay).toBeFalsy();
		expect(game.haveWiner).toBeFalsy();
		expect(game.currentPlayer === 0).toBeTruthy();
		expect(avatar1.location.type === SpaceType.START).toBeTruthy();
		expect(avatar2.location.type === SpaceType.START).toBeTruthy();
	});
});
