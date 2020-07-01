import {DropdownOrigin} from "./dropdown-origin.js"

export class DropdownRooms extends DropdownOrigin {
  update(eventType, data) {
    let roomsSuffix = ["ен", "ьня", "ьни", "ьни", "ьни",
      "ен", "ен", "ен", "ен", "ен", "ен"];
    let bedsSuffix = ["ей", "ь", "и", "и", "и",
      "ей", "ей", "ей", "ей", "ей", "ей"];

    let itemsNums = this.items.map(item => item.value);
    let roomsNum = itemsNums[0];
    let bedsNum = itemsNums[1];

    let textContent = `${roomsNum} спал${roomsSuffix[roomsNum]},`;
    textContent += ` ${bedsNum} кроват${bedsSuffix[bedsNum]}...`;
    this.input.textContent = textContent;
  }
}