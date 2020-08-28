/* eslint-disable class-methods-use-this */
import './masked-text-field.scss';
import MaskedText from './masked-text-field-class.js';

const maskedFields = [...document.querySelectorAll('.masked-text-field')]
  .forEach((item) => new MaskedText(item));
