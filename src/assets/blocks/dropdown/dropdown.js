// вставлять этот файл, если нужна автоматическая
// инициализация dropdowns

import DropdownGuests from './dropdown-guests';
import DropdownRooms from './dropdown-rooms';

[...document.querySelectorAll('[data-name=guests]')]
  .forEach((item) => new DropdownGuests(item));

[...document.querySelectorAll('[data-name=rooms]')]
  .forEach((item) => new DropdownRooms(item));
