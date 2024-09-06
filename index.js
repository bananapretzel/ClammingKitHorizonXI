const fieldset = document.querySelector("fieldset");
const bucketWeightDisplay = document.getElementById("bucket-weight");
const emptyBtn = document.getElementById("empty");
const removeBtn = document.getElementById("remove");
const bucketContents = document.getElementById("bucket-contents");
const valueDisplay = document.getElementById("value");
const bucketElement = document.getElementById("bucket-img");
const sidePanelToggle = document.querySelector(".side-panel-toggle");
const darkModeToggle = document.getElementById('darkmode-toggle');
const body = document.body;


let totalValue = Number(valueDisplay.textContent);
let bucketWeight = Number(bucketWeightDisplay.textContent);

const SOUNDS = {
     trash: new Audio("./assets/sounds/Coins_02.WAV"),
     slightlyTrash: new Audio("./assets/sounds/Coins_04.WAV"),
     money: new Audio("./assets/sounds/Coins_10.WAV"),
     goodMoney: new Audio("./assets/sounds/Coins_12.WAV"),
     rich: new Audio("./assets/sounds/Coins_14.WAV"),
     oxblood: new Audio("./assets/sounds/Coins_15.WAV"),
};

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
        playSound(itemName);
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
    if (value <= 250) return COLOURS.trash;
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
    
    if (weight <= 0) {
        bucketElement.style.stroke = bucketElement.style.fill = 
        darkModeToggle.checked ? "white" : "black";
    } else if (normaliseMod(weight - redBase, interval) <= 5) {
        bucketElement.style.fill = bucketElement.style.stroke = "red";
    } else if (Math.abs(weight - orangeBase) % interval === 0) {
        bucketElement.style.stroke = bucketElement.style.fill = "darkorange";
    } else if (normaliseMod(weight - yellowBase, interval) <= 3) {
        bucketElement.style.stroke = bucketElement.style.fill = "gold";
    } else {
        bucketElement.style.stroke = bucketElement.style.fill = 
        darkModeToggle.checked ? "white" : "black";
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

    if (darkModeToggle.checked) {
        if (value <= 0) {
            const modifier = normaliseValue(value, min, breakEven);
            red = 255;
            green = Math.round(255 * modifier);
            blue = Math.round(255 * modifier);         
        } else {
            const modifier = normaliseValue(value, breakEven, max);
            red = Math.round(255 * (1 - modifier));
            green= 255;
            blue = Math.round(255 * (1 - modifier));
        }
    } else {
        if (value <= 0) {
            const modifier = normaliseValue(value, min, breakEven);
            red = Math.round(255 * (1 - modifier));
        } else {
            const modifier = normaliseValue(value, breakEven, max);
            red = Math.round(50 * modifier);
            green = Math.round(200 * modifier);
            blue = Math.round(50 * modifier);
        }
    }
    valueDisplay.style.color = `rgb(${red}, ${green}, ${blue})`;
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

/**
 * Handles the dark mode toggle switch.
 * Toggles the 'dark-mode' class on the body element and updates the 
 * visual indicators (profit gradient and bucket warning color) accordingly.
 * 
 * @returns {void}
 */
darkModeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode', darkModeToggle.checked);
    updateWarningColour(bucketWeight);
    updateProfitGradient(totalValue);
});

/**
 * Handles the side panel toggle button click.
 * Opens or closes the side panel by adjusting its position and 
 * moves the toggle button accordingly.
 * 
 * @returns {void}
 */
sidePanelToggle.addEventListener("click", () => {
    const sidePanel = document.querySelector(".side-panel");

    if (sidePanel.style.right === "0px") {
        // Close the side panel
        sidePanel.style.right = "-340px";
        sidePanelToggle.style.right = "0px"; // Reset toggle button position
    } else {
        // Open the side panel
        sidePanel.style.right = "0px";
        sidePanelToggle.style.right = "340px"; // Move toggle button with the panel
    }
});

/**
 * Plays the appropriate sound based on the item's value.
 * 
 * @param {string} itemName - The name of the item whose value determines the sound to play.
 * @returns {void}
 */
function playSound (itemName) {
    const itemValue = ITEM_VALUES[itemName].value;
    let sound;

    
    if (itemValue <= 250) sound = SOUNDS.trash;
    else if (itemValue <= 1000) sound = SOUNDS.slightlyTrash;
    else if (itemValue <= 2000) sound = SOUNDS.money;
    else if (itemValue <= 5000) sound = SOUNDS.goodMoney;
    else if (itemValue <= 10000) sound = SOUNDS.rich;
    else sound = SOUNDS.oxblood;

    const soundClone = sound.cloneNode(); 
    soundClone.volume = 0.3;
    soundClone.play();
}

/**
 * Initializes the dark mode state when the DOM is fully loaded.
 * Adds or removes the 'dark-mode' class based on the current state 
 * of the dark mode toggle.
 * 
 * @returns {void}
 */
document.addEventListener('DOMContentLoaded', () => {
    darkModeToggle.checked ? body.classList.add('dark-mode') : 
    body.classList.remove('dark-mode');
});
