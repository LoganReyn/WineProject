// Update the display for the current slider values
function updateValue(id, value) {
    const element = document.getElementById(id);
    element.textContent = parseFloat(value).toFixed(2);
    // Trigger prediction on every slider change for real-time updates
    submitData();
}

// Send the data to the backend and get the prediction
async function submitData() {
    const volatile_acidity = document.getElementById("volatile_acidity").value;
    const sulphates = document.getElementById("sulphates").value;
    const alcohol = document.getElementById("alcohol").value;
    
    try {
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
        const resultElement = document.getElementById("result");
        
        // Update prediction result with animation and styling
        resultElement.style.opacity = '0';
        
        setTimeout(() => {
            resultElement.textContent = result.prediction;
            resultElement.className = 'prediction-result ' + 
                (result.prediction.toLowerCase().includes('good') ? 'good' : 'bad');
            resultElement.style.opacity = '1';
        }, 150);

    } catch (error) {
        console.error('Error:', error);
        document.getElementById("result").textContent = "Error getting prediction";
    }
}

// Initialize the prediction on page load
document.addEventListener('DOMContentLoaded', submitData);