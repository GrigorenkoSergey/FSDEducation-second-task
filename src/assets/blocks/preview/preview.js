import $ from 'jquery';
import 'bxslider/dist/jquery.bxslider.min';
import 'bxslider/dist/jquery.bxslider.min.css';

import '../rate-button/RateButton-init';
import './preview-bxslider.scss';
import './preview.scss';

$(document).ready(() => {
  $('.js-bxslider').bxSlider();
});
