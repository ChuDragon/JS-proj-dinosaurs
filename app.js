// Constructor function for Dino class
function Dino(species, weight, height, diet, where, when, fact) {
  (this.species = species),
    (this.height = height),
    (this.weight = weight),
    (this.diet = diet),
    (this.where = where),
    (this.when = when),
    (this.fact = fact);
}

// NOTE: Weight is in lbs, height in inches;
function addCompareMethods() {
  // Human-Dino Compare Method 1
  Dino.prototype.humanCompare1 = function (humanHeight) {
    let heightDiff = this.height - humanHeight;
    return (
      this.species +
      " is " +
      (heightDiff > 0 ? heightDiff : -heightDiff) +
      " inches " +
      (heightDiff > 0 ? "taller" : "shorter") +
      " than human."
    );
  };

  // Human-Dino Compare Method 2
  Dino.prototype.humanCompare2 = function (humanWeight) {
    let weightDiff = this.weight - humanWeight;
    return (
      this.species +
      " is " +
      (weightDiff > 0 ? weightDiff : -weightDiff) +
      " pounds " +
      (weightDiff > 0 ? "heavier" : "lighter") +
      " than human."
    );
  };

  // Human-Dino Compare Method 3
  Dino.prototype.humanCompare3 = function (humanName, humanDiet) {
    let hunt = "";
    if (humanDiet != "Herbavor") {
      hunt = ", they could hunt the dinosaur.";
    } else {
      hunt = ", the dinosaur would be safe.";
    }
    return "If " + humanName + " lived in the " + this.when + hunt;
  };
}

function tranferDinoData() {
  for (let i = 0; i < 8; i++) {
    //newDino object created, extends humanObj
    const newDino = new Dino();
    dinosArr.push(newDino); // newDino object pushed to end of the array
    const keyArr = Object.keys(Dinos[i]);
    // copy dino properties in a loop by key
    for (let j = 0; j < keyArr.length; j++) {
      newDino[keyArr[j]] = Dinos[i][keyArr[j]];
    }
  }
}

function randomFacts() {
  // returns an array of 2 string object keys
  let arr = ["fact", "humanCompare1", "humanCompare2", "humanCompare3"];
  let num1 = Math.floor(Math.random() * 4); //random integer from 0 to 3
  arr.splice(num1, 1); // remove array element in index position num1
  let num2 = Math.floor(Math.random() * 3); //random integer from 0 to 2
  arr.splice(num2, 1);
  return arr;
}

function makeTiles() {
  const gridEl = document.querySelector("#grid");
  for (let i = 0; i < newDinoArr.length; i++) {
    let factKeys = randomFacts();
    const gridTile = document.createElement("grid-item");
    let htmlString =
      "<div class='grid-item'><h3>" +
      (i == 4 ? newDinoArr[i].name : newDinoArr[i].species) +
      "</h3><img src='./images/" +
      (i == 4 ? "human" : newDinoArr[i].species) +
      ".png' alt='" +
      newDinoArr[i].species +
      "'/><p>" +
      (i == 4 ? "" : newDinoArr[i][factKeys[0]]) +
      "<br><br>" +
      (i == 4 ? "" : newDinoArr[i][factKeys[1]]) +
      "</p></div>";
    gridTile.innerHTML = htmlString;
    // Add tiles to DOM
    gridEl.appendChild(gridTile);
  }
}

// **MAIN** scope
// imports Dinos data from dinodata.js (renamed from dino.json)
// Dinos is array of 8 objects literally defined in dinodata.js
import { Dinos } from "./dinodata.js";
var dinosArr = []; // declare empty arrays
var newDinoArr = [];
tranferDinoData();
addCompareMethods();
const formEl = document.querySelector("#dino-compare");

// On button click, prepare and display infographic
formEl.onsubmit = function (event) {
  // Use IIFE to get human data from form
  const dataFromForm = (function () {
    // IIFE scope: humanObj; from global scope: dinosArr[], newDinoArr[]

    const humanObj = {
      name: formEl["name"].value,
      humanHeight: formEl["feet"].value * 12 + formEl["inches"].value,
      humanWeight: formEl["weight"].value,
      humanDiet: formEl["diet"].value,
    };

    for (let i = 0; i < 8; i++) {
      //newObj extends humanObj with human properties
      const newObj = Object.create(humanObj);
      newDinoArr.push(newObj); // newDino object pushed to end of the array
      const keyArr = Object.keys(dinosArr[i]);
      // copy properties/methods by key
      for (let j = 0; j < keyArr.length; j++) {
        newDinoArr[i][keyArr[j]] = dinosArr[i][keyArr[j]];
      }
      newDinoArr[i].humanCompare1 = dinosArr[i].humanCompare1(
        newObj.humanHeight
      );
      newDinoArr[i].humanCompare2 = dinosArr[i].humanCompare2(
        newObj.humanWeight
      );
      newDinoArr[i].humanCompare3 = dinosArr[i].humanCompare3(
        newObj.name,
        newObj.humanDiet
      );
    }

    // for tiles, splice human into dinosArr at index 4
    newDinoArr.splice(4, 0, humanObj);

    makeTiles(); // Generate Tiles for each dino object in dinosArr
    formEl.innerHTML = ""; //remove form from screen
    event.preventDefault(); //don't actually submit the form
  })(); //end of IIFE
};
