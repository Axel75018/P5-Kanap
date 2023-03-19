//import ajout panier
import{addCart} from './cart.js';


// objet URL
// on recup l'url

const str = window.location.href;
const url = new URL(str);
const nameID = url.searchParams.get("id");

// En vérifiant le parmètre dans l'url
var str2 = window.location.href;
var url2 = new URL(str2);
var search_params = new URLSearchParams(url2.search);

if (search_params.has('id')) {
    var nameID2 = search_params.get('id');

}
const urlAPI = `http://localhost:3000/api/products/${nameID}`;
const reponse = await fetch(urlAPI);
const reponseJSON = await reponse.json();


// point d'accroche
const produitdivIMG = document.querySelector(".item__img");
const produitTitlePrice = document.querySelector(".item__content__titlePrice");
const produitDescription = document.querySelector(".item__content__description");
const listeCouleurs = document.querySelector("#colors");


// image
produitdivIMG.innerHTML = "";
const produitImg = document.createElement("img");
produitImg.src = reponseJSON.imageUrl;
produitImg.alt = reponseJSON.altTxt;
produitdivIMG.appendChild(produitImg);

// Titre prix
produitTitlePrice.innerHTML = "";
const produitNom = document.createElement('h1');
produitNom.id = "title";
produitNom.innerText = reponseJSON.name;
const produitPrix = document.createElement('p');
produitPrix.innerHTML = `Prix : <span id="price"> ${reponseJSON.price}</span> €`;
produitTitlePrice.appendChild(produitNom);
produitTitlePrice.appendChild(produitPrix);

// Description
const produitDescriptionTxt = reponseJSON.description;
produitDescription.innerHTML = `<p class="item__content__description__title">Description :
        </p><p id="description"> ${produitDescriptionTxt}</p>`;


//couleurs
listeCouleurs.innerHTML = '<option value="">--SVP, choisissez une couleur --</option>';
// boucle des différentes couleurs dispo
for (let j = 0; j < reponseJSON.colors.length; j++) {

    const optionCouleurs = document.createElement("option");
    optionCouleurs.value = reponseJSON.colors[j];
    optionCouleurs.innerText = reponseJSON.colors[j];
    listeCouleurs.appendChild(optionCouleurs);
}


const panierAjouts = document.querySelector("#addToCart");
const inputCouleur =document.querySelector("#colors");
const inputQ =document.querySelector("#quantity");
let valQ =0;
let valCouleur="";


//recup couleur sur add changement du select
inputCouleur.addEventListener("change", function() {
valCouleur = inputCouleur.value;
});

// recupération des Q au change input
inputQ.addEventListener("change", function() {
        valQ = parseInt(inputQ.value,10);          
})

// au click du bouton commander appell de la fonction ajout dans le panier

panierAjouts.addEventListener("click", function () {  
    if (valCouleur == "" || valQ <= 0 || valQ > 100) { alert('Séletionnez une couleur ET une quantité >0 et <100'); }  
    else {
        addCart(nameID2, valCouleur, valQ);
        
    }        
    
});
