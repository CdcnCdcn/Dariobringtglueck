import { createClient } from "@supabase/supabase-js";

// Supabase-Client initialisieren
const supabaseUrl = "https://ltzvbzpeplnjlokvbuit.supabase.co"; // Ersetze mit deiner Supabase-URL
const supabaseKey = process.env.SUPABASE_KEY || "<dein-supabase-api-key>"; // Nutze Umgebungsvariablen oder den Schlüssel direkt
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    // OPTIONS-Anfrage für Preflight
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Origin", "https://reviergold.de");
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        return res.status(200).end();
    }

    // POST-Anfrage verarbeiten
    if (req.method === "POST") {
        try {
            // Empfange die Daten aus der Anfrage
            const data = req.body;
            console.log("Empfangene Daten:", data);

            // Daten in die Supabase-Tabelle 'results' einfügen
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
