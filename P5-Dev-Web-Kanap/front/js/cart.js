console.log('cart loaded');


export function sauveCart(panier) {

    localStorage.setItem("panier", JSON.stringify(panier))
};


export function recupCart() {
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
        alert(produit.couleur);
        if (foundProduct != undefined && produit.couleur == foundProduct.couleur) {
            
           let somA = parseInt(quantite,10);          
           let somB = parseInt(foundProduct.Q,10);
           let somQ =somA + somB;
           produit.Q = somQ;
           foundProduct.Q =somQ;
           console.log(foundProduct);
           sauveCart(panier);

        }
        else {

            panier.push(produit);
            sauveCart(panier);

        }
        
        

    };
};

function supCart(produit) {
    let panier = recupCart();
    panier = panier.filter(p => p.ID != produit.ID);
    sauveCart(panier);

}
