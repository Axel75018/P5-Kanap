//fetch catalogue canapé await pourne pas bloquer l'execution
const urlAPI = "http://localhost:3000/api/products/"
const reponse = await fetch(urlAPI); // await pour attendre la réalisation de la promesse
//transforme en json exploitable, désérialise
const reponseJSON = await reponse.json();

//----------------------------sauveCart()----------------------a--

export function sauveCart(panier) {
  // sérialise avant d'ajouter au local storagr
  localStorage.setItem("panier", JSON.stringify(panier))
};

//----------------------------recupCart()------------------------

export function recupCart() {
  let panier = localStorage.getItem("panier");
  // condition sur panier , renvoie un tableau vide si panier vide
  if (panier == null) {
    return []

  } else {
    return JSON.parse(panier);
  }

};
// ----------------------------calcul et affichage du total----------------------------
function calculTotal(panier) {

  let totalQ = 0;
  let totalPrix = 0;

  for (let t = 0; t < panier.length; t++) {
    //find renvoie la ligne de l'array qui remplit la condition id basse de donnée api = id panier
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

//----------------------------addCart------------------------
//export pour que la fonction soit utilisée sur la page product.js
export function addCart(id, couleur, quantite) {
  const produit = { 'ID': id, 'couleur': couleur, 'Q': quantite };
  // faire condition sur panier vide !
  const panier = recupCart(); //on récupére le panier
  if (panier == "") {
    // ajout direct au panier si il est vide

    panier.push(produit); // ajout de produit a l'array par push de produit
    sauveCart(panier);
    alert(quantite + ' canapé(s) ' + couleur + ' ajouté(s) dans le panier');


  }

  else {

    //check produit même couleur déja présent  en comparant les concatenation id+couleur  
    const foundProduct = panier.find(p => p.ID + p.couleur == produit.ID + produit.couleur);


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
      else  { // Q ok
        produit.Q = somQ;
        foundProduct.Q = somQ;
        sauveCart(panier);
        alert(quantite + ' canapé(s) ' + couleur + ' ajouté(s) dans le panier');
      }

    } else { // Cas ou combi coul id non existant (mais panier déja rempli)
      panier.push(produit);
      sauveCart(panier);
      alert(quantite + ' canapé(s) ' + couleur + ' ajouté(s) dans le panier');
    }

  }
}

// ----------------------------Sup cart ----------------------------

export function supCart(idCoul) {

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


//------------------------------------liste + affichage panier----------------------------------------


//recup url pour ne s'applique que sur la page cart eviter erreur sur product.html
const urlCourante = document.location.href;
if (urlCourante.indexOf("cart") != -1) {


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

  function validateForm() {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const email = document.getElementById("email").value.trim();


    const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/ // 
    const cityRegex = /^[a-zA-Z\u0080-\u024F]+(?:[ .'-][a-zA-Z\u0080-\u024F]+)*$/;

    let isValid = true; 

    if (firstName === "") { //si vide
      document.getElementById("firstNameErrorMsg").innerText = "Le prénom est obligatoire";
      isValid = false;
    } else if (!nameRegex.test(firstName)) {  // //else if pour plusieurs conditions 
      //test regex ko par methode .test() sur firstname vs nameRegex
      document.getElementById("firstNameErrorMsg").innerText = "Le prénom ne doit contenir que des lettres";
      isValid = false;
    } else { // tout condition fausse isValid true on efface le message d'erreur
      document.getElementById("firstNameErrorMsg").innerText = "";
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

    if (isValid) { // on retourne objet pas encore nomé contact à la fin. retune élargit le scope
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
  // ---------------------------------------------------------bouton- Submit 
  
  const orderForm = document.querySelector(".cart__order__form");

  // ajout du listener sur le formulaire 
  orderForm.addEventListener("submit", (event) => { //objet event et fonction anonyme fléchée
    
    const contact = validateForm(); // fonction valid soit null soit contact rempli

    // test contact 
    if (!contact) {
      event.preventDefault(); // utilisation methode preventDefault sur objet event pour empécher envoie formulaire
    } else {
      // Si ok on récupére le panier en localstrage
      let panier = recupCart();
      // On transforme l'objet en array par itération de la map 
      let products = panier.map(function (obj) { 
        // a noter obj est un paramètre qui représente l'élément en cours dans le tableau lors de l'itération.
        // pas  besoin de let, on aurait pu utiliser n'importe quel nom
        return obj.ID;
      });

      // objet final à envoyer
      let commandeFinale = { contact, products };

      //--------------------------envoie au serveur-----------------------------------------------------
      envoieServeur(commandeFinale).then(retourPost => { // then pour attendre la promesse// fonction Post async
        async function envoieServeur(finalOrderObject) {
          let chargeUtile = JSON.stringify(finalOrderObject); // sérialise ce qui est passé à la fonction
      
          try { //test
            const envoiPost = await fetch("http://localhost:3000/api/products/order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: chargeUtile
            });
      
            if (!envoiPost.ok) {
              throw new Error(`Erreur HTTP! : ${envoiPost.status}`);
            }
      
            const retourPost = await envoiPost.json(); // désérialise le retour de post si ok
            console.log("...............envoi et recup formulaire.................");
            console.log(retourPost);
            alert(retourPost.orderId);

            return retourPost; // Return the parsed JSON response
            // faire variable globale
            // envoyer a l'url : ?orderid=
      
          } catch (error) {
            console.error('Erreur fetch data:', error);
            alert(`Erreur: ${error.message}`);
            return null;
          }
        }
        console.log(retourPost);

      });

      // empéche l'envoi du formulaire
      event.preventDefault();
    }
  });


  // fonction envoie Post 
  async function envoieServeur(finalOrderObject) {
    let chargeUtile = JSON.stringify(finalOrderObject);

    try { // test avec gestion des erreur dans catch
      const envoiPost = await fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
      });

      if (!envoiPost.ok) {
        throw new Error(`Erreur HTTP! : ${envoiPost.status}`); // bloque et fait passer à catch
      }

      const retourPost = await envoiPost.json(); // désérialise et crée le retourPost
      console.log("...............envoi et recup formulaire.................");
      console.log(retourPost);
      alert(retourPost.orderId);
      return retourPost; // Return the parsed JSON response
      // faire variable globale
      // envoyer a l'url : ?orderid=

    } catch (error) {
      console.error('Erreur fetch data:', error);
      alert(`Erreur: ${error.message}`);
      return null;
    }
  }




  //Change Q

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
}