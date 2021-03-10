import { boundMethod } from 'autobind-decorator';

import './range-slider.scss';

export default class RangeSlider {
  constructor({ item, range }) {
    this.el = item;
    this.scaleWidth = this.el.parentNode.clientWidth;
    this.range = range;
    this._init();
  }

  _init() {
    this.leftRoller = this.el.querySelector('.js-range-slider__roller-left');
    this.rightRoller = this.el.querySelector('.js-range-slider__roller-right');
    this.rangeSlider = this.el.closest('.range-slider');

    this.leftRoller.addEventListener('mousedown', this._hanleRollerLeftMouseDown);
    this.rightRoller.addEventListener('mousedown', this._handleRollerRightMouseDown);

    this.rangeField = this.rangeSlider.querySelector('.js-range-slider__range');

    const rangeValue = this.range[1] - this.range[0];
    const rangeFieldContent = this.rangeField.textContent.replace(/ /g, '');
    const [leftRangeSettled, rightRangeSettled] = rangeFieldContent.match(/\d+/g);
    const { scaleWidth } = this;
    this.el.style.left = `${(leftRangeSettled / rangeValue) * scaleWidth}px`;
    this.el.style.right = `${scaleWidth * (1 - rightRangeSettled / rangeValue)}px`;
  }

  @boundMethod
  _hanleRollerLeftMouseDown(e) {
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

      this._countRange();
    };

    const handleDocumentMouseUp = () => {
      document.removeEventListener('mousemove', handleDocumentMouseMove);
      document.removeEventListener('mouseup', handleDocumentMouseUp);
    };

    document.addEventListener('mousemove', handleDocumentMouseMove);
    document.addEventListener('mouseup', handleDocumentMouseUp);
  }

  @boundMethod
  _handleRollerRightMouseDown(e) {
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

      this._countRange();
    };
    const handleDocumentMouseUp = () => {
      document.removeEventListener('mousemove', handleDocumentMouseMove);
      document.removeEventListener('mouseup', handleDocumentMouseUp);
    };

    document.addEventListener('mousemove', handleDocumentMouseMove);
    document.addEventListener('mouseup', handleDocumentMouseUp);
  }

  _countRange() {
    const rangeValue = this.range[1] - this.range[0];
    const { scaleWidth } = this;
    const { left, right } = this.el.style;

    let lowRange = parseFloat(left) / scaleWidth;
    let topRange = 1 - parseFloat(right) / scaleWidth;

    lowRange = Math.floor(lowRange * rangeValue);
    topRange = Math.ceil(topRange * rangeValue);

    lowRange = lowRange.toLocaleString('ru-RU');
    topRange = topRange.toLocaleString('ru-RU');

    this.rangeField.textContent = `${lowRange}\u20BD - ${topRange}\u20BD`;
  }
}
