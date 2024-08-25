const fieldset = document.getElementsByTagName("fieldset");
const bucketWeightDisplay = document.getElementById("bucket-weight");
const emptyBtn = document.getElementById("empty");
const removeBtn = document.getElementById("remove");
const bucketContents = document.getElementById("bucket-contents");
let bucketWeight = Number(bucketWeightDisplay.textContent);

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
        
    }
});

emptyBtn.addEventListener("click", () => {
    bucketWeight = 0;
    bucketWeightDisplay.textContent = bucketWeight;
    bucketContents.innerHTML = "";
    bucketWeightDisplay.style.backgroundColor = "transparent";
    
});

removeBtn.addEventListener("click", () => {
    
});

function applyColour(number) {
    const redRangeSize = 5;
    const yellowRangeSize = 3;
    const interval = 50;
    const redBase = 45;
    const yellowBase = 40;

    
    if ((normaliseMod((number - redBase), interval) < redRangeSize)) {
        
        bucketWeightDisplay.style.backgroundColor = "red";
    } else if (Math.abs(number - 44 === 0) % interval) {
        bucketWeightDisplay.style.backgroundColor = "orange";
    } else if ((normaliseMod((number - yellowBase), 
                              interval) < yellowRangeSize)) {
        bucketWeightDisplay.style.backgroundColor = "lightgoldenrodyellow";
    } else {
        bucketWeightDisplay.style.backgroundColor = "transparent";
    }

}

// Getting modulo from negative numbers is weird, this will fix it.
function normaliseMod (dividend, divisor) {
    return ((dividend % divisor) + divisor) % divisor;
}

