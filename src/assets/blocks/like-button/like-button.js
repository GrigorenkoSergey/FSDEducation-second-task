let likeButtons = document.getElementsByClassName("like-button");
for (let item of likeButtons) {
  item.addEventListener("click", function(e) {
    this.classList.toggle("like-button_pushed");

    let counter = this.getElementsByClassName("like-button__counter")[0];

    if (this.classList.contains("like-button_pushed")) {

      counter.textContent = +(counter.textContent) + 1;
    } else {
      counter.textContent = +(counter.textContent) - 1;
    }
  })
}