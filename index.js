const fieldset = document.querySelector("fieldset");
const bucketWeightDisplay = document.getElementById("bucket-weight");
const emptyBtn = document.getElementById("empty");
const removeBtn = document.getElementById("remove");
const bucketContents = document.getElementById("bucket-contents");
const valueDisplay = document.getElementById("value");
const bucketElement = document.getElementById("bucket-img");


let totalValue = Number(valueDisplay.textContent);
let bucketWeight = Number(bucketWeightDisplay.textContent);

const COLOURS = {
    trash: "#c0c0c0",
    slightlyTrash: "#37AEE2",
    money: "#11ca01",
    goodMoney: "#FFD700",
    rich: "#a400da",
    oxblood: "#e01c1c",
};

const ITEM_VALUES = {
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
};

/**
 * Handles click events on the fieldset element.
 * If the clicked element has the class "item", it updates the bucket with the 
 * item's information, updates the total value and weight, and adjusts the 
 * visual indicators.
 * 
 * @param {MouseEvent} event - The click event object.
 */
fieldset.addEventListener("click", (event) => {
    const itemName = event.target.textContent;
    if (event.target.classList.contains("item")) {
        addToBucket(itemName);
        updateValues(itemName);
        updateProfitGradient(totalValue);
        updateWarningColour(bucketWeight);
    }
});

/**
 * Adds an item to the bucket and updates the display.
 * Creates a new `div` element for the item, sets its text and background colour 
 * based on the item's value, and appends it to the `bucketContents` element. 
 * Updates the bucket's weight and total value accordingly.
 * 
 * @param {string} itemName - The name of the item to add to the bucket.
 * @returns {void}
 */
function addToBucket(itemName) {
    const itemElement = document.createElement("div");
    itemElement.textContent = itemName;
    itemElement.classList.add("bucket-item");
    
    const { value } = ITEM_VALUES[itemName];
    itemElement.style.backgroundColor = getItemColour(value);
    itemElement.style.color = "white";
    itemElement.style.textShadow = "1px 1px 2px rgba(0, 0, 0, 1)";
    itemElement.style.width = "150px"
    
    
    bucketContents.appendChild(itemElement);
    bucketContents.scrollTop = -bucketContents.scrollHeight;
}

/**
 * Returns the colour associated with the given item value.
 * The colour is determined based on predefined value ranges.
 * 
 * @param {number} value - The value of the item to determine the color for.
 * @returns {string} The color code associated with the given item value.
 */
function getItemColour(value) {
    if (value < 250) return COLOURS.trash;
    if (value <= 1000) return COLOURS.slightlyTrash;
    if (value <= 2000) return COLOURS.money;
    if (value <= 5000) return COLOURS.goodMoney;
    if (value <= 10000) return COLOURS.rich;
    return COLOURS.oxblood;
}

/**
 * Updates the bucket's total value and weight displays based on the given item name.
 * 
 * @param {string} itemName - The name of the item to update.
 * @returns {void}
 */
function updateValues(itemName) {
    const { weight, value } = ITEM_VALUES[itemName];
    bucketWeight += weight;
    totalValue += value;
    
    bucketWeightDisplay.textContent = bucketWeight;
    valueDisplay.textContent = totalValue;
}

/**
 * Clears the bucket by resetting weight, value, and removing all items from the 
 * bucket contents. Also updates the display to reflect the changes.
 * 
 * @returns {void}
 */
emptyBtn.addEventListener("click", () => {
    bucketWeight = 0;
    totalValue = -500;
    
    bucketWeightDisplay.textContent = bucketWeight;
    bucketContents.innerHTML = "";
    updateWarningColour(bucketWeight);
    
    valueDisplay.textContent = totalValue;
    valueDisplay.style.color = "red";
});

/**
 * Removes the last item from the bucket and updates the weight and value displays.
 * Adjusts the profit gradient and warning color based on the new total value 
 * and weight.
 * 
 * @returns {void}
 */
removeBtn.addEventListener("click", () => {
    const lastChild = bucketContents.lastChild;
    if (lastChild) {
        const itemName = lastChild.textContent;
        const { value, weight } = ITEM_VALUES[itemName];
        
        bucketContents.removeChild(lastChild);
        bucketWeight -= weight;
        totalValue -= value;
        
        bucketWeightDisplay.textContent = bucketWeight;
        valueDisplay.textContent = totalValue;
        updateProfitGradient(totalValue);
        updateWarningColour(bucketWeight);
    }
});

/**
 * Updates the colour of the bucket vector display based on the current weight.
 * 
 * @param {number} number - The current weight to check against thresholds.
 * @returns {void}
 */
function updateWarningColour(weight) {
    const redBase = 45;
    const yellowBase = 40;
    const orangeBase = 44;
    const interval = 50;
    const darkModeToggle = document.getElementById('darkmode-toggle');
    
    if (weight <= 0) {
        if (darkModeToggle.checked) {
            bucketElement.style.stroke = "white";
            bucketElement.style.fill = "white";
        } else {
            bucketElement.style.stroke = "black";
            bucketElement.style.fill = "black";
        }
        
    } else if (normaliseMod(weight - redBase, interval) <= 5) {
        bucketElement.style.fill = "red";
        bucketElement.style.stroke = "red";
    } else if (Math.abs(weight - orangeBase) % interval === 0) {
        bucketElement.style.stroke = "darkorange";
        bucketElement.style.fill = "darkorange";
    } else if (normaliseMod(weight - yellowBase, interval) <= 3) {
        bucketElement.style.stroke = "gold";
        bucketElement.style.fill = "gold";
    } else {
        if (darkModeToggle.checked) {
            bucketElement.style.stroke = "white";
            bucketElement.style.fill = "white";
        } else {
            bucketElement.style.stroke = "black";
            bucketElement.style.fill = "black";
        }
    }
}

/**
 * Updates the text colour of the value display based on the current total value.
 * 
 * @param {number} value - The current total value to determine the colour.
 * @returns {void}
 */
function updateProfitGradient(value) {
    const min = -500;
    const breakEven = 0;
    const max = 4000;

    let red, green, blue = 0;
    if (value <= 0) {
        const modifier = normaliseValue(value, min, breakEven);
        red = Math.round(255 * (1 - modifier));
        green = 0;
    } else {
        const modifier = normaliseValue(value, breakEven, max);
        red = Math.round(50 * modifier);
        green = Math.round(200 * modifier);
        blue = Math.round(50 * modifier);
    }

    const colour = `rgb(${red}, ${green}, ${blue})`;
    valueDisplay.style.color = colour;
}

/**
 * Normalizes a value within a given range.
 * 
 * @param {number} value - The value to normalize.
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @returns {number} - The normalized value between 0 and 1.
 */
function normaliseValue(value, min, max) {
    const normalised = (value - min) / (max - min);
    return Math.min(Math.max(normalised, 0), 1);
}

/**
 * Returns the result of the modulo operation with a positive result, even if 
 * the dividend is negative.
 * 
 * @param {number} dividend - The value to be divided.
 * @param {number} divisor - The value to divide by.
 * @returns {number} - The non-negative result of the modulo operation.
 */
function normaliseMod(dividend, divisor) {
    return ((dividend % divisor) + divisor) % divisor;
}

document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkmode-toggle');
    const body = document.body;

    // Load saved dark mode preference from localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
        updateWarningColour(bucketWeight);
    });
});


