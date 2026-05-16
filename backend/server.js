const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {

    const item = req.body.item;

    res.json({
        waste: "Plastic Bottle",
        recyclable: true,
        ecoScore: 87,
        guidance: "Use Blue Bin"
    });

});

app.listen(3000, () => {
    console.log("Server running");
});
