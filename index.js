const fieldset = document.getElementsByTagName("fieldset");
const bucketWeightDisplay = document.getElementById("bucket-weight");
const emptyBtn = document.getElementById("empty");
const removeBtn = document.getElementById("remove");
const bucketContents = document.getElementById("bucket-contents");
const valueDisplay = document.getElementById("value");
let totalValue = Number(valueDisplay.textContent);
let bucketWeight = Number(bucketWeightDisplay.textContent);

const valuesMap = {
    "Pebble": 1,
    "Bibiki Slug": 10,
    "Jacknife": 56,
    "Pamtam Kelp": 7,
    "Vongola Clam": 192,
    "Shall Shell": 307,
    "Fish Scales": 23,
    "Pugil Scales": 23,
    "White Sand": 250,
    "Seashell": 30,
    "Nebimonite": 53,
    "Hobgoblin Bread": 91,
    "Hobgoblin Pie": 153,
    "Bkn. Willow Fish. Rod": 0,
    "Goblin Mask": 0,
    "Goblin Armour": 0,
    "Goblin Mail": 0,
    "Crab Shell": 392,
    "H.Q. Pugil Scales": 253,
    "Tropical Clam": 5100,
    "Maple Log": 15,
    "Titanictus Shell": 357,
    "Bibiki Urchin": 750,
    "Coral Fragment": 1735,
    "Turtle Shell": 1190,
    "Urganite Shell": 1455,
    "Lacquer Tree Log": 3578,
    "Elm Log": 390,
    "Petrified Log": 2193,
    "H.Q. Crab Shell": 3312,
    "Oxblood": 13250,
}



fieldset[0].addEventListener("click", function(event) {
    const target = event.target;

    if (target.classList.contains("item")) {
        const weightString = target.getAttribute("data-action");
        const weightNum = weightString.match(/\d+/);
        const itemElement = document.createElement("div");

        bucketWeight += Number(weightNum);
        bucketWeightDisplay.textContent = bucketWeight;
        applyColour(bucketWeight);
        itemElement.textContent = target.textContent;;
        bucketContents.appendChild(itemElement);
        totalValue += valuesMap[target.textContent];
        valueDisplay.textContent = totalValue;
        updateGradient(totalValue)
        
    }
});

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
    
});

function applyColour(number) {
    const redRangeSize = 5;
    const yellowRangeSize = 3;
    const interval = 50;
    const redBase = 45;
    const yellowBase = 40;
    const orangeBase = 44;

    
    if ((normaliseMod((number - redBase), interval) < redRangeSize)) {
        bucketWeightDisplay.style.backgroundColor = "red";
    } else if (Math.abs(number - orangeBase) % interval === 0) {
        bucketWeightDisplay.style.backgroundColor = "orange";
    } else if ((normaliseMod((number - yellowBase), 
                              interval) < yellowRangeSize)) {
        bucketWeightDisplay.style.backgroundColor = "lightgoldenrodyellow";
    } else {
        bucketWeightDisplay.style.backgroundColor = "transparent";
    }
}

function updateGradient(value) {
    const min = -500;
    const breakEven = 0;
    const max = 2000;

    // Normalize the value to a range from 0 to 1
    const normalizedValue = (value - min) / (max - min);
    
    // Compute the color based on normalized value
    let red, green, blue = 0;

    if (value <= 0) {
        const modifier = normaliseValue(value, min, breakEven);
        red = Math.round(255 * (1 - Math.abs(modifier)));
        green = Math.round(0 * (1 - Math.abs(modifier)));
    } else {
        // Transition from black to green
        const modifier = normaliseValue(value, breakEven, max);
        red = Math.round(0 + 0 * normalizedValue);
        green = Math.round(0 + 255 * normalizedValue);  
    }

    // Set the color of the number
    const color = `rgb(${red}, ${green}, ${blue})`;
    document.getElementById('value').style.color = color;
    
}

function normaliseValue(value, min, max) {
    return (value - min) / (max - min);
}

// Getting modulo from negative numbers is weird, this will fix it.
function normaliseMod (dividend, divisor) {
    return ((dividend % divisor) + divisor) % divisor;
}

