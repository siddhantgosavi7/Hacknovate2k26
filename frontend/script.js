// @ts-nocheck
async function analyzeWaste() {

    const response = await fetch(
        "http://localhost:3000/analyze",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                item: "Bottle"
            })
        }
    );

    const data = await response.json();

    console.log(data);

    document.getElementById("result").innerText =
        `${data.waste} | Eco Score: ${data.ecoScore}`;

}