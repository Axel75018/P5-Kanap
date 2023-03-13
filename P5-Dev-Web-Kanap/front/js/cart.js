console.log('cart loaded');

/*const id = 0;
const couleur="couleur";
const quantite="1";
console.log(quantite);
console.log(id);
console.log(couleur);
*/
//localstorage:n

//crétation fonction

export function ajoutCart(id, couleur, quantite) {
    // controle  couleur présent et  q >0 <100
    if (couleur == "" || quantite <= 0 || quantite > 100) { alert('Séletionnez une couleur ET une quantité >0 et <100'); }
    else {
        localStorage.setItem("panier", JSON.stringify([id, couleur, quantite])) 
    };
      
};
