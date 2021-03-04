import Datepicker from '../datepicker/Datepicker';

export default class DateDropdown {
  constructor(elem, options = {}) {
    const defaultOptions = {
      dateFormat: 'dd.mm.yyyy',
      multipleDatesSeparator: '/',
    };

    this.el = elem;
    this._init({ ...defaultOptions, ...options });
  }

  _init(options) {
    const start = this.el.querySelector('[data-id=arrival]');
    const end = this.el.querySelector('[data-id=departure]');

    this.datepicker = new Datepicker(start, {
      ...options,
      onSelect: this._handleStartSelect.bind(this),
    }).datepicker;

    this.start = start;
    this.end = end;
    this.end.addEventListener('click', this._handleEndClick.bind(this));
  }

  _handleStartSelect(formattedDate, date, inst) {
    const [start, end] = formattedDate.split(inst.opts.multipleDatesSeparator);
    this.start.value = start;

    if (end) {
      this.end.value = end;
    } else {
      this.end.value = '';
    }
  }

  _handleEndClick() {
    this.datepicker.show();
  }
}
