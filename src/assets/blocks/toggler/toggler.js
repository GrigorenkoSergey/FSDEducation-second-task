let togglers = document.getElementsByClassName("toggler");
for (let item of togglers) {
  item.addEventListener("mousedown", (e) => e.preventDefault());
}