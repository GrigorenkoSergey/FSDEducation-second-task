import ExpandableCheckbox from './ExpandableCheckboxList.js';

[...document.querySelectorAll('.js-expandable-checkbox-list')]
  .forEach((item) => new ExpandableCheckbox(item));
