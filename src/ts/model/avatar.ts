import {IAvatar, ISpace} from "./interfaces";

export class Avatar implements IAvatar {
    Location: ISpace;
    Name: string;

    move(space: ISpace): void {
    }
}