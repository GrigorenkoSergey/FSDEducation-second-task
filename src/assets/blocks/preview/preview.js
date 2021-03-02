import $ from 'jquery';
import 'bxslider/dist/jquery.bxslider.min.js';
import 'bxslider/dist/jquery.bxslider.min.css';
import '../rate-button/RateButton-init.js';
import './preview-bxslider.scss';
import './preview.scss';

$(document).ready(() => {
  $('.js-bxslider').bxSlider();
});
