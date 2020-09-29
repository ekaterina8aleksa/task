const input = document.querySelector(".js-input");
const createBtn = document.querySelector('button[data-action="create"]');
const clearBtn = document.querySelector('button[data-action="destroy"]');
const boxesDiv = document.getElementById("boxes");

const createBoxes = (amount) => {
    const setRGB = () => {
        const red = Math.round(Math.random(0, 1) * 255);
        const green = Math.round(Math.random(0, 1) * 255);
        const blue = Math.round(Math.random(0, 1) * 255);

        return `rgb(${red},${green},${blue})`;
    };
    amount = input.value;

    const boxesArr = [];

    for (let i = 0; i < amount; i += 1) {
        const divSize = 30;
        let growingSize = divSize + i * 10;
        const boxItem = `<div style="width:${growingSize}px;
    height:${growingSize}px;
    background-color:${setRGB()}" ></div>`;
        boxesArr.push(boxItem);
    }

    boxesDiv.insertAdjacentHTML("afterbegin", boxesArr.join(""));
};

const destroyBoxes = () => {
    boxesDiv.innerHTML = "";
    input.value = "";
};

createBtn.addEventListener("click", createBoxes);
clearBtn.addEventListener("click", destroyBoxes);
