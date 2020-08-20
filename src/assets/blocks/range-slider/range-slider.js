import './range-slider.scss';

export default class RangeSlider {
  constructor(item) {
    this.el = item;
    this.handlers = {};
    this.bindHandlers();
    this.init();
  }

  bindHandlers() {
    this.handlers.hanleRollerLeftMouseDown = this.hanleRollerLeftMouseDown.bind(this);
    this.handlers.handleRollerRightMouseDown = this.handleRollerRightMouseDown.bind(this);
  }

  init() {
    this.leftRoller = this.el.querySelector('.range-slider__roller-left');
    this.rightRoller = this.el.querySelector('.range-slider__roller-right');
    this.rangeSlider = this.el.closest('.range-slider');

    this.leftRoller.addEventListener('mousedown', this.handlers.hanleRollerLeftMouseDown);
    this.rightRoller.addEventListener('mousedown', this.handlers.handleRollerRightMouseDown);

    this.range = this.rangeSlider.querySelector('.range-slider__range');
  }

  hanleRollerLeftMouseDown(e) {
    const elem = e.target;
    const startX = this.el.offsetParent.getBoundingClientRect().left
    + this.el.offsetParent.clientLeft;
    const shiftX = e.clientX - elem.getBoundingClientRect().left;

    const boundaries = {
      left: 0,
      right: this.rightRoller.getBoundingClientRect().left
      - this.rightRoller.offsetWidth - startX,
    };

    const handleDocumentMouseMove = (event) => {
      event.preventDefault();

      let newLeft = event.clientX - shiftX - startX;
      newLeft = Math.max(boundaries.left, newLeft);
      newLeft = Math.min(newLeft, boundaries.right);
      this.el.style.left = `${newLeft}px`;

      this.countRange();
    };

    const handleDocumentMouseUp = (event) => {
      document.removeEventListener('mousemove', handleDocumentMouseMove);
      document.removeEventListener('mouseup', handleDocumentMouseUp);
    };

    document.addEventListener('mousemove', handleDocumentMouseMove);
    document.addEventListener('mouseup', handleDocumentMouseUp);
  }

  handleRollerRightMouseDown(e) {
    // отсчет начинаем с правого края
    const elem = e.target;
    const startX = this.el.offsetParent.getBoundingClientRect().left
    + this.el.offsetParent.clientLeft + this.el.offsetParent.clientWidth;
    const shiftX = elem.getBoundingClientRect().right - e.clientX;

    const boundaries = {
      left: startX - this.leftRoller.getBoundingClientRect().right
      - this.rightRoller.offsetWidth,
      right: 0,
    };

    const handleDocumentMouseMove = (event) => {
      event.preventDefault();

      let newRight = startX - event.clientX - shiftX;
      newRight = Math.max(boundaries.right, newRight);
      newRight = Math.min(newRight, boundaries.left);
      this.el.style.right = `${newRight}px`;

      this.countRange();
    };
    const handleDocumentMouseUp = (event) => {
      document.removeEventListener('mousemove', handleDocumentMouseMove);
      document.removeEventListener('mouseup', handleDocumentMouseUp);
    };

    document.addEventListener('mousemove', handleDocumentMouseMove);
    document.addEventListener('mouseup', handleDocumentMouseUp);
  }

  countRange() {
    // коэффициенты 5 / 74 и 10 / 175 взяты, чтобы соответствовать масштабу макета.
    // В общем, я так и не понял, как разбить шкалу...
    let lowRange = Math.floor((5 / 74) * this.el.offsetLeft) * 1000;
    let topRange = Math.floor((10 / 175) * (this.el.offsetLeft + this.el.offsetWidth)) * 1000;

    lowRange = lowRange.toLocaleString('ru-RU');
    topRange = topRange.toLocaleString('ru-RU');

    this.range.textContent = `${lowRange}\u20BD - ${topRange}\u20BD`;
  }
}

[...document.getElementsByClassName('range-slider__roller')]
  .forEach((item) => new RangeSlider(item));
