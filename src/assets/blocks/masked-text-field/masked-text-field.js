import './masked-text-field.scss';
import MaskedText from './MaskedText.js';

// eslint-disable-next-line no-unused-vars
const maskedFields = [...document.querySelectorAll('.js-masked-text-field')]
  .forEach((item) => new MaskedText(item));
