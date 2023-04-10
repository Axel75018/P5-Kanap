// fonction fetchData() -----------------------------------------------------

export async function fetchData(url) { // async pour permettre charge desyncho et utilisation await
    const reponse = await fetch(url); // await attend que la promesse soit complétée en sérialiséé
    const reponseJSONawait = await reponse.json(); //transforme la promesse va se transformer en json  
    return reponseJSONawait; // retourne la la valeur une fois complétée
    
  }

  //fonctions cart -------------------------------------------------------------------------------

  //----------------------------sauveCart()----------------------a--

export function sauveCart(panierC) {
    // sérialise avant d'ajouter au local storagr
    localStorage.setItem("panier", JSON.stringify(panierC))
  };
  
  //----------------------------recupCart()----------------------a--
  export function recupCart() {
    let panierC = localStorage.getItem("panier");
    // condition sur panier , renvoie un tableau vide si panier vide
    if (panierC == null) {
      return []
  
    } else {
      return JSON.parse(panierC);
    }
  
  };
  //----------------------------addCart------------------------
//export pour que la fonction soit utilisée sur la page product.js
export function addCart(id, couleur, quantite) {
  const produit = { 'ID': id, 'couleur': couleur, 'Q': quantite };
  // faire condition sur panier vide !
  const panierC = recupCart(); //on récupére le panier
  if (panierC == "") {
    // ajout direct au panier si il est vide

    panierC.push(produit); // ajout de produit a l'array par push de produit
    sauveCart(panierC);
    alert(quantite + ' canapé(s) ' + couleur + ' ajouté(s) dans le panier');


  }

  else {

    //check produit même couleur déja présent  en comparant les concatenation id+couleur  
    const foundProduct = panierC.find(p => p.ID + p.couleur == produit.ID + produit.couleur);


    //produit existant dans la même couleur
    if (foundProduct != undefined && produit.couleur == foundProduct.couleur) {

      let somA = parseInt(quantite, 10);
      let somB = parseInt(foundProduct.Q, 10);
      let somQ = somA + somB; // somme Q nouvel ajout et Q panier
      // check que nouvelle  Q ok <100 et > 0
      if (somQ <= 0 || somQ > 100) {
        let messAlerte = 'Attention vous avez déja ' + somB + ' unités dans le panier ! Vous allez dépasser les 100 unités';
        alert(messAlerte);
      }
      else { // Q ok
        produit.Q = somQ;
        foundProduct.Q = somQ;
        sauveCart(panierC);
        alert(quantite + ' canapé(s) ' + couleur + ' ajouté(s) dans le panier');
      }

    } else { // Cas ou combi coul id non existant (mais panier déja rempli)
      panierC.push(produit);
      sauveCart(panierC);
      alert(quantite + ' canapé(s) ' + couleur + ' ajouté(s) dans le panier');
    }

  }
}

