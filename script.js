// 1. Définir la liste de tes livres
// ATTENTION : Les virgules après 'lienAmazon' sont cruciales !
const livres = [
    {
        titre: "Un voisin étrange",
        auteur: "Florian Dennisson",
        categorie: "Romance tendance",
        description: "Pendant les vacances de la Toussaint, Olivier Leroy pénètre sans en avoir le droit sur le terrain d'une des maisons de son village et fait une découverte étrange ayant peut-être un rapport avec l'une des énigmes les plus célèbres de l'Histoire...",
        image: "https://m.media-amazon.com/images/I/61WYeNnUqkL._AC_UL320_.jpg",
        lienAmazon: "https://amzn.to/48LLWUJ", 
        featured: false
    },
    {
        titre: "Gigi",
        auteur: "Colette",
        categorie: "Romance Classique",
        description: "Gigi est une nouvelle écrite par Colette en 1944. Le thème est celui des demi-mondaines de la Belle Époque...",
        image: "https://m.media-amazon.com/images/I/91XCx49m7JL._SL1500_.jpg",
        lienAmazon: "https://amzn.to/4nPXuvb",
        featured: false
    },
    {
        titre: "Histoires érotiques pour adultes",
        auteur: " Paige Hervieux ",
        categorie: "Romance Érotique",
        description: "Un livre de sexe et d'érotisme torride pour passer un bon moment. Prenez ce livre maintenant et profitez des histoires intimes",
        image: "https://m.media-amazon.com/images/I/61v02ThtfCL._SY425_.jpg",
        lienAmazon: "https://amzn.to/474vX2R",
        featured: true
    },
    {
        titre: "L'art de la pensée claire",
        auteur: "Rolf Dobelli",
        categorie: "Développement Personnel",
        description: "Un guide fascinant pour éviter les pièges cognitifs et prendre de meilleures décisions.",
        image: "https://via.placeholder.com/300x400?text=Livre+DP1",
        lienAmazon: "TON_LIEN_AFFILIATION_AMAZON_4",
        featured: false
    },
];

// 2. Fonction pour créer la fiche HTML d'un livre
function creerFicheLivre(livre) {
    return `
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
}

// 3. Fonction pour afficher les livres dans le conteneur principal, organisés par catégorie
function afficherLivres(livresAAfficher) {
    const container = document.getElementById('livres-container');
    container.innerHTML = ''; 

    if (livresAAfficher.length === 0) {
        container.innerHTML = '<p style="text-align: center; width: 100%; margin: 40px auto;">Aucun livre trouvé pour cette sélection.</p>';
        return;
    }

    // 1. Regrouper les livres par catégorie
    const livresParCategorie = livresAAfficher.reduce((acc, livre) => {
        const categorie = livre.categorie || 'Autres';
        if (!acc[categorie]) {
            acc[categorie] = [];
        }
        acc[categorie].push(livre);
        return acc;
    }, {});

    // 2. Créer l'affichage pour chaque catégorie
    for (const categorie in livresParCategorie) {
        if (livresParCategorie.hasOwnProperty(categorie)) {
            const livresDeCetteCategorie = livresParCategorie[categorie];
            
            // Création du titre de la catégorie (h2.category-title)
            const categoryHeader = document.createElement('h2');
            categoryHeader.classList.add('category-title');
            categoryHeader.textContent = categorie;
            container.appendChild(categoryHeader);

            // Création du conteneur de la grille (div.category-grid)
            const categoryGrid = document.createElement('div');
            categoryGrid.classList.add('category-grid');

            // Ajout des fiches de livres à la grille de la catégorie
            livresDeCetteCategorie.forEach(livre => {
                const ficheHTML = creerFicheLivre(livre);
                categoryGrid.insertAdjacentHTML('beforeend', ficheHTML);
            });

            container.appendChild(categoryGrid);
        }
    }
}

// 4. Fonction pour peupler le menu déroulant des auteurs
function peuplerAuteurs() {
    const auteursUniques = new Set(livres.map(livre => livre.auteur));
    const selectElement = document.getElementById('filter-auteur');

    if (!selectElement) return; // Sécurité si l'élément n'existe pas

    auteursUniques.forEach(auteur => {
        const option = document.createElement('option');
        option.value = auteur;
        option.textContent = auteur;
        selectElement.appendChild(option);
    });
}

// 5. Fonction pour peupler le menu déroulant des catégories
function peuplerCategories() {
    const categoriesUniques = new Set(livres.map(livre => livre.categorie));
    const selectElement = document.getElementById('filter-categorie');
    
    if (!selectElement) return; // Sécurité si l'élément n'existe pas

    categoriesUniques.forEach(categorie => {
        const option = document.createElement('option');
        option.value = categorie;
        option.textContent = categorie;
        selectElement.appendChild(option);
    });
}

// 6. Fonction pour afficher les livres dans le carrousel (featured)
function afficherLivresVedette() {
    const sliderContainer = document.getElementById('featured-slider');
    if (!sliderContainer) return;

    const livresVedette = livres.filter(livre => livre.featured === true);
    
    sliderContainer.innerHTML = '';
    
    if (livresVedette.length === 0) {
        sliderContainer.innerHTML = '<p style="text-align: center;">Aucun livre en vedette pour le moment.</p>';
        sliderContainer.style.overflowX = 'hidden'; 
    } else {
        livresVedette.forEach(livre => {
            const fiche = creerFicheLivre(livre);
            sliderContainer.innerHTML += fiche;
        });
    }
}

// 7. Fonction unifiée de gestion du filtrage et de la recherche
function gererLeFiltrageEtLaRecherche() {
    // Récupérer les valeurs des filtres (avec vérifications de sécurité)
    const auteurElement = document.getElementById('filter-auteur');
    const categorieElement = document.getElementById('filter-categorie');
    const rechercheElement = document.getElementById('search-input');

    const auteurSelectionne = auteurElement ? auteurElement.value : 'tous';
    const categorieSelectionnee = categorieElement ? categorieElement.value : 'toutes';
    const termeDeRecherche = rechercheElement ? rechercheElement.value.toLowerCase().trim() : '';

    let livresFiltres = livres;

    // FILTRE 1 : CATÉGORIE
    if (categorieSelectionnee !== 'toutes') {
        livresFiltres = livresFiltres.filter(livre => livre.categorie === categorieSelectionnee);
    }
    
    // FILTRE 2 : AUTEUR
    if (auteurSelectionne !== 'tous') {
        livresFiltres = livresFiltres.filter(livre => livre.auteur === auteurSelectionne);
    }

    // FILTRE 3 : RECHERCHE PAR TITRE
    if (termeDeRecherche) {
        livresFiltres = livresFiltres.filter(livre => 
            livre.titre.toLowerCase().includes(termeDeRecherche)
        );
    }

    // Afficher le résultat final
    afficherLivres(livresFiltres);
}


// 8. INITIALISATION DU SITE
// ==========================

// Remplir les menus déroulants
peuplerAuteurs();
peuplerCategories();

// Afficher les livres en vedette (carrousel)
afficherLivresVedette(); 

// Attacher les écouteurs d'événement pour le filtrage
const filterCategorie = document.getElementById('filter-categorie');
if (filterCategorie) {
    filterCategorie.addEventListener('change', gererLeFiltrageEtLaRecherche);
}

const filterAuteur = document.getElementById('filter-auteur');
if (filterAuteur) {
    filterAuteur.addEventListener('change', gererLeFiltrageEtLaRecherche);
}

const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', gererLeFiltrageEtLaRecherche);
}

// Afficher tous les livres par défaut
gererLeFiltrageEtLaRecherche();
