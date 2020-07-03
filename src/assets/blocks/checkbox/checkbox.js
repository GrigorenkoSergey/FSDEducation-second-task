let checkboxes = document.querySelectorAll(".checkbox");

for (let item of checkboxes) {
  item.addEventListener("mousedown", (e) => e.preventDefault());
}