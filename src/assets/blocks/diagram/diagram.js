class Diagram {
  constructor(itemCanvas, votes) {
    this.canvas = itemCanvas;
    this.context = canvas.getContext('2d');
    this.votes = votes;
    this.draw();
  }

  draw() {
    const {canvas, votes} = this;
    const c = this.context;
    const {PI} = Math;

    let r = 58;
    let total = votes.reduce((sum, item) => sum + item.votes, 0);
    document.getElementsByClassName('diagram__total')[0].textContent = total;
    let startAngle = -PI / 2;
    let endAngle;

    votes.forEach(item => {
      endAngle = startAngle + item.votes / total * 2 * PI;
      this._arcGradient(canvas.width / 2, canvas.height / 2, r,
        startAngle, endAngle,
        item.colorStart, item.colorEnd,
        PI / 36,
      );
      startAngle = endAngle;
    });

    c.save();
    // теперь отдельно нарисуем белые линии на границах результатов голосования
    c.translate(canvas.width / 2, canvas.height / 2);
    startAngle = -PI / 2;
    c.rotate(startAngle);

    votes.forEach(item => {
      let angle = item.votes / total * 2 * PI;
      c.rotate(angle);
      c.fillStyle = "white";

      c.lineWidth = 4;
      c.rect(r - 2, 0, 4, 2);
      c.fill();
    });
    c.restore();
  }

  _arcGradient(xc, yc, r, startAngle, endAngle, colorStart, colorEnd, step = PI / 36) {
    const c = this.context;

    c.lineWidth = 4;

    // рисуем по часовой стрелке
    let xPrev = r * Math.cos(startAngle) + xc;
    let yPrev = r * Math.sin(startAngle) + yc;

    c.lineCap = 'butt';
    for (let angle = step + startAngle; angle <= endAngle; angle += step) {
      let xCurr = r * Math.cos(angle) + xc;
      let yCurr = r * Math.sin(angle) + yc;

      let d = ((xCurr - xPrev) ** 2 + (yCurr - yPrev) ** 2) ** 0.5;
      // угол A - угол пересечения секущей с ось X
      let sinA = (xCurr - xPrev) / d;
      let cosA = (yCurr - yPrev) / d;

      let xStart = xPrev - r * (angle - startAngle) * sinA;
      let yStart = yPrev - r * (angle - startAngle) * cosA;

      let xEnd = xCurr + r * (endAngle - angle) * sinA;
      let yEnd = yCurr + r * (endAngle - angle) * cosA;

      let gradient = c.createLinearGradient(xStart, yStart, xEnd, yEnd);
      gradient.addColorStop(0, colorStart);
      gradient.addColorStop(1, colorEnd);
      c.strokeStyle = gradient;
      c.beginPath();
      c.arc(xc, yc, r, (angle - step), angle);
      c.stroke();
      xPrev = xCurr;
      yPrev = yCurr;

      c.lineCap = 'square';
      // без этой строчки появляются белые полоски на градиенте
    }
  }
}

let votes = [
  {rate: "disapointed", votes: 0, colorStart: "#919191", colorEnd: "#3D4975"},
  {rate: "satisfactory", votes: 65, colorStart: "#BC9CFF", colorEnd: "#8BA4F9"},
  {rate: "good", votes: 65, colorStart: "#6FCF97", colorEnd: "#66D2EA"},
  {rate: "magnificently", votes: 130, colorStart: "#FFBA9C", colorEnd: "#FFE39C"},
]

let canvas = document.getElementsByClassName('diagram__canvas')[0];
new Diagram(canvas, votes);