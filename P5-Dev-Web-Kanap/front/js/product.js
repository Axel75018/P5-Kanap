// objet URL
// on recup l'url
const str = window.location.href;
const url = new URL(str);
const nameID = url.searchParams.get("id");
console.log(nameID);
console.log('-----------------------');

// En vérifiant le parmètre dans l'url
var str2 = window.location.href;
var url2 = new URL(str2);
var search_params = new URLSearchParams(url2.search);

if (search_params.has('id')) {
    var nameID2 = search_params.get('id');
    console.log(nameID2);
}
const urlAPI = "http://localhost:3000/api/products/";
const reponse = await fetch(urlAPI);
const reponseJSON = await reponse.json();
console.log(reponseJSON);

const produitdivIMG = document.querySelector(".item__img");
const produitTitlePrice = document.querySelector(".item__content__titlePrice");
const produitDescription = document.querySelector(".item__content__description")



for (let i = 0; i < reponseJSON.length; i++) {
    console.log(i);
    if (nameID == reponseJSON[i]._id) {
        console.log("victoire");
        console.log(reponseJSON[i]._id);
        console.log(reponseJSON[i].name);
        console.log(reponseJSON[i].imageUrl);

        // image
        produitdivIMG.innerHTML = "";
        const produitImg = document.createElement("img");
        produitImg.src = reponseJSON[i].imageUrl;
        produitImg.alt = reponseJSON[i].altTxt;
        produitdivIMG.appendChild(produitImg);

        // Titre prix
        produitTitlePrice.innerHTML = "";
        const produitNom = document.createElement('h1');
        produitNom.id="title";
        produitNom.innerText = reponseJSON[i].name;
        const produitPrix = document.createElement('p');
        produitPrix.innerHTML = `Prix : <span id="price"> ${reponseJSON[i].price}</span> €`;
        produitTitlePrice.appendChild(produitNom);
        produitTitlePrice.appendChild(produitPrix);

        // Description
        produitDescription.innerHTML = `<p class="item__content__description__title">Description :
        </p><p id="description"> ${reponseJSON[i].description}</p>`;

        //couleurs


        break
    }
} 