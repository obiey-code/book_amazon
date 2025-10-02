// 1. Définir la liste de tes livres
// C'est ici que tu vas mettre à jour les informations, y compris ton lien d'affiliation Amazon !
const livres = [
    {
        titre: "Un voisin étrange",
        auteur: "Florian Dennisson",
        categorie: "Romance tendance",
        description: "Pendant les vacances de la Toussaint, Olivier Leroy pénètre sans en avoir le droit sur le terrain d'une des maisons de son village et fait une découverte étrange ayant peut-être un rapport avec l'une des énigmes les plus célèbres de l'Histoire.Le lendemain, un voisin bizarre vient s'installer en face de chez lui, dans une maison délabrée dont personne n'a jamais voulu depuis des décennies. Puni et ayant interdiction de sortir de chez lui,Olivier va avoir beaucoup de mal à mener son enquête et résoudre les mystères qui s'accumulent autour de lui..",
        image: "https://m.media-amazon.com/images/I/61WYeNnUqkL._AC_UL320_.jpg",
        lienAmazon: "https://amzn.to/48LLWUJ", // <-- VIRGULE AJOUTÉE ICI
        featured: true
    },
    {
        titre: "Gigi",
        auteur: "Colette",
        categorie: "Romance",
        description: "Gigi est une nouvelle écrite par Colette en 1944, à l'âge de 71 ans, un de ses derniers écrits, dix ans avant sa mort. Le thème de la nouvelle est celui des demi-mondaines de la Belle Époque, à Paris, vers 1900, et plus précisément celui du devenir d'une adolescente qui grandit et évolue dans ce milieu, s'inspirant de la relation de Yola Henriquet et du patron de presse Henri Letellier. Cette nouvelle sera pendant des décennies une source d'inspiration pour des adaptations au cinéma et au théâtre, sous ce même titre « Gigi ». Colette, de son vrai nom Sidonie-Gabrielle Colette, était une écrivaine, journaliste et actrice française, née le 28 janvier 1873 à Saint-Sauveur-en-Puisaye. Elle est célèbre pour ses romans tels que Claudine à l'école, Chéri et surtout Gigi, qui a inspiré un film du même nom. Colette était une figure emblématique de la société parisienne, reconnue pour son style littéraire raffiné et sa vie audacieuse, souvent en rupture avec les conventions de son époque. Ses œuvres explorent des thèmes comme l'identité, la sexualité et la condition féminine dans une société patriarcale. En 1948, elle est devenue la première femme en France à recevoir des funérailles nationales, un hommage à son influence culturelle et littéraire.",
        image: "https://m.media-amazon.com/images/I/91XCx49m7JL._SL1500_.jpg",
        lienAmazon: "https://amzn.to/4nPXuvb", // <-- VIRGULE AJOUTÉE ICI
        featured: true
    },
    {
        titre: "Histoires érotiques pour adultes: Cinq histoires chaudes avec du sexe torride",
        auteur: " Paige Hervieux ",
        categorie: "Romance",
        description: "Un livre de sexe et d'érotisme torride pour passer un bon moment. Prenez ce livre maintenant et profitez des histoires intimes",
        image: "https://m.media-amazon.com/images/I/61v02ThtfCL._SY425_.jpg",
        lienAmazon: "https://amzn.to/474vX2R", // <-- VIRGULE AJOUTÉE ICI (même si c'est le dernier, c'est mieux si tu ajoutes un livre après)
        featured: true
    }
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

// 3. Fonction pour afficher les livres dans le conteneur principal
function afficherLivres(livresAAfficher) {
    const container = document.getElementById('livres-container');
    container.innerHTML = ''; 

    if (livresAAfficher.length === 0) {
        container.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">Aucun livre trouvé pour cette sélection.</p>';
    } else {
        livresAAfficher.forEach(livre => {
            const fiche = creerFicheLivre(livre);
            container.innerHTML += fiche; 
        });
    }
}

// 4. Fonction pour peupler le menu déroulant des auteurs
function peuplerAuteurs() {
    const auteursUniques = new Set(livres.map(livre => livre.auteur));
    const selectElement = document.getElementById('filter-auteur');

    auteursUniques.forEach(auteur => {
        const option = document.createElement('option');
        option.value = auteur;
        option.textContent = auteur;
        selectElement.appendChild(option);
    });
}

// 5. Fonction pour peupler le menu déroulant des catégories
function peuplerCategories() {
    // Si l'élément n'existe pas, on sort de la fonction pour éviter le blocage
    const selectElement = document.getElementById('filter-categorie');
    if (!selectElement) return; 
    
    const categoriesUniques = new Set(livres.map(livre => livre.categorie));
    
    categoriesUniques.forEach(categorie => {
        const option = document.createElement('option');
        option.value = categorie;
        option.textContent = categorie;
        selectElement.appendChild(option);
    });
}

// 6. Fonction pour afficher les livres dans le carrousel (featured)
function afficherLivresVedette() {
    // Si l'élément n'existe pas, on sort de la fonction pour éviter le blocage
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
    // On ajoute des vérifications pour éviter les erreurs si des éléments HTML manquent
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

// Attacher les écouteurs d'événement (tous appellent la même fonction)
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
