/* Récupération de l'élément du DOM qui accueillera les fiches

let panier = recupCart();
const sectionCart = document.querySelector('.cart');
sectionCart.innerHTML ="";


for ( let i=0; i < panier.length ; i++) {
    // retrouver le produit du locla storage dans l'API
    let pdtJSON = reponseJSON.find(p => p._id == panier[i].ID);
    console.log(pdtJSON);
    // objets à ajouter
        
    const pdtArticle = document.createElement("article");
    pdtArticle.className = "cart__item";
    pdtArticle.dataset.id =panier[i].ID;    
    pdtArticle.dataset.color =  panier[i].couleur;

    const pdtdivIMG =document.createElement("div");
    pdtdivIMG.className="cart__item__img";       
    const pdtIMG = document.createElement("img");    
    pdtIMG.src = pdtJSON.imageUrl;

    const pdtContent = document.createElement("div");    
    pdtContent.className="cart__item__content";

    const pdtDescription =document.createElement("div");    
    pdtDescription.className="cart__item__content";


    const pdtNom = document.createElement("h2");
    pdtNom.innerText = pdtJSON.name;
    //console.log(pdtJSON.name);
    const pdtCouleur = document.createElement("p");  
    pdtCouleur.innerText= panier[i].couleur;
    //console.log(pdtCouleur.innerText);
    const pdtPrix = document.createElement("p");
    pdtPrix.innerText = pdtJSON.price+" €";
    //console.log(pdtPrix.innerText);
    const pdtQ = document.createElement("p");
    pdtQ.innerText = 'Q : '+panier[i].Q;
    //console.log(pdtQ.innerText)

    const pdtSettings =document.createElement("div");
    pdtSettings.className="cart__item__content__settings";
    const pdtdivQ = document.createElement("div");
    pdtdivQ.className="cart__item__content__settings__quantity";


// attache au dom
sectioncart.appendChild(pdtArticle);
pdtArticle.appendChild(pdtdivIMG);
pdtdivIMG.appendChild(pdtIMG);
sectioncart.appendChild(pdtContent);
pdtContent.appendChild(pdtDescription);
pdtDescription.appendChild(pdtNom);
pdtDescription.appendChild(pdtCouleur);
pdtDescription.appendChild(pdtPrix);

sectioncart.appendChild(pdtSettings);
pdtSettings.appendChild(pdtdivQ);

       
}
*/


// objet URL
// on recup l'url
const str = window.location.href;
const url = new URL(str);
const nameID = url.searchParams.get("id");


// affichage commande
const spanOrderId = document.querySelector('#orderId');
spanOrderId.innerText =nameID;
