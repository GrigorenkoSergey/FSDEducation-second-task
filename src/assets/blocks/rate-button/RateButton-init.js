import RateButton from './RateButton.js';

[...document.getElementsByClassName('js-rate-button')]
  .forEach((item) => new RateButton(item));
