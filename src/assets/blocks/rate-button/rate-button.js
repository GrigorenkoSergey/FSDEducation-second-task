let rateButtons = document.getElementsByClassName("rate-button");
for (let item of rateButtons) {
    item.addEventListener("click", function (e) {
        let stars = +e.target.dataset.star;
        for (let i = 0; i < 5; i++) {
            if (i < stars) {
                item.children[i].className = "rate-button__star_checked"
            } else {
                item.children[i].className = "rate-button__star"
            }
        }
    })
}