import './masked-text-field.scss';
import MaskedText from './MaskedText.js';

// eslint-disable-next-line no-unused-vars
const maskedFields = [...document.querySelectorAll('.masked-text-field')]
  .forEach((item) => new MaskedText(item));
