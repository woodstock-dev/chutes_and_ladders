import {IAvatar, ISpace, SpaceType} from "./interfaces";


export class Space implements ISpace {
    Next: ISpace;
    Special: ISpace | null;
    Type: SpaceType;
    Value: string;

    isOccupied(): boolean {
        return false;
    }

    land(avatar: IAvatar): void {
    }

    validate(validators: Array<(space: ISpace) => boolean>): boolean {
        return false;
    }
}
