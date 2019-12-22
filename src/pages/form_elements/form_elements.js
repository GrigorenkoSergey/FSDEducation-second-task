import "./form_elements.scss";

let togglers = document.getElementsByClassName("toggler");
for (let item of togglers) {
    item.addEventListener("mousedown", (e) => e.preventDefault());
}

let likeButtons = document.getElementsByClassName("like-button");
for (let item of likeButtons) {
    item.addEventListener("click", function (e) {
        this.classList.toggle("like-button_pushed");

        let counter = this.getElementsByClassName("like-button__counter")[0];

        if (this.classList.contains("like-button_pushed")) {

            counter.textContent = +(counter.textContent) + 1;
        } else {
            counter.textContent = +(counter.textContent) - 1;
        }
    })
}

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

let dropdown = document.getElementsByClassName("dropdown");
for (let item of dropdown) {
    let input = item.getElementsByClassName("dropdown__input")[0];
    let container = item.getElementsByClassName("dropdown__container")[0];
    // let counter = item.getElementsByClassName("dropdown__counters")[0];

    input.addEventListener("click", function (e) {
        container.classList.toggle("dropdown__container_expanded");
        input.classList.toggle("dropdown__input_expanded");
    });

    container.addEventListener("click", function(e) {
        if (!e.target.classList.contains("dropdown__circle")) return;   
        let operation = e.target.dataset.direction;    
           
        let span = e.target.parentNode.querySelector("span");
        let value = +span.textContent;
        if (operation == "+") {
             span.textContent = ++value; 
             let disabled = e.target.parentNode.querySelector(".dropdown__circle_disabled");
             if (disabled) disabled.classList.remove("dropdown__circle_disabled");   
        } else {
            span.textContent = Math.max(--value, 0);   
            if (value == 0) e.target.classList.add("dropdown__circle_disabled")         
        }        
    })

    item.addEventListener("mousedown", (e) => e.preventDefault()); //убираем выделение        
}