export default async function handler(req, res) {
    // Preflight-Anfrage (OPTIONS) behandeln
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Origin", "https://reviergold.de");
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        return res.status(200).end();
    }

    // POST-Anfrage behandeln
    if (req.method === "POST") {
        res.setHeader("Access-Control-Allow-Origin", "https://reviergold.de"); // Wichtig für CORS
        try {
            // Beispiel: Logik für POST-Anfrage
            const data = req.body;
            console.log("Daten empfangen:", data);

            res.status(200).json({ message: "Daten erfolgreich verarbeitet.", data });
        } catch (error) {
            console.error("Fehler beim Verarbeiten der POST-Anfrage:", error.message);
            res.status(500).json({ error: "Interner Serverfehler" });
        }
    } else {
        // Andere Methoden ablehnen
        res.setHeader("Access-Control-Allow-Origin", "https://reviergold.de"); // Wichtig für CORS
        res.status(405).json({ error: "Methode nicht erlaubt" });
    }
}
