// 1. Définir la liste de tes livres
// C'est ici que tu vas mettre à jour les informations, y compris ton lien d'affiliation Amazon !
const livres = [
    {
        titre: "L'art de la pensée claire",
        auteur: "Rolf Dobelli",
        description: "Un guide fascinant pour éviter les pièges cognitifs et prendre de meilleures décisions.",
        image: "https://via.placeholder.com/300x400?text=Livre+1", // Remplace par l'URL de ta couverture
        lienAmazon: "TON_LIEN_AFFILIATION_AMAZON_1" // REMPLACE CE TEXTE
    },
    {
        titre: "Sapiens: Une brève histoire de l'humanité",
        auteur: "Yuval Noah Harari",
        description: "Un tour d'horizon de l'histoire humaine, de l'âge de pierre à l'ère numérique.",
        image: "https://via.placeholder.com/300x400?text=Livre+2", // Remplace par l'URL de ta couverture
        lienAmazon: "TON_LIEN_AFFILIATION_AMAZON_2" // REMPLACE CE TEXTE
    },
    {
        titre: "Atomic Habits",
        auteur: "James Clear",
        description: "La méthode simple et éprouvée pour développer de bonnes habitudes et se débarrasser des mauvaises.",
        image: "https://via.placeholder.com/300x400?text=Livre+3", // Remplace par l'URL de ta couverture
        lienAmazon: "TON_LIEN_AFFILIATION_AMAZON_3" // REMPLACE CE TEXTE
    }
];

// 2. Fonction pour créer la fiche HTML d'un livre
function creerFicheLivre(livre) {
    // Utilisation des "template literals" (backticks ``) pour construire le HTML facilement
    const htmlFiche = `
        <div class="book-card">
            <img src="${livre.image}" alt="Couverture du livre ${livre.titre}">
            <h3>${livre.titre}</h3>
            <p><strong>Auteur :</strong> ${livre.auteur}</p>
            <p>${livre.description}</p>
            <a href="${livre.lienAmazon}" class="amazon-link" target="_blank" rel="noopener noreferrer">
                Voir sur Amazon
            </a>
        </div>
    `;
    return htmlFiche;
}

// 3. Fonction principale pour afficher tous les livres
function afficherTousLesLivres() {
    // Récupérer le conteneur principal dans le HTML (l'élément avec l'ID 'livres-container')
    const container = document.getElementById('livres-container');
    
    // Vider le contenu initial ("Chargement des livres...")
    container.innerHTML = ''; 

    // Parcourir le tableau 'livres' et créer la fiche pour chaque livre
    livres.forEach(livre => {
        const fiche = creerFicheLivre(livre);
        // Ajouter le HTML de la fiche au conteneur
        container.innerHTML += fiche; 
    });
}

// 4. Appeler la fonction pour lancer l'affichage quand la page est chargée
afficherTousLesLivres();
