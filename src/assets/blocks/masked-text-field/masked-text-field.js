import MaskedText from './MaskedText';
import './masked-text-field.scss';

// eslint-disable-next-line no-unused-vars
const maskedFields = [...document.querySelectorAll('.js-masked-text-field')]
  .forEach((item) => new MaskedText(item));
