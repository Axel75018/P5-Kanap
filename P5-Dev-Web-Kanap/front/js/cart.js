const urlAPI = "http://localhost:3000/api/products/"
const reponse = await fetch(urlAPI);
//transforme en json exploitable
const reponseJSON = await reponse.json();


 export function sauveCart(panier) {

    localStorage.setItem("panier", JSON.stringify(panier))
};

export  function recupCart() {
    let panier = localStorage.getItem("panier");
    if (panier == null) {
        return []

    } else {
        return JSON.parse(panier);
    }

};

export function addCart(id, couleur, quantite) {
    let panier = recupCart();

    // controle  couleur présent et  q >0 <100
    if (couleur == "" || quantite <= 0 || quantite > 100) { alert('Séletionnez une couleur ET une quantité >0 et <100'); }
    else {

        let produit = { 'ID': id, 'couleur': couleur, 'Q': quantite }

        //check produit même couleur déja présent    
        let foundProduct = panier.find(p => p.ID == produit.ID);
            
        if (foundProduct != undefined && produit.couleur == foundProduct.couleur) {

            let somA = parseInt(quantite, 10);
            let somB = parseInt(foundProduct.Q, 10);
            let somQ = somA + somB;
            produit.Q = somQ;
            foundProduct.Q = somQ;
            console.log(foundProduct);
            sauveCart(panier);

        }
        else {

            panier.push(produit);
            sauveCart(panier);

        }


    };
};

export function supCart(produit) {
    let panier = recupCart();
    panier = panier.filter(p => p.ID != produit.ID);
    sauveCart(panier);

}

export function changeQ(produit, quantite) {
    let panier = recupCart();
    let foundProduct = panier.find(p => p.ID == produit.ID);
    if (foundProduct != undefined) {
        foundProduct.quantite += quantite;
        if (foundProduct.quantite <=0) {
            supCart(foundProduct);
            
        }
        else{
            sauveCart(panier);
        }

    }
    
    

}


// Récupération de l'élément du DOM qui accueillera les fiches
const sectioncart = document.querySelector(".cart");
let panier = recupCart();
sectioncart.innerHTML ="";


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
