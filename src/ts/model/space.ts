import {IAvatar, ISpace, SpaceType} from "./interfaces";


export class Space implements ISpace {
    Next: ISpace;
    Special: ISpace | null;
    Type: SpaceType;
    Value: string;
    Players: Array<IAvatar>;

    isOccupied(): boolean {
        return false;
    }

    land(avatar: IAvatar): void {
    }

    leave(): void {
    }

    get next(): ISpace {
        return undefined;
    }

    get occupied(): boolean {
        return false;
    }

    get special(): ISpace | null {
        return undefined;
    }

    get type(): SpaceType {
        return undefined;
    }

    get value(): string {
        return "";
    }

    validate(validators: Array<(space: ISpace) => boolean>): boolean {
        return false;
    }
}
