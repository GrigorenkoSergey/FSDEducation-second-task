import DropdownOrigin from './dropdown-origin.js';

export default class DropdownRooms extends DropdownOrigin {
  update(eventType, data) {
    const roomsSuffix = ['ен', 'ьня', 'ьни', 'ьни', 'ьни',
      'ен', 'ен', 'ен', 'ен', 'ен', 'ен'];
    const bedsSuffix = ['ей', 'ь', 'и', 'и', 'и',
      'ей', 'ей', 'ей', 'ей', 'ей', 'ей'];

    const itemsNums = this.items.map((item) => item.value);
    const roomsNum = itemsNums[0];
    const bedsNum = itemsNums[1];

    let textContent = `${roomsNum} спал${roomsSuffix[roomsNum]},`;
    textContent += ` ${bedsNum} кроват${bedsSuffix[bedsNum]}...`;
    this.input.textContent = textContent;
  }
}
