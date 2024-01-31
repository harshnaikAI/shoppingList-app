"use-strict";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://realtime-database-9ba0d-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingListOfYours");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");

const catImage = document.querySelector(".cat-image");

const shoppingListEl = document.getElementById("list");

// console.log(hours);

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  if (inputValue !== "") {
    push(shoppingListInDB, inputValue);

    inputFieldEl.value = "";
  }
});

function clearShoppingList() {
  shoppingListEl.innerHTML = "";
}

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemArray = Object.entries(snapshot.val());

    console.log(itemArray);

    clearShoppingList();

    for (let i = 0; i < itemArray.length; i++) {
      let value = itemArray[i];

      render(value);
    }
  } else clearShoppingList();
});

function render(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newEle = document.createElement("li");

  newEle.textContent = itemValue;

  shoppingListEl.append(newEle);

  newEle.addEventListener("dblclick", function () {
    let exactLocationOfItemInDB = ref(
      database,
      `shoppingListOfYours/${itemID}`
    );
    console.log(exactLocationOfItemInDB);
    remove(exactLocationOfItemInDB);
  });
}
