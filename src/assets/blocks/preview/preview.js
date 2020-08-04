/* eslint-disable fsd/jq-use-js-prefix-in-selector */
import $ from 'jquery';
import 'bxslider/dist/jquery.bxslider.min.js';
import 'bxslider/dist/jquery.bxslider.css';
import './preview-bxslider.scss';

import '../rate-button/rate-button.js';

$(document).ready(() => {
  $('.bxslider').bxSlider();
});
