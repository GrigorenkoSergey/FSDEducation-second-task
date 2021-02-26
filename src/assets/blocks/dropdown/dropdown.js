import DropdownGuests from '../dropdown-guests/DropdownGuests.js';
import DropdownRooms from '../dropdown-rooms/DropdownRooms.js';
import './dropdown.scss';

[...document.querySelectorAll('[data-name=guests]')]
  .forEach((item) => new DropdownGuests(item));

[...document.querySelectorAll('[data-name=rooms]')]
  .forEach((item) => new DropdownRooms(item));
