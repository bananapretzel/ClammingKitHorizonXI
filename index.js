const fieldset = document.getElementsByTagName("fieldset");
const bucketWeightDisplay = document.getElementById("bucket-weight");
const emptyBtn = document.getElementById("empty");
const removeBtn = document.getElementById("remove");
const bucketContents = document.getElementById("bucket-contents");
const valueDisplay = document.getElementById("value");
let totalValue = Number(valueDisplay.textContent);
let bucketWeight = Number(bucketWeightDisplay.textContent);

const trashColour = "#c0c0c0";
const slightlyTrashColour = "#37AEE2";
const moneyColour = "#11ca01";
const goodMoneyColour = "#FFD700";
const richColour = "#a400da";
const oxbloodColour = "#e01c1c";

const valuesMap = {
    "Pebble": { weight: 7, value: 1 },
    "Bibiki Slug": { weight: 3, value: 10 },
    "Jacknife": { weight: 11, value: 56 },
    "Pamtam Kelp": { weight: 6, value: 7 },
    "Vongola Clam": { weight: 6, value: 192 },
    "Shall Shell": { weight: 6, value: 307 },
    "Fish Scales": { weight: 3, value: 23 },
    "Pugil Scales": { weight: 3, value: 23 },
    "White Sand": { weight: 7, value: 250 },
    "Seashell": { weight: 6, value: 30 },
    "Nebimonite": { weight: 6, value: 53 },
    "Hobgoblin Bread": { weight: 6, value: 91 },
    "Hobgoblin Pie": { weight: 6, value: 153 },
    "Bkn. Willow Fish. Rod": { weight: 6, value: 0 },
    "Goblin Mask": { weight: 6, value: 0 },
    "Goblin Armour": { weight: 6, value: 0 },
    "Goblin Mail": { weight: 6, value: 0 },
    "Crab Shell": { weight: 6, value: 392 },
    "H.Q. Pugil Scales": { weight: 6, value: 253 },
    "Tropical Clam": { weight: 20, value: 5100 },
    "Maple Log": { weight: 6, value: 15 },
    "Titanictus Shell": { weight: 6, value: 357 },
    "Bibiki Urchin": { weight: 6, value: 750 },
    "Coral Fragment": { weight: 6, value: 1735 },
    "Turtle Shell": { weight: 6, value: 1190 },
    "Urganite Shell": { weight: 6, value: 1455 },
    "Lacquer Tree Log": { weight: 6, value: 3578 },
    "Elm Log": { weight: 6, value: 390 },
    "Petrified Log": { weight: 6, value: 2193 },
    "H.Q. Crab Shell": { weight: 6, value: 3312 },
    "Oxblood": { weight: 6, value: 13250 },
}



fieldset[0].addEventListener("click", function (event) {

    const itemName = event.target.textContent;

    if (event.target.classList.contains("item")) {
        addToBucket(itemName);
        updateValues(itemName);
        updateProfitGradient(totalValue);
        updateWarningColour(bucketWeight);

    }
});

function addToBucket(itemName) {
    const itemElement = document.createElement("div");
    itemElement.textContent = itemName;
    itemElement.classList.add("bucket-item");
    const itemValue = valuesMap[itemName].value;
    if (itemValue < 250) {
        itemElement.style.backgroundColor = trashColour;
    } else if (itemValue >= 250 && itemValue <= 1000) {
        itemElement.style.backgroundColor = slightlyTrashColour;
    } else if (itemValue > 1000 && itemValue <= 2000) {
        itemElement.style.backgroundColor = moneyColour;
    } else if (itemValue > 2000 && itemValue <= 5000) {
        itemElement.style.backgroundColor = goodMoneyColour;
    } else if (itemValue > 5000 && itemValue <= 10000) {
        itemElement.style.backgroundColor = richColour;
    } else {
        itemElement.style.backgroundColor = oxbloodColour;
    }

    bucketContents.appendChild(itemElement);
    bucketContents.scrollTop = -bucketContents.scrollHeight;
}

function updateValues(itemName) {

    bucketWeight += valuesMap[itemName].weight;
    bucketWeightDisplay.textContent = bucketWeight;
    totalValue += valuesMap[itemName].value;
    valueDisplay.textContent = totalValue;

}

emptyBtn.addEventListener("click", () => {
    bucketWeight = 0;
    bucketWeightDisplay.textContent = bucketWeight;
    bucketContents.innerHTML = "";
    bucketWeightDisplay.style.backgroundColor = "transparent";
    totalValue = -500;
    valueDisplay.textContent = totalValue;
    valueDisplay.style.color = "red";

});

removeBtn.addEventListener("click", () => {
    const lastChild = bucketContents.lastChild;
    if (lastChild) {
        const itemValue = valuesMap[lastChild.textContent].value;
        const itemWeight = valuesMap[lastChild.textContent].weight;
        

        bucketContents.removeChild(lastChild);
        bucketWeight -= itemWeight;
        totalValue -= itemValue;
        valueDisplay.textContent = totalValue;
        bucketWeightDisplay.textContent = bucketWeight;
        updateProfitGradient(totalValue);
        updateWarningColour(bucketWeight);


    }


});

function updateWarningColour(number) {
    const redRangeSize = 5;
    const yellowRangeSize = 3;
    const interval = 50;
    const redBase = 45;
    const yellowBase = 40;
    const orangeBase = 44;

    if ((normaliseMod((number - redBase), interval) <= redRangeSize)) {
        bucketWeightDisplay.style.backgroundColor = "red";
    } else if (Math.abs(number - orangeBase) % interval === 0) {
        bucketWeightDisplay.style.backgroundColor = "orange";
    } else if ((normaliseMod((number - yellowBase),
        interval) <= yellowRangeSize)) {
        bucketWeightDisplay.style.backgroundColor = "lightgoldenrodyellow";
    } else {
        bucketWeightDisplay.style.backgroundColor = "transparent";
    }
}

function updateProfitGradient(value) {
    const min = -500;
    const breakEven = 0;
    const max = 4000;

    // Compute the color based on normalized value
    let red, green, blue = 0;

    if (value <= 0) {
        const modifier = normaliseValue(value, min, breakEven);
        red = Math.round(255 * (1 - modifier));
        green = Math.round(0 * (1 - modifier));
    } else {
        // Transition from black to green
        const modifier = normaliseValue(value, breakEven, max);
        red = Math.round(50 * modifier);
        green = Math.round(200 * modifier);
        blue = Math.round(50 * modifier);
    }

    // Set the color of the number
    const color = `rgb(${red}, ${green}, ${blue})`;
    document.getElementById('value').style.color = color;

}

function normaliseValue(value, min, max) {
    const beforeClamp = (value - min) / (max - min);
    return Math.min(Math.max(beforeClamp, 0), 1)
}

// Getting modulo from negative numbers is weird, this will fix it.
function normaliseMod(dividend, divisor) {
    return ((dividend % divisor) + divisor) % divisor;
}


