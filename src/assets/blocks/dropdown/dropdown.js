// вставлять этот файл, если нужна автоматическая 
// инициализация dropdowns

import {DropdownGuests} from "./dropdown-guests.js"
import {DropdownRooms} from "./dropdown-rooms.js"

let dropdownGuests = document.querySelectorAll("[data-name=guests]");
for (let item of dropdownGuests) {
  new DropdownGuests(item);
}

let dropdownRooms = document.querySelectorAll("[data-name=rooms]");
for (let item of dropdownRooms) {
  new DropdownRooms(item);
}