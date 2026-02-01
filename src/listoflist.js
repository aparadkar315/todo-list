export {Listoflist, CreateList, Task}


 class Listoflist {

}

class CreateList {
    
}

class Task {

    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }

    get dueDate() {
        return this._dueDate;
    }

    get priority() {
        return this._priority;
    }

    set title(value) {
        if (value.length < 1) {
        alert("Can't be blank");
        return;
        }
        this._title = value;
    }

    set description(value) {
        if (value.length < 1) {
        alert("Can't be blank");
        return;
        }
        this._description = value;
    }

    set dueDate(value) {
        if (value.length < 1) {
        alert("Can't be blank");
        return;
        }
        this._dueDate = value;
    }

    set priority(value) {
        if (value.length < 1) {
        alert("Can't be blank");
        return;
        }
        this._priority = value;
    }

}