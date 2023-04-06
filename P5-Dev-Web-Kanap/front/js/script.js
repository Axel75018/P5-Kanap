const urlAPI = "http://localhost:3000/api/products/";

//import fetchData
import { fetchData } from './fonction.js';

fetchData(urlAPI).then(reponseJSON => { // renvoie le fetch un fois complété sur réponseJSOn et execute le scriptt


// Récupération de l'élément du DOM qui accueillera les fiches
const sectionItems = document.querySelector(".items");


//  boucle dynamique
for (let i = 0; i < reponseJSON.length; i++) {
    // des objet dom et renseignement        
    const produitLien = document.createElement("a");
    const produitArticle = document.createElement("article");
    produitLien.href = `./product.html?id=${reponseJSON[i]._id}`;
    const produitImg = document.createElement("img");
    produitImg.src = reponseJSON[i].imageUrl;
    produitImg.alt = reponseJSON[i].altTxt;
    const produitNom = document.createElement("h3");
    produitNom.innerText = reponseJSON[i].name;
    produitNom.className = "productName";
    const produitDescription = document.createElement("p");
    produitDescription.innerText = reponseJSON[i].description;
    produitDescription.className = "productDescription";

    // attache au dom
    sectionItems.appendChild(produitLien);
    produitLien.appendChild(produitArticle);
    produitArticle.appendChild(produitImg);
    produitArticle.appendChild(produitNom);
    produitArticle.appendChild(produitDescription);

}
})