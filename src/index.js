import "./style.css";
import {Item} from "./new.js";
import {CreateList} from "./list.js";
console.log("Success!");
const item1 = new Item("a", "b", "01/02/2026", "1");
console.log(item1.title);


const project = new CreateList();
//project.createList("");
project.addTolist(item1);
console.log(project.getList());





const myListsDialog = document.querySelector("#myListsDialog");
const createList = document.querySelector("#createListButton");
const confirmBtn = document.querySelector("#confirmBtn");
const input = document.querySelector("input");
const createListContainer = document.querySelector(".createListContainer");


createList.addEventListener("click", () => {
    myListsDialog.showModal();
});

function confirmBtnHandler(event) {
    event.preventDefault();
    myListsDialog.close(input.value);
}

function myListsDialogHandler() {
      const div = document.createElement("div");
      div.textContent = myListsDialog.returnValue;
      div.classList.add(`${input.returnValue}`);
      createListContainer.appendChild(div);
      input.value = "";
}



confirmBtn.addEventListener("click", confirmBtnHandler);
myListsDialog.addEventListener("close", myListsDialogHandler);

