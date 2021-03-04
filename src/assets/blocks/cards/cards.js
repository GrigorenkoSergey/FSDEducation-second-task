import Datepicker from '../datepicker/Datepicker';
import '../search-form/search-form';
import '../final-bill/final-bill';
import '../preview/preview';
import '../registration/registration';
import '../log-in/log-in';
import './cards.scss';

const calendar = new Datepicker(document.querySelector('.js-cards__calendar'));
calendar.datepicker.selectDate(new Date(Date.now() + 3 * 24 * 3600 * 1000));
calendar.datepicker.selectDate(new Date(Date.now() + 7 * 24 * 3600 * 1000));
