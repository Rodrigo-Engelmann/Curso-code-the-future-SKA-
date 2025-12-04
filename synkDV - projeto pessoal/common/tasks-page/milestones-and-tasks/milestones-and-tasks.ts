export class Milestone {
    title: string;
    priority: number;
    inQueueTasks: {
        title: string;
        term: string;
        priority: number;
        responsable: string;
        time: string;
        image: string;
    }[];
    finishedTasks: {
        title: string;
        term: string;
        priority: number;
        responsable: string;
        time: string;
        image: string;
    }[];

    constructor() {
        this.title = '';
        this.priority = 0;
        this.inQueueTasks = [];
        this.finishedTasks = [];
    }
}
