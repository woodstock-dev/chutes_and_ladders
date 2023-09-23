import {IBoard} from "./interfaces";
import {Space} from "./space";

export class Board implements IBoard {
    setup(): void {
    }

    spaces(): Array<Space> {
        return undefined;
    }

    display() : string {
        let out = ""
        let total = 100;
        for (let i : number = 10; i >= 1; i--) {
            let row = []
            for (let j : number = 1; j<=10; j++) {
                row.push(total--);
            }
            row = (i%2==0) ? row : row.reverse()
            out += row
        }
        return out
    }
}