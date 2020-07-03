class ExpandableCheckbox {
  constructor(item) {
    this.el = item;
    this.blockName = "expandable-checkbox-list";

    this.ul = item.querySelector(".checkbox-list");
    this.title = item.querySelector(`.${this.blockName}__title`);

    this.title.addEventListener("click", this.onTitleClick.bind(this));
    this.el.addEventListener("mousedown", (e) => e.preventDefault());
  }

  onTitleClick(e) {
    this.title.classList.toggle(this.blockName + "__title_expanded");
    this.ul.hidden = !this.ul.hidden;
  }
}

let expandableLists = document.querySelectorAll(".expandable-checkbox-list");
for (let item of expandableLists) {
  new ExpandableCheckbox(item);
}