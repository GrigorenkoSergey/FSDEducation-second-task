let expandableLists = document.querySelectorAll(".expandable-checkbox-list");
for (let item of expandableLists) {
  item.addEventListener("click", toggle);
  item.addEventListener("mousedown", (e) => e.preventDefault()); //уберем выделение по умолчанию

  function toggle(e) {
    let elem = e.target;

    if (elem.classList.contains("expandable-checkbox-list__title")) {
      elem.classList.toggle("expandable-checkbox-list__title_expanded");
      let ul = elem.parentNode.querySelector(".checkbox-list");
      ul.hidden = !ul.hidden;
    }
  }
}

let checkboxes = document.querySelectorAll(".checkbox");

for (let item of checkboxes) {
  item.addEventListener("mousedown", (e) => e.preventDefault());
}