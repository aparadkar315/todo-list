export class CreateList {
    constructor() {
            this.arr = [];
        }


    addTolist(item) {
        this.arr.push(item);
    }

    getList() {
        return this.arr;
    }
}