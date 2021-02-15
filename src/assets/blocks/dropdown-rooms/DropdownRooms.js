import '../dropdown/dropdown.scss';

import DropdownOrigin from '../dropdown/DropdownOrigin.js';

export default class DropdownRooms extends DropdownOrigin {
  _init() {
    super._init();
    this.update();
  }

  update() {
    const roomsSuffix = ['ен', 'ьня', 'ьни', 'ьни', 'ьни',
      'ен', 'ен', 'ен', 'ен', 'ен', 'ен'];
    const bedsSuffix = ['ей', 'ь', 'и', 'и', 'и',
      'ей', 'ей', 'ей', 'ей', 'ей', 'ей'];

    const itemsNums = this.items.map((item) => item.value);
    const roomsNum = itemsNums[0];
    const bedsNum = itemsNums[1];

    let textContent = `${roomsNum === 0 ? 'Нет' : roomsNum} спал${roomsSuffix[roomsNum]},`;
    textContent += ` ${bedsNum === 0 ? 'нет' : bedsNum} кроват${bedsSuffix[bedsNum]}...`;
    this.inputText.textContent = textContent;
  }
}
