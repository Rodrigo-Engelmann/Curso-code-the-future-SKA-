export class Area {
    title: string;

    constructor() {
        this.title = '';
    }
}

export class Game {
    title: string;
    areas: Area[];

    constructor() {
        this.title = '';
        this.areas = [];
    }
}
