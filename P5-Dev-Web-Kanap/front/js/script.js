const urlAPI = "http://localhost:3000/api/products/";

export async function fetchData(url) { // async pour permettre charge desyncho et utilisation await
  const reponse = await fetch(url); // await attend que la promesse soit complétée en sérialiséé
  const reponseJSONawait = await reponse.json(); //transforme la promesse va se transformer en json  
  return reponseJSONawait; // retourne la la valeur une fois complétée
  
}

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