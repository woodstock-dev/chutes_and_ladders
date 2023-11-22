import { Avatar, Color } from './avatar.js';
import { Player } from './player.js';
import PromptSync from 'prompt-sync';

export class PlayerSetup {
  constructor(avatarList, maxPlayers, playerOrder) {
    this.avatars = avatarList;
    this.colors = Color;
    this.playerCount = 0;
    this.prompt = PromptSync();
    this.maxPlayers = maxPlayers;
    this.playerOrder = playerOrder;
  }

  reset() {
    return new PlayerSetup();
  }

  registerPlayer() {
    const name = this.getPlayerName();
    const order = this.playerOrder;
    const avatar = this.registerAvatar();
    const player = new Player(name, order, avatar);
    return player;
  }

  registerAvatar() {
    const name = this.selectAvatarName();
    const color = this.selectAvatarColor();
    return new Avatar(name, color);
  }

  getPlayerName() {
    const name = this.prompt('Enter Player Name: ');
    this.playerListCount++;
    return name;
  }

  selectAvatarName() {
    console.log(this.avatars);
    let avatar = this.prompt('Select Avatar: ').toUpperCase();
    if (this.verifyAvatar(avatar)) return avatar;
    else return this.selectAvatarName();
  }

  selectAvatarColor() {
    console.log(Object.keys(this.colors));
    let color = this.prompt('Select Avatar Color: ').toUpperCase();
    if (color in this.colors) return Color[color];
    else return Color.UNDEFINED;
  }

  verifyAvatar(avatar) {
    return this.avatars.includes(avatar);
  }
}
