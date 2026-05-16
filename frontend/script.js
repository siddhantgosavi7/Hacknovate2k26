// @ts-nocheck
async function analyzeWaste() {

    const item = document.getElementById("wasteInput").value;
    console.log(item);

    const response = await fetch(
        "http://localhost:3000/analyze",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                item: item
            })
        }
    );

    const data = await response.json();

    console.log(data);

    document.getElementById("result").innerHTML = `
    <h2>${data.waste}</h2>
    <p>Eco Score: ${data.ecoScore}</p>
    <p>Guidance: ${data.guidance}</p>
    <p>Points Earned: +${data.pointsEarned}</p>
    <p>Confidence: ${data.confidence}</p>
    <p>Carbon Saved: ${data.carbonSaved}</p>
`;

}