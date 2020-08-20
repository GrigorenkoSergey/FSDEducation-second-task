import './dropdown.scss';
// вставлять этот файл, если нужна автоматическая
// инициализация dropdowns

import DropdownGuests from '../dropdown-guests/dropdown-guests.js';
import DropdownRooms from '../dropdown-rooms/dropdown-rooms.js';

[...document.querySelectorAll('[data-name=guests]')]
  .forEach((item) => new DropdownGuests(item));

[...document.querySelectorAll('[data-name=rooms]')]
  .forEach((item) => new DropdownRooms(item));
