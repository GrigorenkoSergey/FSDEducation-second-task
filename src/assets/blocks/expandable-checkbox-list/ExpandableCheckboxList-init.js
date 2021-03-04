import ExpandableCheckbox from './ExpandableCheckboxList';

[...document.querySelectorAll('.js-expandable-checkbox-list')]
  .forEach((item) => new ExpandableCheckbox(item));
