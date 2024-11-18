const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Route de test
app.get("/", (req, res) => {
    res.send("Le serveur fonctionne !");
});

app.get("/articles", (req, res) => {
    res.json([]);
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
