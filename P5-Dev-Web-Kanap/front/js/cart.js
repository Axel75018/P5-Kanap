//import fonction.js
import { sauveCart,recupCart,fetchData } from './fonction.js';

//fetch catalogue canapé await pourne pas bloquer l'execution
const urlAPI = "http://localhost:3000/api/products/";

fetchData(urlAPI).then(reponseJSON => {

  // ----------------------------calcul et affichage du total---
  // en premier parceque appellé ailleurs et cas du panier vide
  function calculTotal(panier) {

  let totalQ = 0;
  let totalPrix = 0;

  for (let t = 0; t < panier.length; t++) {
    //find renvoie la ligne de l'array qui remplit la condition id base de donnée api = id panier
    let pdtJSON = reponseJSON.find(p => p._id == panier[t].ID);

    //total des Q    
    totalQ = totalQ + panier[t].Q;



    //Total prix
    let Prix = pdtJSON.price;
    totalPrix = totalPrix + (panier[t].Q * Prix);

  }


  //affichage Q et Prix

  const spanTotalQ = document.querySelector("#totalQuantity");
  spanTotalQ.innerText = totalQ;

  const spanTotalPrix = document.querySelector("#totalPrice");
  spanTotalPrix.innerText = totalPrix;

};

//------------------------------------liste + affichage panier----------------------------------------

  let panier = recupCart();
  // Récupération de l'élément du DOM qui accueillera les fiches

  const sectionCart = document.querySelector("#panier");
  sectionCart.innerHTML = "";
  let totalQ = 0;
  let totalPrix = 0;
  //condition panier vide
  if (panier == "") {
    sectionCart.innerHTML = '<h2> Le panier est vide !</h2>'
    const divCommander = document.querySelector(".cart__order");
    divCommander.innerHTML = '';

  }
  else {



    for (let i = 0; i < panier.length; i++) { // boucle itération panier 

      // retrouver le produit du local storage dans l'API
      let pdtJSON = reponseJSON.find(p => p._id == panier[i].ID);

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
      const pdtCouleur = document.createElement("p");
      pdtCouleur.innerText = panier[i].couleur;
      const pdtPrix = document.createElement("p");
      pdtPrix.innerText = pdtJSON.price + " €";
      const pdtQ = document.createElement("p");
      pdtQ.innerText = 'Q : ' + panier[i].Q;


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
      pdtInput.addEventListener("change", function () { // listener sur input 

        changeQ(panier[i].ID, pdtInput.value, panier[i].couleur);
        pdtQ.innerText = 'Q : ' + pdtInput.value;
        if (pdtInput.value == 0) { //suppression si panier vide
          supCart(panier[i].ID + panier[i].couleur);
          pdtArticle.remove();

        }






      });


      // lien supprimer

      const divSup = document.createElement('div');
      divSup.className = 'cart__item__content__settings__delete';
      const parSup = document.createElement('p');
      parSup.className = 'deleteItem';
      parSup.innerText = 'Supprimer';
      parSup.addEventListener('click', function () {

        supCart(panier[i].ID + panier[i].couleur); // suppression du produit du panier
        pdtArticle.remove(); // surpression html de l'article produit


      });





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




    // affichage Q totalet Prix
    calculTotal(panier);
    //obsolete ? const tableauPanier = Object.values(panier[0]);


  }
  //------------------------------------------------------------------ validation formulaire !!!!!

  function validateForm() { // fonction validation formulaire verif donnée
    const firstName = document.getElementById("firstName").value.trim(); // trim pour enlever les espace en trop au début et à la fin
    const lastName = document.getElementById("lastName").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const email = document.getElementById("email").value.trim();


    const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/ // expression réguliére pour les champs sans numéros
    const cityRegex = /^[a-zA-Z\u0080-\u024F]+(?:[ .'-][a-zA-Z\u0080-\u024F]+)*$/; // idem mais pour ville

    let isValid = true; // variable pour vérifier que toutes les conditions sont vraies.

    // validation de tout les champs
    if (firstName === "") { //si vide
      document.getElementById("firstNameErrorMsg").innerText = "Le prénom est obligatoire";
      isValid = false;
    } else if (!nameRegex.test(firstName)) {  // //else if pour plusieurs conditions 
      //test regex ko par methode .test() sur firstname vs nameRegex
      document.getElementById("firstNameErrorMsg").innerText = "Le prénom ne doit contenir que des lettres"; //affichage message erreur
      isValid = false;
    } else { // tout condition fausse isValid true on efface le message d'erreur
      document.getElementById("firstNameErrorMsg").innerText = ""; // suppression message erreur
    }

    if (lastName === "") {
      document.getElementById("lastNameErrorMsg").innerText = "Le nom est obligatoire";
      isValid = false;
    } else if (!nameRegex.test(lastName)) {
      document.getElementById("lastNameErrorMsg").innerText = "Le nom ne doit contenir que des lettres";
      isValid = false;
    } else {
      document.getElementById("lastNameErrorMsg").innerText = "";
    }

    if (address === "") {
      document.getElementById("addressErrorMsg").innerText = "L'adresse est obligatoire";
      isValid = false;
    } else {
      document.getElementById("addressErrorMsg").innerText = "";
    }

    if (city === "") {
      document.getElementById("cityErrorMsg").innerText = "La ville est obligatoire";
      isValid = false;
    } else if (!cityRegex.test(city)) {
      document.getElementById("cityErrorMsg").innerText = "La ville ne doit contenir que des lettres";
      isValid = false;
    } else {
      document.getElementById("cityErrorMsg").innerText = "";
    }

    if (email === "") {
      document.getElementById("emailErrorMsg").innerText = "L'adresse email est obligatoire";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        document.getElementById("emailErrorMsg").innerText = "L'adresse email est invalide";
        isValid = false;
      } else {
        document.getElementById("emailErrorMsg").innerText = "";
      }
    }

    if (isValid) { // on retourne objet pas encore nommé contact à la fin. retune élargit le scope
      return {
        firstName,
        lastName,
        address,
        city,
        email
      };
    } else {
      return null

    }

  }
  // --------------------------------------------------------- Bouton Submit------------------

  const orderForm = document.querySelector(".cart__order__form");

  // Ajout d'un écouteur d'événement "submit" sur le formulaire de commande utilisation de l'interface event
  orderForm.addEventListener("submit", (event) => { // fonction anonyme fléchée est exécutée.
    // Appel de la fonction validateForm pour valider les données du formulaire
    const contact = validateForm();


    if (!contact) {
      event.preventDefault(); 
    } else {

      let panier = recupCart();

      let products = panier.map(function (obj) { // map pour transo ojjets  en array d'id par iteration
        return obj.ID;
      });


      let commandeFinale = { contact, products };


      envoieServeur(commandeFinale).then(retourPost => { // then pôur attendre la résolution de la promesse

        let paramUrl = `http://127.0.0.1:5501/P5-Dev-Web-Kanap/front/html/confirmation.html?id=${retourPost.orderId}`

        // Rediriger vers la page de confirmation
        location.assign(paramUrl);
      });

      // Empêcher la soumission du formulaire
      event.preventDefault();
    }
  });


  async function envoieServeur(finalOrderObject) {
    // Convertir l'objet de commande en JSON
    let chargeUtile = JSON.stringify(finalOrderObject);

    //  la requête POST au serveur
    try {
      const envoiPost = await fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
      });

      // Si la requête échoue, et renvoie a catch
      if (!envoiPost.ok) {
        throw new Error(`Erreur HTTP! : ${envoiPost.status}`);
      }


      const retourPost = await envoiPost.json();
      // Vider le localStorage
      localStorage.clear();


      return retourPost;
    } catch (error) {
      // Afficher l'erreur dans la console et alerter l'utilisateur
      console.error('Erreur fetch data:', error);
      alert(`Erreur: ${error.message}`);
      return null;
    }
  }




  //----------------------------------------Change Q--------------------------------------------------------

  function changeQ(ID, quantite, couleur) {

    const produit = { 'ID': ID, 'couleur': couleur, 'Q': parseInt(quantite) };
    let panier = recupCart();

    let foundProduct = panier.find(p => p.ID + p.couleur == produit.ID + produit.couleur);
    //nouvelle Quantité mise dans le panier mais pas sauvegardéé      
    foundProduct.Q = produit.Q;
    // check Q avant+ Q après changement
    if (foundProduct.Q > 100) {
      let messAlerte = 'Attention vous  allez ajouter ' + quantite + 'canapé(s) de couleur' + couleur + '  Vous allez dépasser les 100 unités';
      alert(messAlerte);
      return;
    }
    //Suppresion produit
    if (foundProduct.Q <= 0) {
      supCart(foundProduct.ID + foundProduct.couleur);


      calculTotal(panier);
    }

    else {
      // sauvegarde du panier
      sauveCart(panier);
      calculTotal(panier);
    }





  }


// ----------------------------Sup cart ----------------------------

function supCart(idCoul) {

  let panier = recupCart();
  panier = panier.filter(p => p.ID + p.couleur != idCoul); // on filtre sur tout ce qui n'est pas le produit envoyé
  sauveCart(panier);
  calculTotal(panier);
  if (panier == "") { // on modifie l'affichage si panier vide
    if (urlCourante.indexOf("cart") != -1) {

      const sectionCart = document.querySelector("#panier");
      sectionCart.innerHTML = '<h2> Le panier est vide !</h2>'
      const divCommander = document.querySelector(".cart__order");
      divCommander.innerHTML = '';
    }

  }
}
})