const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const saveResults = require("./saveResults");
const getResults = require("./getResults");

const app = express();
const port = process.env.PORT || 3000;

// CORS Middleware mit spezifischer Domain
app.use(cors({
    origin: "https://reviergold.de", // Erlaubter Ursprung
    methods: ["GET", "POST", "OPTIONS"], // Zulässige Methoden
    allowedHeaders: ["Content-Type", "Authorization"], // Zulässige Header
    credentials: true, // Wenn Cookies übermittelt werden
}));

// Preflight-Anfrage (OPTIONS) beantworten
app.options("/api/saveResults", (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://reviergold.de");
    res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200); // Erfolgreiche Antwort auf OPTIONS
});

// Middleware für JSON-Verarbeitung
app.use(bodyParser.json());

// Grundlegende Route
app.get("/", (req, res) => {
    res.send("Server läuft! Willkommen bei deinem Node.js-Projekt.");
});

// API-Routen
app.post("/api/saveResults", saveResults);
app.get("/api/getResults", getResults);

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
