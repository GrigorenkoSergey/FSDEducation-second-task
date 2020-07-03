class RateButton {
  constructor(item) {
    this.el = item;
    this.el.addEventListener("click", this.onClick.bind(this));
  }

  onClick(e) {
    let stars = +e.target.dataset.star;

    for (let i = 0; i < 5; i++) {
      if (i < stars) {
        this.el.children[i].className = "rate-button__star_checked"
      } else {
        this.el.children[i].className = "rate-button__star"
      }
    }
  }
}

let rateButtons = document.getElementsByClassName("rate-button");

for (let item of rateButtons) {
  new RateButton(item);
}