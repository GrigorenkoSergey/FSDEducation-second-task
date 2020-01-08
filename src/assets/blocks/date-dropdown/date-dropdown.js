
  module.exports = (instanse) => {
        let container = instanse.el.parentNode.querySelector(".qs-datepicker-container");

        //Подвинем на 5.56 пикселей ниже и сгенерируем кнопки
        rerenderContainer();

        function rerenderContainer() {
            container.style.top = parseFloat(container.style.top) + 5.56 + "px";
            renderButtons();
        }

        function renderButtons() {
            let buttonsContainer = document.createElement("div");

            buttonsContainer.classList.add('date-dropdown__buttons');
            let buttonReset = document.createElement("div");
            let buttonApply = document.createElement("div");

            buttonReset.classList.add("date-dropdown__button-reset")
            buttonApply.classList.add("date-dropdown__button-apply")

            buttonReset.innerHTML = "Очистить";
            buttonApply.innerHTML = "Применить";

            buttonsContainer.appendChild(buttonReset);
            buttonsContainer.appendChild(buttonApply);

            container.appendChild(buttonsContainer);

            buttonReset.addEventListener("click", buttonResetClickHandler);
            buttonApply.addEventListener("click", buttonApplyClickHandler);

            function buttonResetClickHandler(e) {
                instanse.setDate();
                instanse.el.value = "ДД.ММ.ГГГГ.";                
            }

            function buttonApplyClickHandler(e) {
                console.log("sending data to server");
            }
        }

    }
