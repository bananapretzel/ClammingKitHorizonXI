const fieldset = document.getElementsByTagName("fieldset");
const bucketWeightDisplay = document.getElementById("bucket-weight");
let bucketWeight = Number(bucketWeightDisplay.textContent);

fieldset[0].addEventListener("click", function(event) {
    const target = event.target;
    if (target.classList.contains("item")) {
        const weightString = target.getAttribute("data-action");
        const weightNum = weightString.match(/\d+/);
        bucketWeight += Number(weightNum);
        bucketWeightDisplay.textContent = bucketWeight;
        console.log(bucketWeight);
    }
});