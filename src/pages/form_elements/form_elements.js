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


//dromdown обработчики
let dropdown = document.getElementsByClassName("dropdown");
for (let item of dropdown) {
    let input = item.getElementsByClassName("dropdown__input")[0];
    let container = item.getElementsByClassName("dropdown__container")[0];

    input.addEventListener("click", function (e) {
        container.classList.toggle("dropdown__container_expanded");
        this.classList.toggle("dropdown__input_expanded");
    });

    container.addEventListener("click", function (e) {
        if (!e.target.classList.contains("dropdown__circle")) return;

        let operation = e.target.dataset.direction;
        let span = e.target.parentNode.querySelector("span");
        let value = +span.textContent;
        let dataItem = span.dataset.item;

        if (operation == "+") {
            if (value < 5) { //максимальное к-во элементов
                span.textContent = ++value;
            }

            let disabled = e.target.parentNode.querySelector(".dropdown__circle_disabled");
            if (disabled) disabled.classList.remove("dropdown__circle_disabled");
        } else {
            span.textContent = Math.max(--value, 0);
            if (value == 0) e.target.classList.add("dropdown__circle_disabled")
        }

        if (item.inputContentRender) item.inputContentRender();

    });

    item.addEventListener("mousedown", (e) => e.preventDefault()); //убираем выделение  
}

let roomsDropdown = document.querySelector(".dropdown[data-name = 'rooms']");

roomsDropdown.inputContentRender = function () {
    let input = this.getElementsByTagName("span")[0];
    let roomsNum = +this.querySelector("span[data-item = 'rooms_num']").textContent;
    let bedsNum = +this.querySelector("span[data-item = 'beds_num']").textContent;
    let bathroomsNum = +this.querySelector("span[data-item = 'bathrooms_num']").textContent;

    let roomsEnds = ["ен", "ьня", "ьни", "ьни", "ьни", "ен"];
    let bedsEnds = ["ей", "ь", "и", "и", "и", "ей"];

    input.textContent = `${roomsNum} спал${roomsEnds[roomsNum]}, ${bedsNum} кроват${bedsEnds[bedsNum]}...`;
};

//переписать потом для другой архитектуры (для отдельного файла)
let guestsDropdown = document.querySelector(".dropdown[data-name = 'guests']");
let applyButton = guestsDropdown.querySelector(".dropdown__button-apply");
let resetButton = guestsDropdown.querySelector(".dropdown__button-reset");

applyButton.addEventListener("click", sendDataToServer);
resetButton.addEventListener("click", cleanInput)

guestsDropdown.inputContentRender = function() {
    let input = this.getElementsByTagName("span")[0];
    let adultsNum = +this.querySelector("span[data-item = 'adults_num']").textContent;
    let kidsNum = +this.querySelector("span[data-item = 'kids_num']").textContent;
    let babiesNum = +this.querySelector("span[data-item = 'babies_num']").textContent;

    let guestsEnds = ["ей","ь","я","я","я","ей","ей","ей","ей","ей","ей"];

    input.textContent = `${adultsNum + kidsNum} гост${guestsEnds[adultsNum + kidsNum]}`;
    resetButton.hidden = false;
};

function cleanInput() {
    this.hidden = true;
    let input = guestsDropdown.getElementsByTagName("span")[0];
    let adults = guestsDropdown.querySelector("span[data-item = 'adults_num']");
    let kids = guestsDropdown.querySelector("span[data-item = 'kids_num']");
    let babies = guestsDropdown.querySelector("span[data-item = 'babies_num']");

    input.textContent = "Сколько гостей";
    adults.textContent = kids.textContent = babies.textContent = 0;
}

function sendDataToServer() {
    console.log("sending data to server");
}
