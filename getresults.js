const { createClient } = require("@supabase/supabase-js");

// Supabase-Daten
const supabaseUrl = "https://ltzvbzpeplnjlokvbuit.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0enZienBlcGxuamxva3ZidWl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1Mjc5MjksImV4cCI6MjA0ODEwMzkyOX0.7iXtEDPdsQIko7wvn7p5m922FOR5WLE96cYbt2lm2GY";
const supabase = createClient(supabaseUrl, supabaseKey);

const getResults = async (req, res) => {
    try {
        const { data, error } = await supabase.from("results").select("*");

        if (error) {
            console.error("Fehler beim Abrufen der Ergebnisse:", error);
            return res.status(500).send("Fehler beim Abrufen der Ergebnisse.");
        }

        res.status(200).send(data);
    } catch (err) {
        console.error("Server-Fehler:", err);
        res.status(500).send("Ein Fehler ist aufgetreten.");
    }
};

module.exports = getResults;
