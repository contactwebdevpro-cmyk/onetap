export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const {
        nom,
        commerce,
        ville,
        tel,
        email,
        message
    } = req.body;

    try {

        await fetch(process.env.DISCORD_WEBHOOK, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                embeds: [{
                    title: "📩 Nouvelle demande OneTap",
                    color: 5814783,
                    fields: [
                        {
                            name: "Nom",
                            value: nom || "-",
                            inline: true
                        },
                        {
                            name: "Commerce",
                            value: commerce || "-",
                            inline: true
                        },
                        {
                            name: "Ville",
                            value: ville || "-",
                            inline: true
                        },
                        {
                            name: "Téléphone",
                            value: tel || "-",
                            inline: true
                        },
                        {
                            name: "Email",
                            value: email || "-"
                        },
                        {
                            name: "Message",
                            value: message || "-"
                        }
                    ],
                    timestamp: new Date().toISOString()
                }]
            })
        });

        return res.status(200).json({
            success: true
        });

    } catch (e) {

        return res.status(500).json({
            success: false
        });

    }

}