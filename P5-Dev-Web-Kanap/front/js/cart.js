// variable du panier
const cartID ="id";
const cartCouleur ="couleur";
const cartQuantite ="0";
//localstorage:n

//ajout listener sur input ou boutonbouton et export pour recuperer la fonction

export function ajoutListenerEnvoyerAvis() {
    const panierAjouts = document.querySelector("#addToCart");
    formulaireAvis.addEventListener("submit", function (event) {
        /*const urlAPI = `http://localhost:3000/api/products/${nameID}`;
        const reponse = await fetch(urlAPI);
        const reponseJSON = await reponse.json();*/

        //lecture des valeurs sur le formulaire

        //sérialisation à faire mais ou ?


        // local storage
        windows.localStorage.setItem( cartID, nameID2);
        windows.localStorage.setItem( cartCouleur, nameID2);
        windows.localStorage.setItem( cartQuantite, );

    });
 }
 