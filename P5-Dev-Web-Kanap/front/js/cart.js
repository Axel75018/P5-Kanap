console.log('cart loaded');

//intitulé pour le local storage
const cartID = "id";
const cartCouleur = "couleur";
const cartQuantite = "quantite";

//localstorage:n

//crétation fonction

export function ajoutCart(id, couleur, quantite) {


    // controle  couleur présent et  q >0 <100
    if (couleur == "" || quantite < 0 || quantite > 100) { alert('Séletionnez une couleur ET une quantité'); }
    else {

        // enrgistre dans locale storage panier

        localStorage.setItem("panier", JSON.stringify({ 'cartID': id, 'couleur': couleur, 'Quantité': quantite }))
    }

}
