const urlAPI = "http://localhost:3000/api/products/"

//Youtube
console.log('youtube promesse');



await fetch(urlAPI).then(response => response.json().then(data => console.log(data)));
await fetch(urlAPI).then(response => response.json().then(data => console.log(data[1])));
await fetch(urlAPI).then(response => response.json().then(data => console.log(data[1].name)));
await fetch('http://localhost:3000/api/products/77711f0e466b4ddf953f677d30b0efc9').then(response => response.json().then(data => console.log(data)));

// Openclass room

console.log('------------openclassroom await-----------------');
const reponse = await fetch(urlAPI);
const reponseJSON = await reponse.json();
console.log(reponseJSON);
console.log(reponseJSON[1]);
console.log(reponseJSON[1].name);
const reponseID = await fetch(`${urlAPI}77711f0e466b4ddf953f677d30b0efc9`);
const reponseIDJSON = await reponseID.json();
console.log(reponseIDJSON);

// Récupération de l'élément du DOM qui accueillera les fiches
const sectionItems = document.querySelector(".items");


//  boucle dynamique
for (let i=0 ; i < reponseJSON.length ; i++) {
    // des objet dom et renseignement        
    const produitLien = document.createElement("a");
    const produitArticle = document.createElement("article");
    produitLien.href =  `./product.html?id=${reponseJSON[i]._id}`;
    const produitImg = document.createElement("img");
    produitImg.src =  reponseJSON[i].imageUrl;
    produitImg.alt = reponseJSON[i].altTxt;
    const produitNom = document.createElement("h3");
    produitNom.innerText = reponseJSON[i].name;
    produitNom.className = "productName";
    const produitDescription = document.createElement("p");
    produitDescription.innerText =  reponseJSON[i].description;
    produitDescription.className = "productDescription"
    
    // attache au dom
    sectionItems.appendChild(produitLien);
    produitLien.appendChild(produitArticle);
    produitArticle.appendChild(produitImg);
    produitArticle.appendChild(produitNom);
    produitArticle.appendChild(produitDescription);

}