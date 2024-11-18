const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Simuler une base de données avec un tableau en mémoire
let articles = [];

// Route de test
app.get("/", (req, res) => {
    res.send("Le serveur fonctionne !");
});

// Récupérer tous les articles
app.get("/articles", (req, res) => {
    res.json(articles); // Retourner la liste complète des articles
});

// Ajouter un nouvel article
app.post("/articles", (req, res) => {
    const newArticle = {
        id: articles.length + 1, // Générer un ID simple
        ...req.body, // Copier les données du corps de la requête
    };
    articles.push(newArticle); // Ajouter l'article à la liste
    res.status(201).json(newArticle); // Retourner l'article ajouté en réponse
});

// Modifier un article existant
app.put("/articles/:id", (req, res) => {
    const { id } = req.params;
    const articleIndex = articles.findIndex((article) => article.id == id);

    if (articleIndex !== -1) {
        // Mettre à jour l'article
        articles[articleIndex] = { ...articles[articleIndex], ...req.body };
        res.json(articles[articleIndex]);
    } else {
        res.status(404).json({ message: "Article non trouvé" });
    }
});

// Supprimer un article
app.delete("/articles/:id", (req, res) => {
    const { id } = req.params;
    const articleIndex = articles.findIndex((article) => article.id == id);

    if (articleIndex !== -1) {
        const deletedArticle = articles.splice(articleIndex, 1); // Supprimer l'article
        res.json(deletedArticle[0]);
    } else {
        res.status(404).json({ message: "Article non trouvé" });
    }
});

// Lancer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
