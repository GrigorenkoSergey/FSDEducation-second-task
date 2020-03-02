//dromdown обработчики
let dropdown = document.getElementsByClassName("dropdown");
for (let item of dropdown) {
    let input = item.getElementsByClassName("dropdown__input")[0];
    let container = item.getElementsByClassName("dropdown__container")[0];

    input.addEventListener("click", function (e) {
        container.classList.toggle("dropdown__container_expanded");
        this.classList.toggle("dropdown__input_expanded");

        document.addEventListener("click", handleClickOutsideBlock);

        function handleClickOutsideBlock(e) {
            if (e.target.closest(".dropdown")) return;

            document.removeEventListener("click", handleClickOutsideBlock);
            input.classList.remove("dropdown__input_expanded");
            container.classList.remove("dropdown__container_expanded");
        }
    });

    container.addEventListener("click", function (e) {
        if (!e.target.classList.contains("dropdown__circle")) return;

        let operation = e.target.dataset.direction;
        let span = e.target.parentNode.querySelector("span");
        let value = +span.textContent;
        let dataItem = span.dataset.item;

        if (operation == "+") {
            if (value < 10) { //максимальное к-во элементов
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


let roomsDropdownArr = document.querySelectorAll(".dropdown[data-name = 'rooms']");

for (let item of roomsDropdownArr) {
    item.inputContentRender = function () {
        let input = this.getElementsByTagName("span")[0];
        let roomsNum = +this.querySelector("span[data-item = 'rooms_num']").textContent;
        let bedsNum = +this.querySelector("span[data-item = 'beds_num']").textContent;
        let bathroomsNum = +this.querySelector("span[data-item = 'bathrooms_num']").textContent;

        let roomsSuffix = ["ен", "ьня", "ьни", "ьни", "ьни", "ен"];
        let bedsSuffix = ["ей", "ь", "и", "и", "и", "ей"];

        input.textContent = `${roomsNum} спал${roomsSuffix[roomsNum]}, ${bedsNum} кроват${bedsSuffix[bedsNum]}...`;
    }
}

let guestsDropdownArr = document.querySelectorAll(".dropdown[data-name = 'guests']");

for (item of guestsDropdownArr) {
    let applyButton = item.querySelector(".dropdown__button-apply");
    let resetButton = item.querySelector(".dropdown__button-reset");
    let input = item.getElementsByTagName("span")[0];

    applyButton.addEventListener("click", sendDataToServer);
    resetButton.addEventListener("click", cleanInput)

    item.inputContentRender = function () {
        let adultsNum = +this.querySelector("span[data-item = 'adults_num']").textContent;
        let kidsNum = +this.querySelector("span[data-item = 'kids_num']").textContent;
        let babiesNum = +this.querySelector("span[data-item = 'babies_num']").textContent;

        let guestsSuffix = ["ей", "ь", "я", "я", "я", "ей", "ей", "ей", "ей", "ей", "ей", "ей"];
        let babiesSuffix = ["", "ец", "ца", "ца", "ца", "цев", "цев", "цев", "цев", "цев", "цев"];

        let inputTextContent = `${adultsNum + kidsNum} гост${guestsSuffix[adultsNum + kidsNum]}`;
        if (babiesNum > 0) {
            inputTextContent += `, ${babiesNum} младен${babiesSuffix[babiesNum]}`;
        }
    
        input.textContent = inputTextContent;
        resetButton.hidden = false;
    };

    function cleanInput() {
        this.hidden = true;
        let adults = item.querySelector("span[data-item = 'adults_num']");
        let kids = item.querySelector("span[data-item = 'kids_num']");
        let babies = item.querySelector("span[data-item = 'babies_num']");

        input.textContent = "Сколько гостей";
        adults.textContent = kids.textContent = babies.textContent = 0;
    }

    function sendDataToServer() {
        console.log("sending data to server");
    }
}