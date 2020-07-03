class LikeButton {
  constructor(item) {
    this.el = item;
    this.counter = item.querySelector(".like-button__counter");
    this.el.addEventListener("click", this.onClick.bind(this));
  }

  onClick(e) {
    let {el, counter} = this;

    el.classList.toggle("like-button_pushed");
    if (el.classList.contains("like-button_pushed")) {
      counter.textContent = +(counter.textContent) + 1;
    } else {
      counter.textContent = +(counter.textContent) - 1;
    }
  }
}

let likeButtons = document.getElementsByClassName("like-button");
for (let item of likeButtons) {
  new LikeButton(item);
}