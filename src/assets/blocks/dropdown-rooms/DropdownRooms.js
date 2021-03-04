import DropdownOrigin from '../dropdown/DropdownOrigin';
import '../dropdown/dropdown.scss';

export default class DropdownRooms extends DropdownOrigin {
  update() {
    const itemsNums = this.items.map((item) => item.value);
    const roomsNum = itemsNums[0];
    const bedsNum = itemsNums[1];

    const roomsSuffix = ['ен', 'ьня', 'ьни', 'ьни', 'ьни',
      'ен', 'ен', 'ен', 'ен', 'ен', 'ен'];
    const bedsSuffix = ['ей', 'ь', 'и', 'и', 'и',
      'ей', 'ей', 'ей', 'ей', 'ей', 'ей'];

    let textContent = `${roomsNum === 0 ? 'Нет' : roomsNum} спал${roomsSuffix[roomsNum]},`;
    textContent += ` ${bedsNum === 0 ? 'нет' : bedsNum} кроват${bedsSuffix[bedsNum]}...`;
    this.inputText.textContent = textContent;
  }

  _init() {
    super._init();
    this.update();
  }
}
