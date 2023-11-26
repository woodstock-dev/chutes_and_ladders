import { Avatar } from './avatar.js';
import { Player } from './player.js';

export class PlayerSetup {
  constructor(playerName, avatarName, color) {
    this.playerName = playerName;
    this.avatarName = avatarName;
    this.color = color;
  }

  registerPlayer() {
    const name = this.PlayerName;
    const avatar = this.avatar;
    const player = new Player(name, undefined, avatar);
    return player;
  }

  get avatar() {
    const name = this.selectAvatarName;
    const color = this.selectAvatarColor;
    return new Avatar(name, color);
  }

  get PlayerName() {
    return this.playerName;
  }

  get selectAvatarName() {
    return this.avatarName;
  }

  get selectAvatarColor() {
    return this.color;
  }
}
