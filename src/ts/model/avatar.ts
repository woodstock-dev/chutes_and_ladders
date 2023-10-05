// Copyright 2023 Ryan McGuinness
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {IAvatar, ISpace} from "./interfaces";

export class Avatar implements IAvatar {
    Location : ISpace;
    Name : string;

    constructor(name : string) {
        this.Name = name
    }

    get location(): ISpace {
        return this.Location;
    }

    set location(location: ISpace) {
        this.Location = location
    }

    move(numberOfSpaces: number): void {
        while (numberOfSpaces > 0) {
            this.Location = this.Location.next
            if (this.Location.special !== null && numberOfSpaces === 1) this.Location = this.location.special
            numberOfSpaces--
        }
    }

    get name(): string {
        return this.Name;
    }

}