import RangeSlider from './RangeSlider';

[...document.querySelectorAll('.js-range-slider__roller')]
  .forEach((item) => new RangeSlider({ item, range: [0, 15000] }));
