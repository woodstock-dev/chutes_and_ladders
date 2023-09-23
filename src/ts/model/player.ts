import {IAvatar, IPlayer} from "./interfaces";

export class Player implements IPlayer {
    Avatar: IAvatar;
    Name: string;
    Ordinal: number;

}