// Update the display for the current slider values
function updateValue(id, value) {
    document.getElementById(id).textContent = value;
}

// Send the data to the backend and get the prediction
async function submitData() {
    const volatile_acidity = document.getElementById("volatile_acidity").value;
    const sulphates = document.getElementById("sulphates").value;
    const alcohol = document.getElementById("alcohol").value;

    const response = await fetch("/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            volatile_acidity: parseFloat(volatile_acidity),
            sulphates: parseFloat(sulphates),
            alcohol: parseFloat(alcohol)
        })
    });

    const result = await response.json();
    document.getElementById("result").textContent = "Predicted Wine Quality: " + result.prediction;
}
