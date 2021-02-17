import 'bxslider/dist/jquery.bxslider.min.css';
import './preview-bxslider.scss';
import './preview.scss';

import $ from 'jquery';

import 'bxslider/dist/jquery.bxslider.min.js';
import '../rate-button/rate-button.js';

$(document).ready(() => {
  $('.js-bxslider').bxSlider();
});
