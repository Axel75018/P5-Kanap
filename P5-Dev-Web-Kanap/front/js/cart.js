const urlAPI = "http://localhost:3000/api/products/"
const reponse = await fetch(urlAPI);
//transforme en json exploitable
const reponseJSON = await reponse.json();

//----------------------------sauveCart------------------------

export function sauveCart(panier) {

    localStorage.setItem("panier", JSON.stringify(panier))
};

//----------------------------recupCart------------------------

export function recupCart() {
    let panier = localStorage.getItem("panier");
    if (panier == null) {
        return []

    } else {
        return JSON.parse(panier);
    }

};

//----------------------------addCart------------------------

export function addCart(id, couleur, quantite) {
    const produit = { 'ID': id, 'couleur': couleur, 'Q': quantite };
    // faire condition sur panier vide !
    const panier = recupCart();

    if (panier == "") {
        alert('panier vide');
        panier.push(produit);
        sauveCart(panier);

    }

    else {
    alert('panier existant')

    //check produit même couleur déja présent    
    const foundProduct = panier.find(p => p.ID+p.couleur == produit.ID+produit.couleur);
    console.log("******foundProduct*****");
    console.log(foundProduct);
    console.log("******produit.couleur*****");
    console.log(produit.couleur);
    //console.log("******foundProduct.couleur*****");
    //console.log(foundProduct.couleur);

            //produit existant dans la même couleur
            if (foundProduct != undefined && produit.couleur == foundProduct.couleur) {
                alert('prod existant dans la couleur')
                let somA = parseInt(quantite, 10);
                let somB = parseInt(foundProduct.Q, 10);
                let somQ = somA + somB;
                        // check que nouvelle plus ancienne Q ok
                        if (somQ <= 0 || somQ > 100) {
                            let messAlerte = 'Attention vous avez déja' + somB + ' unités dans le panier ! Vous allez dépasser les 100 unités';
                            alert(messAlerte);
                        } 
                        else {
                            produit.Q = somQ;
                            foundProduct.Q = somQ;
                            sauveCart(panier);
                        }

            } else
            { // Cas ou combi coul id non existant
                panier.push(produit);
                sauveCart(panier);
            }                                                           

}
}
      


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
        if (foundProduct.quantite <= 0) {
            supCart(foundProduct);

        }
        else {
            sauveCart(panier);
        }

    }


}

//liste panier


//recup url pour ne s'applique que sur la page cart
const urlCourante = document.location.href;
if (urlCourante.indexOf("cart") != -1) {
    // Récupération de l'élément du DOM qui accueillera les fiches

    let panier = recupCart();

    const sectionCart = document.querySelector("#panier");
    console.log("*****");
    console.log(sectionCart);
    sectionCart.innerHTML = "";


    for (let i = 0; i < panier.length; i++) {
        // retrouver le produit du local storage dans l'API
        let pdtJSON = reponseJSON.find(p => p._id == panier[i].ID);
        console.log(pdtJSON);
        // objets à ajouter

        const pdtArticle = document.createElement("article");
        pdtArticle.className = "cart__item";
        pdtArticle.dataset.id = panier[i].ID;
        pdtArticle.dataset.color = panier[i].couleur;

        const pdtdivIMG = document.createElement("div");
        pdtdivIMG.className = "cart__item__img";
        const pdtIMG = document.createElement("img");
        pdtIMG.src = pdtJSON.imageUrl;

        const pdtContent = document.createElement("div");
        pdtContent.className = "cart__item__content";

        const pdtDescription = document.createElement("div");
        pdtDescription.className = "cart__item__content__description";


        const pdtNom = document.createElement("h2");
        pdtNom.innerText = pdtJSON.name;
        //console.log(pdtJSON.name);
        const pdtCouleur = document.createElement("p");
        pdtCouleur.innerText = panier[i].couleur;
        //console.log(pdtCouleur.innerText);
        const pdtPrix = document.createElement("p");
        pdtPrix.innerText = pdtJSON.price + " €";
        //console.log(pdtPrix.innerText);
        const pdtQ = document.createElement("p");
        pdtQ.innerText = 'Q : ' + panier[i].Q;
        //console.log(pdtQ.innerText)

        const pdtSettings = document.createElement("div");
        pdtSettings.className = "cart__item__content__settings";
        const pdtdivQ = document.createElement("div");
        pdtdivQ.className = "cart__item__content__settings__quantity";

        // input
        const pdtInput = document.createElement('input');
        pdtInput.value = panier[i].Q;
        pdtInput.className = 'itemQuantity';
        pdtInput.name = 'itemQuantity';
        pdtInput.type = "number";
        pdtInput.min = 1;
        pdtInput.max = 100;
        pdtInput.id = 'idligne' + i;
        pdtInput.addEventListener("input", function () {
            //alert(pdtInput.value);
            //changeQ(panier[i].ID, pdtInput.value);        
        });




        //sup
        const divSup = document.createElement('div');
        divSup.className = 'cart__item__content__settings__delete';
        const parSup = document.createElement('p');
        parSup.className = 'deleteItem';
        parSup.innerText = 'Supprimer';




        // attache au dom
        sectionCart.appendChild(pdtArticle);
        pdtArticle.appendChild(pdtdivIMG);
        pdtdivIMG.appendChild(pdtIMG);
        pdtArticle.appendChild(pdtContent);
        pdtContent.appendChild(pdtDescription);
        pdtDescription.appendChild(pdtNom);
        pdtDescription.appendChild(pdtCouleur);
        pdtDescription.appendChild(pdtPrix);

        pdtArticle.appendChild(pdtSettings);
        pdtSettings.appendChild(pdtdivQ);
        pdtdivQ.appendChild(pdtQ);
        pdtdivQ.appendChild(pdtInput);

        pdtSettings.appendChild(divSup);
        divSup.appendChild(parSup);

    }

    // mise en place des écouteurs et des scripts
}