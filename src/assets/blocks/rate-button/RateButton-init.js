import RateButton from './RateButton';

[...document.getElementsByClassName('js-rate-button')]
  .forEach((item) => new RateButton(item));
