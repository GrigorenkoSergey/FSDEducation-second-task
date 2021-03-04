import Diagram from './Diagram';

const votes = [
  {
    rate: 'disapointed', votes: 0, colorStart: '#919191', colorEnd: '#3D4975',
  },
  {
    rate: 'satisfactory', votes: 65, colorStart: '#BC9CFF', colorEnd: '#8BA4F9',
  },
  {
    rate: 'good', votes: 65, colorStart: '#6FCF97', colorEnd: '#66D2EA',
  },
  {
    rate: 'magnificently', votes: 130, colorStart: '#FFBA9C', colorEnd: '#FFE39C',
  },
];

[...document.querySelectorAll('.js-diagram__canvas')]
  .forEach((canvas) => new Diagram(canvas, votes));
