import { createClient } from "@supabase/supabase-js";

// Supabase-Client initialisieren
const supabaseUrl = "https://<your-supabase-url>.supabase.co"; // Ersetze mit deiner Supabase-URL
const supabaseKey = process.env.SUPABASE_KEY; // API-Key aus Umgebungsvariablen
const supabase = createClient(https://ltzvbzpeplnjlokvbuit.supabase.co, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0enZienBlcGxuamxva3ZidWl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1Mjc5MjksImV4cCI6MjA0ODEwMzkyOX0.7iXtEDPdsQIko7wvn7p5m922FOR5WLE96cYbt2lm2GY);

export default async function handler(req, res) {
    // OPTIONS-Anfrage für CORS-Preflight
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Origin", "https://reviergold.de");
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        return res.status(200).end();
    }

    // POST-Anfrage verarbeiten
    if (req.method === "POST") {
        try {
            const data = req.body; // Empfange Daten aus der Anfrage
            console.log("Empfangene Daten:", data);

            // Daten in Supabase einfügen
            const { error } = await supabase.from("results").insert([data]);

            if (error) {
                console.error("Supabase-Fehler:", error.message);
                res.setHeader("Access-Control-Allow-Origin", "https://reviergold.de");
                return res.status(401).json({ error: "Unauthorized", details: error.message });
            }

            // Erfolgreiche Antwort
            res.setHeader("Access-Control-Allow-Origin", "https://reviergold.de");
            return res.status(200).json({
                message: "Ergebnisse erfolgreich gespeichert.",
                data: data,
            });
        } catch (error) {
            console.error("Server-Fehler:", error.message);
            res.setHeader("Access-Control-Allow-Origin", "https://reviergold.de");
            return res.status(500).json({ error: "Interner Serverfehler" });
        }
    }

    // Nicht unterstützte Methoden ablehnen
    res.setHeader("Access-Control-Allow-Origin", "https://reviergold.de");
    res.status(405).json({ error: "Methode nicht erlaubt" });
}
