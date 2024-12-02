const express = require('express');
const app = express();

app.use(express.json());


let utilisateurs = [
    { id: 1, nom: 'Idris Goat' },
    { id: 2, nom: 'Kenzo Caca' }
];


app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API REST avec Node.js !');
});


app.get('/utilisateurs', (req, res) => {
    res.json(utilisateurs);
});


app.get('/utilisateurs/:id', (req, res) => {
    const utilisateur = utilisateurs.find(u => u.id === parseInt(req.params.id));
    if (!utilisateur) return res.status(404).send('Utilisateur non trouvé');
    res.json(utilisateur);
});


app.post('/utilisateurs', (req, res) => {
    const nouvelUtilisateur = {
        id: utilisateurs.length + 1,
        nom: req.body.nom
    };
    utilisateurs.push(nouvelUtilisateur);
    res.status(201).json(nouvelUtilisateur);
});


app.put('/utilisateurs/:id', (req, res) => {
    const utilisateur = utilisateurs.find(u => u.id === parseInt(req.params.id));
    if (!utilisateur) return res.status(404).send('Utilisateur non trouvé');

    utilisateur.nom = req.body.nom;
    res.json(utilisateur);
});


app.delete('/utilisateurs/:id', (req, res) => {
    const index = utilisateurs.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Utilisateur non trouvé');

    utilisateurs.splice(index, 1);
    res.send('Utilisateur supprimé');
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
